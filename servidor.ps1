# =====================================================================
#  LEVS — Servidor local para ver la tienda en tu PC
#  ---------------------------------------------------------------------
#  YouTube no reproduce videos dentro de páginas abiertas como archivo
#  (doble clic al index.html → "Error 153"). Este script sirve la tienda
#  en http://localhost:5173 para que la música suene completa.
#  Úsalo con "Abrir tienda.bat". Para cerrarlo, cierra la ventana negra.
#  Cuando publiques la tienda en internet ya no necesitas este archivo.
# =====================================================================
param([int]$Port = 5173, [switch]$NoOpen)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.json' = 'application/json'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'; '.svg' = 'image/svg+xml'; '.gif' = 'image/gif'; '.ico' = 'image/x-icon'
  '.mp3' = 'audio/mpeg'; '.mp4' = 'video/mp4'; '.woff2' = 'font/woff2'; '.txt' = 'text/plain; charset=utf-8'
}

# busca un puerto libre a partir del indicado
$listener = $null
for ($p = $Port; $p -lt $Port + 20; $p++) {
  try {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add("http://localhost:$p/")
    $l.Start()
    $listener = $l; $Port = $p; break
  } catch { }
}
if (-not $listener) { Write-Host 'No se pudo abrir el servidor (puertos ocupados).' -ForegroundColor Red; Read-Host 'Enter para salir'; exit 1 }

$url = "http://localhost:$Port/"
Write-Host ''
Write-Host '  LEVS esta abierta en:' -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Yellow
Write-Host '  (cierra esta ventana para apagar la tienda)'
Write-Host ''
if (-not $NoOpen) { Start-Process $url }

$rootFull = [IO.Path]::GetFullPath($root).TrimEnd('\') + '\'
while ($listener.IsListening) {
  try { $ctx = $listener.GetContext() } catch { break }
  $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ($rel -eq '') { $rel = 'index.html' }
    $file = [IO.Path]::GetFullPath((Join-Path $root $rel))
    # solo servir archivos dentro de la carpeta de la tienda
    if (-not $file.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $file -PathType Leaf)) {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes('No encontrado')
      $res.OutputStream.Write($b, 0, $b.Length)
    } else {
      $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
      $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $res.Headers.Add('Cache-Control', 'no-cache')
      $bytes = [IO.File]::ReadAllBytes($file)
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch { try { $res.StatusCode = 500 } catch { } }
  finally { try { $res.OutputStream.Close() } catch { } }
}
