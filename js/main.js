/* =====================================================================
   LEVS — Lógica de la tienda
   ---------------------------------------------------------------------
     1. Catálogo
     2. Utilidades (selección, toast, revelado al hacer scroll)
     3. Preloader + escena de apertura (armario cerrado)
     4. Cursor + botones magnéticos
     5. Polvo de luz (fondo)
     6. Armario del hero (barra con ganchos + repisas)
     7. Categorías + cuenta regresiva
     8. Colección (grid, filtros, favoritos)
     9. Reseñas + compras recientes
    10. Lookbook + contadores
    11. Políticas + preguntas frecuentes
    12. Modal, bolsa y notificaciones de compra
    13. Música (YouTube solo audio, aleatoria) con respaldos
    14. Scroll, navegación y arranque
   ===================================================================== */
'use strict';

/* ---------------------------------------------------------------------
   1. CATÁLOGO  (precios en MXN)
   cat: hoodies | playeras | chamarras | pantalones | tenis | gorras
   img: foto original. La versión recortada (sin fondo) se busca sola en
   img/cut/ con el mismo nombre en .png.
   --------------------------------------------------------------------- */
const PRODUCTS = [
  { id: 1,  cat: 'hoodies',    label: 'Hoodie',   brand: 'AMIRI',                  name: 'Hoodie MA Core',                 price: 10279, compareAt: 12850, img: 'img/amiri-ma-core-hoodie.jpg',            badge: 'Top',      desc: 'Felpa de algodón pesada con el monograma MA estampado al pecho. Corte relajado, capucha doble y bolsillo canguro.' },
  { id: 2,  cat: 'hoodies',    label: 'Hoodie',   brand: 'Fear of God Essentials', name: 'Hoodie con logo estampado',       price: 1909,  compareAt: 2390,  img: 'img/fog-essentials-hoodie-estampado.jpg',  badge: 'Nuevo',    desc: 'Silueta oversize, hombros caídos y logo de goma en el pecho. Suave por dentro, limpio por fuera.' },
  { id: 3,  cat: 'hoodies',    label: 'Hoodie',   brand: 'Chrome Hearts',          name: 'Hoodie Horse Shoe Floral',        price: 50958, compareAt: null,  img: 'img/chrome-hearts-horse-shoe-floral.jpg',  badge: 'Limitada', desc: 'Herradura floral serigrafiada y cruces en las mangas. Pieza de colección que no se repite.' },
  { id: 4,  cat: 'hoodies',    label: 'Hoodie',   brand: 'Supreme',                name: 'Hoodie Box Logo',                 price: 5881,  compareAt: 7350,  img: 'img/supreme-hoodie-logo.jpg',              badge: null,       desc: 'El box logo que lo empezó todo. Felpa gruesa, cordones planos y corte boxy.' },
  { id: 5,  cat: 'hoodies',    label: 'Suéter',   brand: 'Jacquemus',              name: 'Suéter Gros',                     price: 4772,  compareAt: null,  img: 'img/jacquemus-sueter-gros.jpg',            badge: null,       desc: 'Punto grueso con cuello redondo y logo bordado. Para noches frías con buen gusto.' },
  { id: 6,  cat: 'hoodies',    label: 'Suéter',   brand: 'AMI Paris',              name: 'Suéter de lana Ami de Coeur',     price: 6049,  compareAt: 7560,  img: 'img/ami-sueter-lana-coeur.jpg',            badge: null,       desc: 'Lana merino con el corazón bordado al pecho. Clásico parisino que combina con todo.' },
  { id: 7,  cat: 'playeras',   label: 'Playera',  brand: 'Off-White',              name: 'Playera Arrows blanca',           price: 3415,  compareAt: 4270,  img: 'img/off-white-arrows-blanco.jpg',          badge: 'Top',      desc: 'Jersey de algodón con las flechas icónicas en la espalda y logo frontal. Cuello reforzado.' },
  { id: 8,  cat: 'playeras',   label: 'Playera',  brand: 'Comme des Garçons Play', name: 'Playera corazón',                 price: 1291,  compareAt: null,  img: 'img/cdg-play-corazon.jpg',                 badge: 'Nuevo',    desc: 'La playera blanca con el corazón de ojos bordado. Un básico con personalidad.' },
  { id: 9,  cat: 'playeras',   label: 'Playera',  brand: 'AMIRI',                  name: 'Playera Bones Stacked',           price: 7384,  compareAt: null,  img: 'img/amiri-bones-stacked.jpg',              badge: null,       desc: 'Gráfico de huesos apilados en algodón pima. Caída pesada y acabado suave.' },
  { id: 10, cat: 'playeras',   label: 'Camisa',   brand: 'Casablanca',             name: 'Camisa Tennis Stripe',            price: 7964,  compareAt: 9950,  img: 'img/casablanca-tennis-stripe.jpg',         badge: null,       desc: 'Manga corta en punto con rayas tennis. Cuello cubano y botones nacarados.' },
  { id: 11, cat: 'playeras',   label: 'Playera',  brand: 'Diesel',                 name: 'Playera T-Adjust-Q7',             price: 1272,  compareAt: 1590,  img: 'img/diesel-t-adjust-q7.jpg',               badge: null,       desc: 'Logo Diesel en relieve y lavado vintage. El básico que no es básico.' },
  { id: 12, cat: 'playeras',   label: 'Playera',  brand: 'Acne Studios',           name: 'Manga larga con logo',            price: 7455,  compareAt: null,  img: 'img/acne-studios-manga-larga.jpg',         badge: null,       desc: 'Algodón orgánico con logo minimal. Corte relajado y puños anchos.' },
  { id: 13, cat: 'chamarras',  label: 'Chamarra', brand: 'Moncler',                name: 'Chamarra Maya',                   price: 31520, compareAt: 39400, img: 'img/moncler-maya.jpg',                     badge: 'Top',      desc: 'Nylon laqué con relleno de plumón. Capucha ajustable y parche de fieltro en el brazo.' },
  { id: 14, cat: 'chamarras',  label: 'Chamarra', brand: "Arc'teryx",              name: 'Chamarra Beta',                   price: 9950,  compareAt: 12440, img: 'img/arcteryx-beta.jpg',                    badge: 'Nuevo',    desc: 'Shell técnico GORE-TEX, costuras selladas y capucha compatible con casco.' },
  { id: 15, cat: 'chamarras',  label: 'Bomber',   brand: 'Boggi Milano',           name: 'Bomber capitonada',               price: 4092,  compareAt: null,  img: 'img/boggi-milano-bomber.jpg',              badge: null,       desc: 'Bomber acolchada con cierre frontal y puños elásticos. Ligera, cálida y elegante.' },
  { id: 16, cat: 'chamarras',  label: 'Chamarra', brand: 'adidas',                 name: 'Chamarra CTT 3.1 verde',          price: 4687,  compareAt: 5860,  img: 'img/adidas-ctt-31-verde.jpg',              badge: null,       desc: 'Track jacket con cierres de alamar y detalles en relieve. Retro con corte actual.' },
  { id: 17, cat: 'chamarras',  label: 'Chamarra', brand: 'Stone Island',           name: 'Chamarra con capucha y parche',   price: 12808, compareAt: null,  img: 'img/stone-island-capucha-logo.jpg',        badge: 'Limitada', desc: 'Nylon con capucha y el parche de la brújula en el brazo. Teñida en prenda.' },
  { id: 18, cat: 'pantalones', label: 'Jeans',    brand: 'CROQUIS',                name: 'Jeans rectos efecto envejecido',  price: 2681,  compareAt: 3350,  img: 'img/croquis-jeans-rectos.jpg',             badge: 'Nuevo',    desc: 'Mezclilla rígida con lavado envejecido y pierna recta. Tiro medio, cinco bolsillos.' },
  { id: 19, cat: 'pantalones', label: 'Pants',    brand: 'Chrome Hearts',          name: 'Pants con parche Cross',          price: 162927, compareAt: null, img: 'img/chrome-hearts-cross-pants-1.jpg',      badge: 'Limitada', desc: 'Parches de cruz en piel y herrajes de plata 925. Pieza de museo.' },
  { id: 20, cat: 'pantalones', label: 'Shorts',   brand: 'Fear of God Essentials', name: 'Shorts con cordones',             price: 1162,  compareAt: 1450,  img: 'img/fog-essentials-shorts.jpg',            badge: null,       desc: 'Felpa con pretina elástica y cordones. El uniforme del fin de semana.' },
  { id: 21, cat: 'pantalones', label: 'Jeans',    brand: 'Purple Brand',           name: 'Jeans cinco bolsillos',           price: 4094,  compareAt: null,  img: 'img/purple-brand-jeans.jpg',               badge: null,       desc: 'Jeans slim en negro con desgaste en rodilla. Stretch justo para moverse.' },
  { id: 22, cat: 'tenis',      label: 'Tenis',    brand: 'Jordan',                 name: 'Air Jordan 1 High Royal Toe',     price: 6757,  compareAt: 8450,  img: 'img/air-jordan-1-high-royal-toe.png',      badge: 'Top',      desc: 'Piel premium en azul royal, blanco y negro. El bloque de color que todos quieren.' },
  { id: 23, cat: 'tenis',      label: 'Tenis',    brand: 'Jordan',                 name: 'Jordan 4 Orchid',                 price: 5503,  compareAt: 6880,  img: 'img/jordan-4-orchid.png',                  badge: 'Nuevo',    desc: 'Gamuza lila con detalles en gris cemento y suela negra. Suave, llamativo, único.' },
  { id: 24, cat: 'tenis',      label: 'Tenis',    brand: 'Nike',                   name: 'Air Force 1 Low Fireberry',       price: 3533,  compareAt: null,  img: 'img/nike-air-force-1-low-07-fireberry.png', badge: null,      desc: 'El AF1 todo en Fireberry. Piel completa, suela Air y presencia total.' },
  { id: 25, cat: 'tenis',      label: 'Tenis',    brand: 'adidas',                 name: 'Samba OG Cloud White',            price: 2374,  compareAt: 2970,  img: 'img/adidas-samba-og-cloud-white-core-black.png', badge: 'Top', desc: 'Piel blanca, franjas negras y suela de goma. El tenis del año, otra vez.' },
  { id: 26, cat: 'tenis',      label: 'Tenis',    brand: 'Balenciaga',             name: 'Triple S Navy',                   price: 13691, compareAt: null,  img: 'img/balenciaga-triple-s-navy.png',         badge: null,       desc: 'Suela triple apilada en azul marino con paneles de malla y piel. Chunky como debe ser.' },
  { id: 27, cat: 'tenis',      label: 'Tenis',    brand: 'Nike',                   name: 'Air More Uptempo Aqua Gum',       price: 5738,  compareAt: 7170,  img: 'img/nike-air-more-uptempo-white-aqua-gum.png', badge: null,   desc: 'AIR gigante en blanco con aqua y suela gum. Volumen puro de los noventa.' },
  { id: 28, cat: 'tenis',      label: 'Tenis',    brand: 'Jordan',                 name: 'Jordan 11 Gamma Blue',            price: 8062,  compareAt: null,  img: 'img/jordan-11-gamma-blue.png',             badge: 'Limitada', desc: 'Charol negro con suela translúcida Gamma Blue. El Jordan de las noches importantes.' },
  { id: 29, cat: 'tenis',      label: 'Tenis',    brand: 'ASICS',                  name: 'Skyhand OG White Red',            price: 2089,  compareAt: 2610,  img: 'img/asics-skyhand-og-white-red.png',       badge: null,       desc: 'Retro de los ochenta en piel blanca con detalles rojos. Cómodo, ligero y con historia.' },
  { id: 30, cat: 'tenis',      label: 'Tenis',    brand: 'Nike x Off-White',       name: 'Blazer Mid The Ten',              price: 14126, compareAt: null,  img: 'img/nike-blazer-mid-off-white-the-ten.png', badge: 'Limitada', desc: 'De la colección The Ten de Virgil Abloh. Swoosh desplazado y costuras expuestas.' },
  { id: 31, cat: 'tenis',      label: 'Tenis',    brand: 'Jordan',                 name: 'Jordan 6 Black Infrared',         price: 6723,  compareAt: 8400,  img: 'img/jordan-6-black-infrared.png',          badge: null,       desc: 'Nubuck negro con acentos infrarrojos y suela translúcida. El del primer campeonato.' },
  { id: 32, cat: 'tenis',      label: 'Tenis',    brand: 'adidas x BAPE',          name: 'Ultraboost 4.0 Camo',             price: 7084,  compareAt: null,  img: 'img/adidas-bape-ultraboost-4-0-camo.png',  badge: 'Nuevo',    desc: 'Primeknit con camo de BAPE y suela Boost. Colaboración que vuela.' },
  { id: 33, cat: 'gorras',     label: 'Gorra',    brand: 'Gooring Bros',           name: 'Caw Black',                       price: 230,   compareAt: 290,   img: 'img/gorra-gooring-bros-black.webp',        badge: 'Nuevo',    desc: 'Trucker con parche frontal y malla trasera. Ajuste snapback.' },
  { id: 34, cat: 'gorras',     label: 'Gorra',    brand: 'Thirty One',             name: 'Segundo Aniversario',             price: 325,   compareAt: null,  img: 'img/gorra-thirty-one-aniversario.webp',    badge: 'Limitada', desc: 'Edición de aniversario con bordado 3D y visera curva. Tiraje limitado.' },
  { id: 35, cat: 'gorras',     label: 'Gorra',    brand: 'Rude Awakenings',        name: 'Crucifixión',                     price: 325,   compareAt: null,  img: 'img/gorra-rude-awakenings.webp',           badge: null,       desc: 'Gráfico bordado en panel frontal. Cinco paneles con cierre ajustable.' },
  { id: 36, cat: 'gorras',     label: 'Gorra',    brand: 'Barbas',                 name: 'Barbas x Natanael Cano',          price: 325,   compareAt: 410,   img: 'img/gorra-barbas-natanael-cano.webp',      badge: 'Top',      desc: 'Colaboración Barbas x Natanael Cano. Bordado premium y ajuste snapback.' },
  { id: 37, cat: 'gorras',     label: 'Gorra',    brand: 'Dandy Hats',             name: 'Yo No Pesco',                     price: 325,   compareAt: null,  img: 'img/gorra-dandy-hats-yo-no-pesco.webp',    badge: null,       desc: 'La gorra con actitud. Parche frontal en relieve y ajuste trasero.' },
  { id: 38, cat: 'gorras',     label: 'Gorra',    brand: 'Barbas',                 name: 'Skull FES',                       price: 325,   compareAt: null,  img: 'img/gorra-barbas-skull-fes.webp',          badge: null,       desc: 'Tres calaveras con cristales sobre panel negro y visera de gamuza. Brilla de noche.' },
  { id: 39, cat: 'gorras',     label: 'Gorra',    brand: 'Báez',                   name: 'Maestro Shifu ABZ',               price: 325,   compareAt: null,  img: 'img/gorra-baez-maestro-shifu.webp',        badge: null,       desc: 'Trucker Báez con bordado de letras y visera estampada. Mucho carácter.' },
  { id: 40, cat: 'gorras',     label: 'Gorra',    brand: 'Mago',                   name: 'Forever 31 Hats',                 price: 325,   compareAt: null,  img: 'img/gorra-mago-forever-31.webp',           badge: null,       desc: 'Alas bordadas en alto relieve. Perfil medio con cierre ajustable.' },
];

// fotos que no se pudieron recortar bien (prenda blanca sobre fondo blanco)
const NO_CUT = new Set(['img/diesel-t-adjust-q7.jpg', 'img/asics-skyhand-og-white-red.png', 'img/nike-air-more-uptempo-white-aqua-gum.png', 'img/nike-blazer-mid-off-white-the-ten.png']);
// fotos con modelo: no se cuelgan en el armario
const NO_HANG = new Set([8, 14, 11]);
PRODUCTS.forEach((p) => {
  p.cut = NO_CUT.has(p.img) ? null : p.img.replace('img/', 'img/cut/').replace(/\.\w+$/, '.png');
  p.pic = p.cut || p.img;
});

const CAT_LABEL = { hoodies: 'Hoodies', playeras: 'Playeras', chamarras: 'Chamarras', pantalones: 'Pantalones', tenis: 'Tenis', gorras: 'Gorras', ropa: 'Ropa' };
const ROPA = ['hoodies', 'playeras', 'chamarras', 'pantalones'];
const SIZES = { tenis: ['25', '25.5', '26', '26.5', '27', '27.5', '28'], gorras: ['Unitalla'], default: ['XS', 'S', 'M', 'L', 'XL'] };
const FREE_SHIPPING = 2500;
const byId = (id) => PRODUCTS.find((p) => p.id === id);

/* ---------------------------------------------------------------------
   2. UTILIDADES
   --------------------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const money = (n) => '$' + Math.round(n).toLocaleString('es-MX');
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(hover: none)').matches;
const picHTML = (p, cls = '') => `<img src="${p.pic}" alt="${p.brand} ${p.name}" class="${p.cut ? '' : 'no-cut'} ${cls}" loading="lazy" draggable="false" />`;

function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-show'), 2800);
}

/* onVisible: ejecuta cb una vez cuando el elemento entra en pantalla
   (IntersectionObserver + comprobación de respaldo por scroll). */
const visibleQueue = new Set();
const visibleIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) fireVisible(en.target); });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
function fireVisible(el) {
  if (!el.__onVisible) return;
  const cb = el.__onVisible; el.__onVisible = null;
  visibleQueue.delete(el); if (visibleIO) visibleIO.unobserve(el);
  cb(el);
}
function onVisible(el, cb) { el.__onVisible = cb; visibleQueue.add(el); if (visibleIO) visibleIO.observe(el); }
function checkVisible() {
  const h = innerHeight;
  visibleQueue.forEach((el) => {
    if (el.offsetParent === null) return;
    const r = el.getBoundingClientRect();
    if (r.top < h * 0.94 && r.bottom > 0) fireVisible(el);
  });
}
addEventListener('scroll', () => requestAnimationFrame(checkVisible), { passive: true });
addEventListener('resize', checkVisible);
setInterval(checkVisible, 700);

/* ---------------------------------------------------------------------
   3. PRELOADER + ESCENA DE APERTURA
   --------------------------------------------------------------------- */
function initIntro() {
  const pre = $('#preloader'), bar = $('#preBar'), num = $('#preNum'), gate = $('#gate');
  // lo que se ve dentro del armario cuando se abren las puertas
  const img = (id) => `<img src="${byId(id).pic}" alt="" />`;
  $('.gate__inside').insertAdjacentHTML('afterbegin', `<div class="gi">
      <div class="gi__row">${[36, 38, 34].map(img).join('')}</div>
      <div class="gi__rail"><div class="gi__hang">${[2, 13, 1, 15, 4].map((id) => `<div class="gi__item"><div class="gi__hook">${HANGER_SVG}</div>${img(id)}</div>`).join('')}</div></div>
      <div class="gi__row gi__shoes">${[23, 22, 26].map(img).join('')}</div>
    </div>`);
  // precargar las primeras imágenes del armario
  const preload = PRODUCTS.slice(0, 12).map((p) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = p.pic; }));
  let loaded = 0, shown = 0;
  preload.forEach((pr) => pr.then(() => loaded++));
  const tick = () => {
    const target = Math.min(100, (loaded / preload.length) * 100);
    shown = Math.min(target, shown + 3 + Math.random() * 6);
    bar.style.width = shown + '%';
    num.textContent = Math.round(shown) + '%';
    if (shown < 100) setTimeout(tick, 60);
    else setTimeout(showGate, 300);
  };
  setTimeout(tick, 200);
  setTimeout(() => { loaded = preload.length; }, 6000); // nunca esperar más de 6 s

  function showGate() {
    pre.classList.add('is-done');
    gate.classList.add('is-visible');
    // pequeño "asomo" de las puertas para invitar a abrir
    setTimeout(() => { gate.style.setProperty('--peek', 0.6); setTimeout(() => gate.style.setProperty('--peek', 0), 900); }, 1200);
  }

  $$('.gate__actions .btn').forEach((b) => {
    b.addEventListener('pointerenter', () => gate.style.setProperty('--peek', 1));
    b.addEventListener('pointerleave', () => gate.style.setProperty('--peek', 0));
  });

  let opened = false;
  const open = (withMusic) => {
    if (opened) return; opened = true;
    if (withMusic) { Player.start(); Player.sfx('door'); }   // dentro del clic: permite el audio
    gate.style.setProperty('--peek', 0);
    gate.classList.add('is-opening');
    setTimeout(() => {
      document.body.classList.remove('is-locked');
      $('#player').classList.add('is-visible');
      $$('.hero .split, .hero .reveal').forEach((el) => el.classList.add('in'));
    }, 1100);
    setTimeout(() => gate.classList.add('is-gone'), 1700);
    setTimeout(() => { gate.style.display = 'none'; BuyNotes.start(); }, 2800);
  };
  $('#enterMusic').addEventListener('click', () => open(true));
  $('#enterSilent').addEventListener('click', () => open(false));
}

/* ---------------------------------------------------------------------
   4. CURSOR + MAGNÉTICOS
   --------------------------------------------------------------------- */
function initCursor() {
  if (isTouch) return;
  const cur = $('#cursor'), dot = $('.cursor__dot', cur), ring = $('.cursor__ring', cur), label = $('.cursor__label', cur);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
  addEventListener('pointerdown', () => cur.classList.add('is-down'));
  addEventListener('pointerup', () => cur.classList.remove('is-down'));
  (function loop() {
    rx = lerp(rx, mx, 0.2); ry = lerp(ry, my, 0.2);
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('pointerover', (e) => { const t = e.target.closest('[data-cursor]'); if (t) { cur.classList.add('is-hover'); label.textContent = t.dataset.cursor; } });
  document.addEventListener('pointerout', (e) => { if (e.target.closest('[data-cursor]')) cur.classList.remove('is-hover'); });
  document.addEventListener('pointermove', (e) => {
    const m = e.target.closest('.magnetic');
    $$('.magnetic').forEach((b) => { if (b !== m) b.style.transform = ''; });
    if (!m) return;
    const r = m.getBoundingClientRect();
    m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  });
}

/* ---------------------------------------------------------------------
   5. POLVO DE LUZ
   --------------------------------------------------------------------- */
function initDust() {
  if (reduceMotion) return;
  const c = $('#dust'), ctx = c.getContext('2d');
  let w, h; const pts = [];
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  resize(); addEventListener('resize', resize);
  const N = innerWidth < 760 ? 22 : 46;
  for (let i = 0; i < N; i++) pts.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.6 + 0.4, v: Math.random() * 0.25 + 0.06, a: Math.random() * Math.PI * 2, o: Math.random() * 0.4 + 0.15 });
  (function draw() {
    ctx.clearRect(0, 0, w, h);
    const cs = getComputedStyle(document.documentElement);
    const rgb = cs.getPropertyValue('--accent-rgb').trim(), beat = parseFloat(cs.getPropertyValue('--beat')) || 0;
    pts.forEach((p) => {
      p.y -= p.v * (1 + beat * 2); p.a += 0.01; p.x += Math.sin(p.a) * 0.2;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${Math.min(0.9, p.o * (0.7 + 0.3 * Math.sin(p.a * 2)) + beat * 0.25)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

/* ---------------------------------------------------------------------
   6. ARMARIO DEL HERO
   Barra de latón con ganchos (las prendas se ven de lado como en un
   clóset real y la elegida gira de frente) + repisa de gorras arriba
   y repisa de tenis abajo.
   --------------------------------------------------------------------- */
const HANGER_SVG = `<svg viewBox="0 0 200 72" aria-hidden="true">
  <path d="M100 32 V20 C100 8 113 4 117 12 C120 18 114 22 110 19" fill="none" stroke="url(#gBrass)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M100 29 C74 31 38 46 10 60 Q3 64 9 67 L191 67 Q197 64 190 60 C162 46 126 31 100 29 Z" fill="url(#gWood)"/>
  <path d="M14 63 L186 63" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
</svg>`;
function injectDefs() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('width', '0'); s.setAttribute('height', '0'); s.style.position = 'absolute';
  s.innerHTML = `<defs>
    <linearGradient id="gBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e6bd"/><stop offset=".5" stop-color="#c9a25f"/><stop offset="1" stop-color="#8a6a35"/></linearGradient>
    <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a35"/><stop offset=".5" stop-color="#6b4226"/><stop offset="1" stop-color="#4a2c18"/></linearGradient>
  </defs>`;
  document.body.prepend(s);
}

const Closet = (() => {
  const zone = $('#railZone'), box = $('#hangers');
  let list = [], els = [], pos = 0, target = 0, dragging = false, startX = 0, startPos = 0, moved = 0, lastT = 0, vel = 0;
  let front = -1, lastInteract = 0, onScreen = true;

  const hangables = () => PRODUCTS.filter((p) => ROPA.includes(p.cat) && p.cut && !NO_HANG.has(p.id));

  function build(items) {
    list = items; box.innerHTML = '';
    els = list.map((p, i) => {
      const d = document.createElement('div');
      d.className = 'hanger';
      d.innerHTML = `<div class="hanger__swing" style="animation-delay:${-i * 0.6}s">
          <div class="hanger__hook">${HANGER_SVG}</div>
          <div class="hanger__garment">${picHTML(p)}</div>
          <span class="hanger__tag">${money(p.price)}</span>
        </div>`;
      d.addEventListener('click', () => {
        if (moved > 6) return;
        const k = els.indexOf(d);
        if (k === front) Modal.open(p); else go(shortest(k));
      });
      box.appendChild(d);
      return d;
    });
    front = -1;
  }
  const wrapD = (d, n) => ((d % n) + n * 1.5) % n - n / 2;
  const shortest = (k) => target + wrapD(k - target, list.length);
  function go(t) { target = t; lastInteract = performance.now(); }

  function render() {
    const n = list.length, W = zone.clientWidth;
    let best = -1, bestA = 99;
    els.forEach((el, i) => {
      const d = wrapD(i - pos, n), a = Math.abs(d), s = Math.sign(d);
      const near = Math.min(a, 1), far = Math.max(a - 1, 0);
      const x = s * (near * W * 0.34 + far * W * 0.075);
      const rot = -s * near * 66;
      const z = -near * 150 - far * 26;
      el.style.transform = `translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg)`;
      el.style.opacity = a > 4.4 ? 0 : (1 - Math.max(0, a - 3.4)).toFixed(3);
      el.style.zIndex = 100 - Math.round(a * 10);
      el.style.filter = `brightness(${(1 - near * 0.22 - far * 0.04).toFixed(3)})`;
      if (a < bestA) { bestA = a; best = i; }
    });
    if (best !== front) {
      front = best;
      els.forEach((el, i) => el.classList.toggle('is-front', i === front));
      info(list[front]);
    }
  }
  function info(p) {
    if (!p) return;
    $('#ciBrand').textContent = p.brand;
    $('#ciName').textContent = p.name;
    $('#ciPrice').textContent = money(p.price);
    $('#ciCount').textContent = `${String(front + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    $('#ciView').onclick = () => Modal.open(p);
  }
  function loop() {
    if (!dragging) {
      if (Math.abs(vel) > 0.002) { target += vel; vel *= 0.9; if (Math.abs(vel) <= 0.002) target = Math.round(target); }
      pos = lerp(pos, target, 0.1);
    }
    render();
    requestAnimationFrame(loop);
  }

  /* repisas: muestran 3 piezas y van rotando */
  function shelf(el, pool, count) {
    let shown = shuffle(pool).slice(0, count);
    const paint = () => {
      el.innerHTML = shown.map((p) => `<button class="shelf-item" data-id="${p.id}" data-cursor="Ver">${picHTML(p)}<span class="shelf-item__tag">${p.brand} · ${money(p.price)}</span></button>`).join('');
      $$('.shelf-item', el).forEach((b) => b.addEventListener('click', () => Modal.open(byId(+b.dataset.id))));
    };
    paint();
    return {
      swap() {
        const rest = pool.filter((p) => !shown.includes(p));
        if (!rest.length) return;
        const slot = Math.floor(Math.random() * count), btn = el.children[slot];
        if (!btn) return;
        btn.classList.add('is-swap');
        setTimeout(() => {
          const np = pick(rest); shown[slot] = np;
          btn.dataset.id = np.id;
          btn.innerHTML = `${picHTML(np)}<span class="shelf-item__tag">${np.brand} · ${money(np.price)}</span>`;
          requestAnimationFrame(() => btn.classList.remove('is-swap'));
        }, 450);
      },
      reshuffle() { shown = shuffle(pool).slice(0, count); paint(); },
    };
  }
  let caps, shoes;

  function initDrag() {
    zone.addEventListener('pointerdown', (e) => {
      dragging = true; moved = 0; startX = e.clientX; startPos = pos; vel = 0; lastT = performance.now();
    });
    zone.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX, W = zone.clientWidth;
      // capturamos el puntero solo cuando de verdad arrastra (si no, el clic en la prenda no llegaría)
      if (Math.abs(dx) > 6 && !zone.hasPointerCapture(e.pointerId)) zone.setPointerCapture(e.pointerId);
      const np = startPos - dx / (W * 0.32);
      const now = performance.now(), dt = Math.max(1, now - lastT);
      vel = ((np - pos) / dt) * 16; lastT = now;
      pos = target = np; moved = Math.abs(dx);
      lastInteract = now;
    });
    const end = () => {
      if (!dragging) return; dragging = false;
      if (Math.abs(vel) < 0.02) target = Math.round(pos);
      vel = Math.max(-0.35, Math.min(0.35, vel));
      setTimeout(() => (moved = 0), 60); // el clic que sigue a un arrastre se ignora; después vuelve a funcionar
    };
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);
    zone.addEventListener('pointerleave', () => { if (dragging && !moved) dragging = false; });
    zone.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // deja el scroll vertical normal
      e.preventDefault(); target += e.deltaX / 260; lastInteract = performance.now();
      clearTimeout(zone.__snap); zone.__snap = setTimeout(() => (target = Math.round(target)), 160);
    }, { passive: false });
    addEventListener('keydown', (e) => {
      if (!onScreen || $('#modal').classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') go(Math.round(target) + 1);
      if (e.key === 'ArrowLeft') go(Math.round(target) - 1);
    });
  }

  function mix() {
    box.style.transition = 'opacity .45s'; box.style.opacity = '0';
    setTimeout(() => { build(shuffle(hangables())); pos = target = 0; box.style.opacity = '1'; caps.reshuffle(); shoes.reshuffle(); Player.blip(); }, 450);
  }

  function init() {
    injectDefs();
    build(shuffle(hangables()));
    caps = shelf($('#shelfCaps'), PRODUCTS.filter((p) => p.cat === 'gorras'), 3);
    shoes = shelf($('#shelfShoes'), PRODUCTS.filter((p) => p.cat === 'tenis' && p.cut), 3);
    initDrag();
    $('#closetPrev').addEventListener('click', () => go(Math.round(target) - 1));
    $('#closetNext').addEventListener('click', () => go(Math.round(target) + 1));
    $('#heroShuffle').addEventListener('click', mix);
    if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => (onScreen = en.isIntersecting)).observe(zone);
    // avanza solo cuando nadie lo toca
    setInterval(() => { if (!reduceMotion && onScreen && !dragging && performance.now() - lastInteract > 6000 && !document.hidden) target = Math.round(target) + 1; }, 3600);
    setInterval(() => { if (onScreen && !document.hidden) caps.swap(); }, 5200);
    setTimeout(() => setInterval(() => { if (onScreen && !document.hidden) shoes.swap(); }, 5200), 2600);
    loop();
  }
  return { init };
})();

/* ---------------------------------------------------------------------
   7. CATEGORÍAS + CUENTA REGRESIVA
   --------------------------------------------------------------------- */
function initBento() {
  const tiles = [
    { filter: 'ropa',   title: 'Ropa',   sub: 'Hoodies · Playeras · Chamarras · Pants', ids: [13, 1, 7] },
    { filter: 'tenis',  title: 'Tenis',  sub: 'Jordan · Nike · adidas · Balenciaga',   ids: [23, 22, 24] },
    { filter: 'gorras', title: 'Gorras', sub: 'Barbas · Thirty One · Dandy Hats',       ids: [38, 35, 34] },
  ];
  $('#bento').innerHTML = tiles.map((t) => {
    const count = t.filter === 'ropa' ? PRODUCTS.filter((p) => ROPA.includes(p.cat)).length : PRODUCTS.filter((p) => p.cat === t.filter).length;
    return `<a class="bento__tile reveal" href="#coleccion" data-filter="${t.filter}" data-cursor="Ver">
      <div class="bento__art">${t.ids.map((id) => picHTML(byId(id))).join('')}</div>
      <div class="bento__meta">
        <div><small>${count} piezas</small><strong>${t.title}</strong><span class="bento__sub">${t.sub}</span></div>
        <span class="bento__go"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
      </div>
    </a>`;
  }).join('');
  $$('.bento__tile').forEach((t) => t.addEventListener('click', () => setTimeout(() => Collection.setFilter(t.dataset.filter), 450)));
}

function initCountdown() {
  const now = new Date(), target = new Date(now);
  target.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
  target.setHours(20, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 7);
  const els = [$('#dD'), $('#dH'), $('#dM'), $('#dS')];
  const set = (el, v) => { const t = String(v).padStart(2, '0'); if (el.textContent !== t) { el.textContent = t; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } };
  const tick = () => {
    let s = Math.max(0, (target - Date.now()) / 1000);
    set(els[0], Math.floor(s / 86400)); s %= 86400;
    set(els[1], Math.floor(s / 3600)); s %= 3600;
    set(els[2], Math.floor(s / 60)); set(els[3], Math.floor(s % 60));
  };
  tick(); setInterval(tick, 1000);
}

/* ---------------------------------------------------------------------
   8. COLECCIÓN
   --------------------------------------------------------------------- */
const Collection = (() => {
  const grid = $('#grid');
  const favs = new Set();

  function card(p) {
    const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    const d = document.createElement('article');
    d.className = 'card'; d.dataset.cat = p.cat;
    d.innerHTML = `
      <div class="card__media" data-cursor="Ver">
        <div class="card__img">${picHTML(p)}</div>
        <div class="card__badges">
          <span>${p.badge ? `<span class="badge ${p.badge === 'Nuevo' ? 'badge--accent' : ''}">${p.badge}</span>` : ''}</span>
          ${off ? `<span class="badge badge--light">−${off}%</span>` : ''}
        </div>
        <button class="card__fav" aria-label="Guardar en favoritos"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
        <div class="card__quick">
          <button class="ghost" data-view>Vista rápida</button>
          <button data-add>Añadir · ${(SIZES[p.cat] || SIZES.default)[p.cat === 'tenis' ? 3 : p.cat === 'gorras' ? 0 : 2]}</button>
        </div>
      </div>
      <div class="card__info">
        <div><span class="card__brand">${p.brand}</span><h3 class="card__name">${p.name}</h3></div>
        <span class="card__price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ''}</span>
      </div>`;
    const sizes = SIZES[p.cat] || SIZES.default;
    const quickSize = sizes[p.cat === 'tenis' ? 3 : p.cat === 'gorras' ? 0 : 2];
    $('.card__media', d).addEventListener('click', (e) => { if (!e.target.closest('button')) Modal.open(p); });
    $('[data-view]', d).addEventListener('click', () => Modal.open(p));
    $('[data-add]', d).addEventListener('click', () => Cart.add(p, quickSize, $('.card__img img', d)));
    const fav = $('.card__fav', d);
    fav.addEventListener('click', () => {
      const on = !favs.has(p.id);
      on ? favs.add(p.id) : favs.delete(p.id);
      fav.classList.toggle('is-on', on);
      toast(on ? `${p.name} guardado en favoritos` : 'Quitado de favoritos');
      Player.blip(true);
    });
    return d;
  }

  function setFilter(cat) {
    $$('.chip').forEach((c) => c.classList.toggle('is-active', c.dataset.filter === cat));
    const cards = $$('.card', grid);
    cards.forEach((c) => c.classList.remove('in'));
    setTimeout(() => {
      let i = 0;
      cards.forEach((c) => {
        const show = cat === 'all' || c.dataset.cat === cat || (cat === 'ropa' && ROPA.includes(c.dataset.cat));
        c.classList.toggle('is-hidden', !show);
        if (show) { const k = i++; setTimeout(() => c.classList.add('in'), 45 * Math.min(k, 12)); }
      });
      $('#gridCount').textContent = `${i} piezas · ${cat === 'all' ? 'todo el catálogo' : CAT_LABEL[cat]}`;
    }, 260);
  }

  function init() {
    PRODUCTS.forEach((p) => grid.appendChild(card(p)));
    $('#gridCount').textContent = `${PRODUCTS.length} piezas · todo el catálogo`;
    $('#filters').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) setFilter(b.dataset.filter); });
  }
  return { init, setFilter };
})();

/* ---------------------------------------------------------------------
   9. RESEÑAS + COMPRAS RECIENTES
   ⚠️ IMPORTANTE: las reseñas, compras recientes, notificaciones y el
   contador "viendo ahora" son DATOS DE EJEMPLO para el diseño. Antes de
   publicar, cámbialos por reseñas y ventas reales (o quita la etiqueta
   "verificada"). Mostrar reseñas o compras inventadas como si fueran
   reales es publicidad engañosa (PROFECO).
   --------------------------------------------------------------------- */
const REVIEWS = [
  { name: 'Mariana G.',  city: 'Guadalajara', stars: 5, pid: 23, text: 'Llegaron en 24 horas, con caja y todo. El color es idéntico a la foto.', date: 'hace 2 días' },
  { name: 'Diego R.',    city: 'CDMX',        stars: 5, pid: 1,  text: 'El hoodie es otra cosa en persona. Pesado, suave y con un corte perfecto.', date: 'hace 4 días' },
  { name: 'Karla B.',    city: 'Monterrey',   stars: 5, pid: 36, text: 'El bordado está increíble y me contestaron por WhatsApp en minutos.', date: 'hace 1 semana' },
  { name: 'Santiago M.', city: 'Tijuana',     stars: 4, pid: 25, text: 'Originales y bien empacados. Tardaron un día más, pero valió la pena.', date: 'hace 1 semana' },
  { name: 'Fernanda L.', city: 'Puebla',      stars: 5, pid: 13, text: 'Una inversión. Llegó sellada y con tarjeta de autenticidad.', date: 'hace 2 semanas' },
  { name: 'Andrés P.',   city: 'Querétaro',   stars: 5, pid: 7,  text: 'Calidad real y el empaque de LEVS es un detalle precioso.', date: 'hace 2 semanas' },
  { name: 'Valeria S.',  city: 'Mérida',      stars: 5, pid: 38, text: 'Brilla con las luces del antro, literal. Me preguntaron tres veces dónde la compré.', date: 'hace 3 semanas' },
  { name: 'Luis H.',     city: 'León',        stars: 5, pid: 22, text: 'Talla 27 perfecta. Revisé todo y son legítimos. Repetiré seguro.', date: 'hace 3 semanas' },
  { name: 'Paola T.',    city: 'Cancún',      stars: 4, pid: 2,  text: 'Cómodo y calientito. Pedí M y me queda oversize como quería.', date: 'hace 1 mes' },
  { name: 'Rodrigo C.',  city: 'Hermosillo',  stars: 5, pid: 15, text: 'La bomber se ve elegante y abriga sin pesar. Muy buena compra.', date: 'hace 1 mes' },
  { name: 'Ximena O.',   city: 'Toluca',      stars: 5, pid: 9,  text: 'Llegó antes de lo que decía el rastreo. Y la música de la tienda, un plus.', date: 'hace 1 mes' },
  { name: 'Emilio V.',   city: 'CDMX',        stars: 5, pid: 28, text: 'El charol brilla como en la foto. Trato impecable y seguimiento constante.', date: 'hace 1 mes' },
  { name: 'Regina A.',   city: 'Saltillo',    stars: 5, pid: 34, text: 'Edición limitada y la conseguí aquí. Calidad de primera.', date: 'hace 2 meses' },
  { name: 'Mateo F.',    city: 'Culiacán',    stars: 4, pid: 18, text: 'Buen lavado y pierna recta. Talla fiel y buen precio.', date: 'hace 2 meses' },
  { name: 'Daniela N.',  city: 'Morelia',     stars: 5, pid: 31, text: 'Comodísimos. El cambio de talla fue rápido y sin drama.', date: 'hace 2 meses' },
];
const NAMES = ['Mariana', 'Diego', 'Karla', 'Santiago', 'Fernanda', 'Andrés', 'Valeria', 'Luis', 'Paola', 'Rodrigo', 'Ximena', 'Emilio', 'Regina', 'Mateo', 'Daniela', 'Sofía', 'Alejandro', 'Camila', 'Iván', 'Lucía'];
const CITIES = ['CDMX', 'Guadalajara', 'Monterrey', 'Tijuana', 'Puebla', 'Querétaro', 'Mérida', 'León', 'Cancún', 'Hermosillo', 'Toluca', 'Saltillo', 'Culiacán', 'Morelia', 'Chihuahua'];
const AVATAR = ['#d8b27a', '#e9a98b', '#a9c49a', '#a8c6e8', '#e3a3b5', '#cdb4f0'];

function reviewHTML(r) {
  const p = byId(r.pid), ini = r.name.split(' ').map((s) => s[0]).join('').slice(0, 2);
  return `<article class="review" data-pid="${p.id}" data-cursor="Ver">
    <div class="review__head">
      <span class="review__avatar" style="--c:${AVATAR[r.name.length % AVATAR.length]}">${ini}</span>
      <div class="review__who"><strong>${r.name}</strong><span>${r.city}</span></div>
      <span class="review__verified">✓ Compra verificada</span>
    </div>
    <div class="stars">${[1, 2, 3, 4, 5].map((i) => `<i style="--i:${i}" class="${i <= r.stars ? 'on' : ''}"></i>`).join('')}</div>
    <p class="review__text">“${r.text}”</p>
    <div class="review__product">
      <span class="review__thumb">${picHTML(p)}</span>
      <div><small>Compró</small><b>${p.brand} · ${p.name}</b><em>${money(p.price)}</em></div>
    </div>
    <span class="review__date">${r.date}</span>
  </article>`;
}

function initReviews() {
  const cols = $$('.reviews__col'), per = Math.ceil(REVIEWS.length / cols.length);
  cols.forEach((col, i) => {
    const html = REVIEWS.slice(i * per, (i + 1) * per).map(reviewHTML).join('');
    col.innerHTML = html + html; // duplicado para el bucle infinito
    col.style.setProperty('--dur', col.dataset.speed + 's');
  });
  $('#reviewsWall').addEventListener('click', (e) => { const r = e.target.closest('.review'); if (r) Modal.open(byId(+r.dataset.pid)); });
  $$('.stars').forEach((s) => {
    if (s.classList.contains('stars--big')) $$('i', s).forEach((i, k) => { i.classList.add('on'); i.style.setProperty('--i', k); });
    onVisible(s, (el) => el.classList.add('lit'));
  });
  const lane = $('#buyTicker');
  let cur = null;
  const next = () => {
    const p = pick(PRODUCTS), span = document.createElement('span');
    span.innerHTML = `<b>${pick(NAMES)}</b> de ${pick(CITIES)} compró <b>${p.brand} ${p.name}</b> <i>· hace ${Math.floor(Math.random() * 50) + 1} min</i>`;
    lane.appendChild(span);
    requestAnimationFrame(() => requestAnimationFrame(() => span.classList.add('is-in')));
    if (cur) { const old = cur; old.classList.add('is-out'); setTimeout(() => old.remove(), 800); }
    cur = span;
  };
  next(); setInterval(next, 4200);
}

/* ---------------------------------------------------------------------
   10. LOOKBOOK + CONTADORES
   --------------------------------------------------------------------- */
function initLookbook() {
  const track = $('#lookTrack');
  const looks = [
    { title: 'Night Shift',  items: [1, 22],  c1: '#5b4636', c2: '#1a1410' },
    { title: 'Soft Static',  items: [7, 25],  c1: '#6a6f73', c2: '#17191b' },
    { title: 'Velvet Hours', items: [13, 28], c1: '#3e4a66', c2: '#121520' },
    { title: 'Desert Drip',  items: [16, 23], c1: '#7a5d3e', c2: '#1d1610' },
    { title: 'Chrome Club',  items: [3, 31],  c1: '#5e3b3b', c2: '#170f0f' },
    { title: 'Sunday Fit',   items: [2, 36],  c1: '#56604c', c2: '#141711' },
  ];
  track.innerHTML = looks.map((l, i) => {
    const a = byId(l.items[0]), b = byId(l.items[1]);
    return `<article class="look" style="--c1:${l.c1};--c2:${l.c2}" data-id="${a.id}" data-cursor="Ver look">
      <span class="look__num">0${i + 1}</span>
      <div class="look__art">${picHTML(a)}${picHTML(b)}</div>
      <div class="look__meta"><div><small>Look 0${i + 1} · ${a.brand} + ${b.brand}</small><strong>${l.title}</strong></div><span>${money(a.price + b.price)}</span></div>
    </article>`;
  }).join('');
  $$('.look', track).forEach((l) => l.addEventListener('click', () => Modal.open(byId(+l.dataset.id))));
  const step = () => ($('.look', track)?.offsetWidth || 360) + 18;
  $('#lookPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#lookNext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => {
    const r = track.getBoundingClientRect();
    $$('.look', track).forEach((l) => {
      const lr = l.getBoundingClientRect(), k = (lr.left + lr.width / 2 - (r.left + r.width / 2)) / r.width;
      $('.look__art', l).style.transform = `translateX(${(k * -40).toFixed(1)}px)`;
    });
  }, { passive: true });
}

function initCounters() {
  $$('[data-count]').forEach((el) => onVisible(el, () => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', dec = +(el.dataset.decimals || 0);
    const fmt = (v) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('es-MX')) + suf;
    const t0 = performance.now(), dur = 1700;
    const step = (t) => {
      const k = Math.max(0, Math.min(1, (t - t0) / dur)), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(end * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTimeout(() => (el.textContent = fmt(end)), dur + 150);
  }));
}

/* ---------------------------------------------------------------------
   11. POLÍTICAS + PREGUNTAS FRECUENTES (textos de ejemplo: ajústalos)
   --------------------------------------------------------------------- */
const POLICIES = [
  { title: 'Envíos', short: 'Express 24 h en ciudades principales y de 2 a 4 días al resto del país.', icon: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    items: ['Envío gratis en compras desde $2,500 MXN.', 'Express 24 h en CDMX, Guadalajara y Monterrey en pedidos antes de las 2 pm.', 'Resto de México: 2 a 4 días hábiles con número de rastreo.', 'Empaque discreto y asegurado, con fotos del paquete antes de salir.'] },
  { title: 'Cambios y devoluciones', short: '30 días para cambiar de talla o devolver, sin preguntas incómodas.', icon: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    items: ['Tienes 30 días naturales desde que recibes tu pedido.', 'La pieza debe estar sin uso, con etiquetas y empaque original.', 'El primer cambio de talla tiene envío gratis.', 'Reembolso al mismo método de pago en 3 a 5 días hábiles.'] },
  { title: 'Pagos seguros', short: 'Tarjeta, transferencia, OXXO y meses sin intereses.', icon: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>',
    items: ['Tarjetas de crédito y débito con 3D Secure.', 'Hasta 12 meses sin intereses con bancos participantes.', 'Transferencia SPEI y pago en efectivo en OXXO.', 'Nunca guardamos los datos de tu tarjeta.'] },
  { title: 'Originalidad', short: 'Cada pieza se verifica antes de enviarse y lleva tarjeta de autenticidad.', icon: '<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    items: ['Verificación de cada tenis, prenda y gorra antes del envío.', 'Tarjeta de autenticidad LEVS en cada pedido.', 'Si demuestras que una pieza no es original, te devolvemos tu dinero.', 'Trabajamos solo con proveedores autorizados.'] },
];
const FAQS = [
  { q: '¿Los productos son originales?', a: 'Sí. Cada tenis, prenda y gorra pasa por una verificación antes de enviarse y va acompañada de su tarjeta de autenticidad LEVS.' },
  { q: '¿Cuánto tarda en llegar mi pedido?', a: 'En CDMX, Guadalajara y Monterrey llega en 24 horas si compras antes de las 2 pm. En el resto de México tarda de 2 a 4 días hábiles, siempre con número de rastreo.' },
  { q: '¿Puedo cambiar la talla si no me queda?', a: 'Claro. Tienes 30 días para cambiar de talla y el primer cambio tiene envío gratis. La pieza debe estar sin uso y con etiquetas.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Tarjeta de crédito y débito, transferencia SPEI, pago en OXXO y hasta 12 meses sin intereses con bancos participantes.' },
  { q: '¿Cómo sé qué talla pedir en tenis?', a: 'Usamos talla mexicana (25 a 28). Si tienes duda, escríbenos y te decimos cómo talla ese modelo en específico.' },
  { q: '¿Hacen envíos fuera de México?', a: 'Por ahora enviamos a todo México. Suscríbete al backstage para enterarte cuando abramos envíos internacionales.' },
  { q: '¿Cada cuánto hay drops nuevos?', a: 'Cada viernes a las 8 pm. La cuenta regresiva de la página te dice exactamente cuánto falta.' },
  { q: '¿Puedo apartar una pieza?', a: 'Sí, con el 30% del valor apartas hasta por 7 días. Escríbenos por WhatsApp con el nombre de la pieza y la talla.' },
];

function initHelp() {
  $('#policyGrid').innerHTML = POLICIES.map((p, i) => `<button class="policy reveal" style="transition-delay:${i * 80}ms" data-cursor="Abrir">
      <span class="policy__toggle">+</span>
      <span class="policy__icon"><svg viewBox="0 0 24 24">${p.icon}</svg></span>
      <h3>${p.title}</h3>
      <p class="policy__short">${p.short}</p>
      <div class="policy__more"><div><ul>${p.items.map((t) => `<li>${t}</li>`).join('')}</ul></div></div>
    </button>`).join('');
  $$('.policy').forEach((b) => b.addEventListener('click', () => { b.classList.toggle('is-open'); Player.blip(true); }));

  const list = $('#faqList');
  list.innerHTML = FAQS.map((f, i) => `<div class="faq-item${i === 0 ? ' is-open' : ''}">
      <button class="faq-item__q"><span class="faq-item__num">${String(i + 1).padStart(2, '0')}</span><span>${f.q}</span><span class="faq-item__plus"></span></button>
      <div class="faq-item__a"><div><p>${f.a}</p></div></div>
    </div>`).join('');
  $$('.faq-item', list).forEach((d) => $('.faq-item__q', d).addEventListener('click', () => {
    const open = d.classList.contains('is-open');
    $$('.faq-item', list).forEach((x) => x.classList.remove('is-open'));
    if (!open) { d.classList.add('is-open'); Player.blip(true); }
  }));
}

/* ---------------------------------------------------------------------
   12. MODAL, BOLSA Y NOTIFICACIONES
   --------------------------------------------------------------------- */
const Modal = (() => {
  const m = $('#modal');
  let current = null, size = null;
  function open(p) {
    if (!p) return;
    current = p;
    const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    $('#modalMedia').innerHTML = picHTML(p);
    $('#modalBrand').textContent = `${p.brand} · ${p.label}`;
    $('#modalName').textContent = p.name;
    $('#modalPrice').innerHTML = `${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s><span class="off">−${off}%</span>` : ''}`;
    $('#modalDesc').textContent = p.desc;
    $('#modalViewers').textContent = Math.floor(Math.random() * 16) + 4;
    const sizes = SIZES[p.cat] || SIZES.default;
    size = sizes[Math.min(sizes.length - 1, p.cat === 'tenis' ? 3 : 2)];
    $('#modalSizes').innerHTML = sizes.map((s) => `<button class="size${s === size ? ' is-active' : ''}" data-size="${s}">${s}</button>`).join('');
    m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }
  function close() {
    if (!m.classList.contains('is-open')) return;
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
  }
  function init() {
    $('#modalClose').addEventListener('click', close);
    $('#modalX').addEventListener('click', close);
    $('#sizeGuide').addEventListener('click', close);
    addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); Cart.close(); } });
    $('#modalSizes').addEventListener('click', (e) => {
      const b = e.target.closest('.size'); if (!b) return;
      size = b.dataset.size; $$('.size').forEach((s) => s.classList.toggle('is-active', s === b));
    });
    $('#modalAdd').addEventListener('click', () => { Cart.add(current, size, $('#modalMedia img')); setTimeout(close, 450); });
  }
  return { open, close, init };
})();

const Cart = (() => {
  const items = [], drawer = $('#drawer');
  const count = () => items.reduce((a, i) => a + i.qty, 0);
  const total = () => items.reduce((a, i) => a + i.qty * i.p.price, 0);

  function fly(img) {
    if (!img) return;
    const r = img.getBoundingClientRect(), t = $('#cartBtn').getBoundingClientRect();
    const f = document.createElement('div');
    f.className = 'fly'; f.innerHTML = `<img src="${img.getAttribute('src')}" alt="" />`;
    f.style.left = r.left + r.width / 2 - 42 + 'px'; f.style.top = r.top + r.height / 2 - 42 + 'px';
    document.body.appendChild(f);
    requestAnimationFrame(() => {
      f.style.left = t.left + t.width / 2 - 42 + 'px'; f.style.top = t.top + t.height / 2 - 42 + 'px';
      f.style.transform = 'scale(.15) rotate(25deg)'; f.style.opacity = '.3';
    });
    setTimeout(() => f.remove(), 950);
  }
  function add(p, size, img) {
    if (!p) return;
    const ex = items.find((i) => i.p.id === p.id && i.size === size);
    ex ? ex.qty++ : items.push({ p, size, qty: 1 });
    fly(img);
    setTimeout(() => { render(); const b = $('#cartCount'); b.classList.add('is-bump'); setTimeout(() => b.classList.remove('is-bump'), 400); }, 800);
    toast(`${p.name} · talla ${size} en tu bolsa`);
    Player.blip();
  }
  function render() {
    $('#cartCount').textContent = count();
    $('#drawerCount').textContent = count();
    $('#drawerTotal').textContent = money(total());
    drawer.classList.toggle('is-empty', !items.length);
    const rest = Math.max(0, FREE_SHIPPING - total());
    $('#shipText').innerHTML = rest > 0 ? `Te faltan <b>${money(rest)}</b> para envío gratis` : '<b>Tienes envío gratis</b> ✦';
    $('#shipBar').style.width = Math.min(100, (total() / FREE_SHIPPING) * 100) + '%';
    $('#drawerList').innerHTML = items.map((i, k) => `<div class="bag-item" data-k="${k}">
        <span class="bag-item__img">${picHTML(i.p)}</span>
        <div class="bag-item__info">
          <strong>${i.p.name}</strong><small>${i.p.brand} · Talla ${i.size}</small>
          <div class="bag-item__row">
            <div class="qty"><button data-dec aria-label="Quitar uno">−</button><span>${i.qty}</span><button data-inc aria-label="Agregar uno">+</button></div>
            <div><span class="bag-item__price">${money(i.p.price * i.qty)}</span><button class="bag-item__rm" data-rm>Quitar</button></div>
          </div>
        </div>
      </div>`).join('');
  }
  function open() { render(); drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); document.body.classList.add('is-locked'); }
  function close() { if (!drawer.classList.contains('is-open')) return; drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('is-locked'); }
  function init() {
    render();
    $('#cartBtn').addEventListener('click', open);
    $('#drawerClose').addEventListener('click', close);
    $('#drawerX').addEventListener('click', close);
    $('#drawerGo').addEventListener('click', close);
    $('#drawerList').addEventListener('click', (e) => {
      const row = e.target.closest('.bag-item'); if (!row) return;
      const k = +row.dataset.k, it = items[k];
      if (e.target.closest('[data-inc]')) it.qty++;
      else if (e.target.closest('[data-dec]')) { it.qty--; if (it.qty <= 0) items.splice(k, 1); }
      else if (e.target.closest('[data-rm]')) items.splice(k, 1);
      else return;
      render();
    });
    $('#checkoutBtn').addEventListener('click', () => { toast(`Pedido de prueba por ${money(total())} · aquí se conecta tu pasarela de pago`); Player.blip(); });
  }
  return { add, open, close, init };
})();

const BuyNotes = (() => {
  const el = $('#buyNote');
  let current = null, started = false;
  function show() {
    const p = pick(PRODUCTS); current = p;
    const img = $('#buyNoteImg');
    img.src = p.pic; img.className = p.cut ? '' : 'no-cut';
    $('#buyNoteWho').textContent = `${pick(NAMES)} de ${pick(CITIES)}`;
    $('#buyNoteWhat').textContent = `${p.brand} ${p.name}`;
    $('#buyNoteWhen').textContent = `hace ${Math.floor(Math.random() * 12) + 1} min · verificado`;
    el.classList.add('is-show');
    Player.blip(true);
    setTimeout(() => el.classList.remove('is-show'), 6000);
  }
  const bumpLive = () => { const l = $('#liveCount'); l.textContent = Math.max(14, Math.min(90, +l.textContent + Math.floor(Math.random() * 9) - 4)); };
  function schedule() { setTimeout(() => { if (!document.hidden) show(); schedule(); }, 16000 + Math.random() * 14000); }
  function start() { if (started) return; started = true; setTimeout(show, 7000); schedule(); }
  el.addEventListener('click', () => { if (current) { el.classList.remove('is-show'); Modal.open(current); } });
  setInterval(bumpLive, 7000);
  return { start };
})();

/* ---------------------------------------------------------------------
   13. MÚSICA
   ---------------------------------------------------------------------
   MUSIC_SOURCE:
     'youtube' → canciones COMPLETAS, solo audio (el video va oculto).
                 Orden aleatorio: la primera canción y cada "siguiente"
                 salen al azar, sin repetir hasta terminar la lista.
     'spotify' → playlist de Spotify (completa solo con sesión de Spotify).
     'synth'   → música generada por la tienda, sin internet.
   ⚠️ YouTube solo funciona con la tienda servida desde un sitio web o con
   "Abrir tienda.bat". Abierta con doble clic (file://) se usa Spotify.
   ⚠️ Las reglas de YouTube piden que su reproductor sea visible. Ocultarlo
   va contra sus términos: para una tienda pública conviene usar música con
   licencia (por ejemplo, MP3 propios o un servicio de música para negocios).
   --------------------------------------------------------------------- */
const MUSIC_SOURCE = 'youtube';
const SPOTIFY_PLAYLIST = '4sc0FC0Q7V5Bg50JRzEyR5';
const THEMES = [
  { accent: '#d8b27a' }, { accent: '#e9a98b' }, { accent: '#a9c49a' }, { accent: '#a8c6e8' }, { accent: '#e3a3b5' },
];
const SYNTH_TRACKS = [
  { name: 'Neon Drift', bpm: 118, root: 57, chords: [[0, 3, 7, 10], [-4, 0, 3, 7], [-2, 2, 5, 8], [-5, -2, 2, 5]] },
  { name: 'Velvet Static', bpm: 112, root: 53, chords: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [-3, 0, 4, 7]] },
  { name: 'Chrome Hours', bpm: 122, root: 59, chords: [[0, 3, 7], [-2, 2, 5], [-4, 0, 3], [-7, -4, 0]] },
];

const Player = (() => {
  const el = $('#player');
  const onFile = location.protocol === 'file:';
  const hasYT = MUSIC_SOURCE === 'youtube' && window.YT_PLAYLIST && YT_PLAYLIST.length;
  let mode = MUSIC_SOURCE === 'synth' ? 'synth' : (hasYT && !onFile ? 'yt' : 'spotify');
  let ready = false, wantPlay = false, playing = false, themeIdx = 0, errors = 0;
  let yt = null, order = [], pos = 0, spotify = null, spotifyStarted = false;
  let ctx, master, noiseBuf, synthTimer = null, synthIdx = 0, step = 0, bar = 0, nextTime = 0;

  /* ---------- interfaz ---------- */
  function setMeta(title, artist, thumb) {
    const t = $('#trackTitle');
    t.textContent = title; $('#trackArtist').textContent = artist || '';
    t.classList.remove('is-long');
    requestAnimationFrame(() => { if (t.scrollWidth > 200) t.classList.add('is-long'); });
    $('#discLabel').style.backgroundImage = thumb ? `url("${thumb}")` : '';
  }
  function sync() {
    el.classList.toggle('is-playing', playing);
    $('#navMusic').classList.toggle('is-playing', playing);
    if (!playing) document.documentElement.style.setProperty('--beat', 0);
  }
  function theme(i) {
    themeIdx = (i + THEMES.length) % THEMES.length;
    const a = THEMES[themeIdx].accent, r = document.documentElement.style;
    r.setProperty('--accent', a);
    r.setProperty('--accent-rgb', a.slice(1).match(/.{2}/g).map((h) => parseInt(h, 16)).join(', '));
  }
  function nudge() {
    setTimeout(() => {
      const buffering = mode === 'yt' && yt && yt.getPlayerState && yt.getPlayerState() === 3;
      if (playing || buffering) return;
      const target = mode === 'spotify' ? $('#spotifyBox') : $('#playBtn');
      target.classList.add('is-nudge'); setTimeout(() => target.classList.remove('is-nudge'), 3500);
      toast(mode === 'spotify' ? 'Toca ▶ en el reproductor de Spotify para escuchar' : 'Toca ▶ en el reproductor para escuchar la música');
    }, 4500);
  }

  /* ---------- YouTube (solo audio, cola aleatoria) ---------- */
  const track = () => YT_PLAYLIST[order[pos]];
  function newOrder(avoid) {
    order = shuffle(YT_PLAYLIST.map((_, i) => i));
    if (avoid != null && order[0] === avoid && order.length > 1) order.push(order.shift());
  }
  function showTrack() { const t = track(); setMeta(t.title, t.artist, `https://i.ytimg.com/vi/${t.id}/mqdefault.jpg`); }
  function loadYT() {
    newOrder(); pos = 0; showTrack();
    window.onYouTubeIframeAPIReady = () => {
      yt = new YT.Player('ytFrame', {
        width: 200, height: 200, videoId: track().id,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, rel: 0, fs: 0, iv_load_policy: 3 },
        events: {
          onReady: () => { yt.setVolume(Math.round(+$('#volume').value * 100)); ready = true; if (wantPlay) { wantPlay = false; yt.playVideo(); nudge(); } },
          onStateChange: (e) => {
            const S = YT.PlayerState;
            if (e.data === S.PLAYING) { playing = true; errors = 0; sync(); }
            else if (e.data === S.PAUSED) { playing = false; sync(); }
            else if (e.data === S.ENDED) next();
          },
          onError: () => { if (++errors > 6) return fail('No se pudo reproducir la música · suena la música de LEVS'); setTimeout(next, 400); },
        },
      });
    };
    loadScript('https://www.youtube.com/iframe_api', () => fail('No se pudo cargar la música · suena la música de LEVS'));
  }
  function playPos() { showTrack(); theme(themeIdx + 1); if (ready) yt.loadVideoById(track().id); }

  /* ---------- Spotify (respaldo para file://) ---------- */
  function loadSpotify() {
    el.classList.add('is-spotify');
    $('#playerNow').textContent = 'Playlist · Spotify';
    setMeta('LEVS Radio', 'Zara House Playlist');
    window.onSpotifyIframeApiReady = (API) => {
      API.createController($('#spotifyEmbed'), { uri: `spotify:playlist:${SPOTIFY_PLAYLIST}`, width: 218, height: 80, theme: 'dark' }, (c) => {
        spotify = c;
        c.addListener('ready', () => { ready = true; if (wantPlay) { wantPlay = false; spPlay(); } });
        c.addListener('playback_update', (e) => { const p = !(e.data || {}).isPaused; if (p) spotifyStarted = true; if (p !== playing) { playing = p; sync(); } });
      });
    };
    loadScript('https://open.spotify.com/embed/iframe-api/v1', () => fail('No se pudo cargar Spotify · suena la música de LEVS'));
    if (MUSIC_SOURCE === 'youtube' && onFile) hintFile = true;
  }
  let hintFile = false;
  function spPlay() { spotifyStarted ? spotify.resume() : spotify.play(); nudge(); }

  function loadScript(src, onError) { const s = document.createElement('script'); s.src = src; s.async = true; s.onerror = onError; document.head.appendChild(s); }
  function fail(msg) {
    mode = 'synth'; ready = true; el.classList.remove('is-spotify');
    $('#playerNow').textContent = 'LEVS Radio';
    setMeta(SYNTH_TRACKS[synthIdx].name, 'Música de la tienda');
    if (msg) toast(msg);
    if (wantPlay) { wantPlay = false; synthPlay(); }
  }

  /* ---------- Web Audio: efectos y música de respaldo ---------- */
  function ensureCtx() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = +$('#volume').value * 0.8; master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function tone(t, freq, dur, vol, type = 'triangle', cutoff = 4000) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = cutoff;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(t, dur, vol, type, freq) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.value = freq;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + dur + 0.05);
  }
  function sfx(kind) {
    ensureCtx(); const t = ctx.currentTime;
    if (kind === 'door') {
      // clic del pestillo + bisagra + aire al abrir
      noise(t, 0.05, 0.35, 'bandpass', 2400);
      tone(t + 0.02, 90, 0.35, 0.25, 'sine', 400);
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = noiseBuf; s.loop = true; f.type = 'bandpass'; f.Q.value = 0.7;
      f.frequency.setValueAtTime(300, t + 0.1); f.frequency.exponentialRampToValueAtTime(1600, t + 1.4);
      g.gain.setValueAtTime(0.0001, t + 0.1); g.gain.exponentialRampToValueAtTime(0.09, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      s.connect(f).connect(g).connect(master); s.start(t + 0.1); s.stop(t + 1.7);
    }
  }
  function blip(soft) {
    if (!ctx || ctx.state !== 'running') return;
    const t = ctx.currentTime;
    tone(t, hz(soft ? 84 : 88), 0.25, soft ? 0.05 : 0.08); tone(t + 0.07, hz(soft ? 91 : 95), 0.3, soft ? 0.04 : 0.06);
  }
  function synthStep(T, t) {
    const s16 = 60 / T.bpm / 4, ch = T.chords[bar % T.chords.length];
    if (step % 4 === 0) { tone(t, 150, 0.3, 0.5, 'sine', 300); }
    if (step % 4 === 2) noise(t, 0.05, 0.12, 'highpass', 7000);
    if (step === 4 || step === 12) noise(t, 0.16, 0.18, 'bandpass', 1800);
    if (step % 8 === 0) tone(t, hz(T.root + ch[0] - 24), s16 * 6, 0.25, 'triangle', 600);
    if (step % 2 === 0 && Math.random() < 0.4) tone(t, hz(T.root + pick(ch) + 12), 0.4, 0.06, 'triangle', 3000);
    if (step === 0) ch.forEach((n) => tone(t, hz(T.root + n), s16 * 15, 0.025, 'sawtooth', 1200));
  }
  function synthPlay() {
    ensureCtx(); clearInterval(synthTimer); nextTime = ctx.currentTime + 0.05;
    const T = SYNTH_TRACKS[synthIdx];
    synthTimer = setInterval(() => { while (nextTime < ctx.currentTime + 0.15) { synthStep(T, nextTime); nextTime += 60 / T.bpm / 4; step = (step + 1) % 16; if (!step) bar++; } }, 40);
    playing = true; sync();
  }

  /* ---------- control ---------- */
  function play() {
    ensureCtx();
    if (mode === 'synth') return synthPlay();
    if (!ready) { wantPlay = true; return; }
    if (mode === 'yt') { yt.playVideo(); nudge(); } else spPlay();
  }
  function pause() {
    wantPlay = false;
    if (mode === 'synth') { clearInterval(synthTimer); }
    else if (ready) { mode === 'yt' ? yt.pauseVideo() : spotify.pause(); }
    playing = false; sync();
  }
  function toggle() { playing || wantPlay ? pause() : play(); }
  function next() {
    if (mode === 'yt') { const last = order[pos]; pos++; if (pos >= order.length) { newOrder(last); pos = 0; } playPos(); }
    else if (mode === 'synth') { synthIdx = (synthIdx + 1) % SYNTH_TRACKS.length; setMeta(SYNTH_TRACKS[synthIdx].name, 'Música de la tienda'); theme(themeIdx + 1); synthPlay(); }
  }
  function prev() {
    if (mode === 'yt') { if (ready && yt.getCurrentTime() > 4) return yt.seekTo(0, true); pos = Math.max(0, pos - 1); playPos(); }
    else if (mode === 'synth') { synthIdx = (synthIdx + SYNTH_TRACKS.length - 1) % SYNTH_TRACKS.length; setMeta(SYNTH_TRACKS[synthIdx].name, 'Música de la tienda'); synthPlay(); }
  }
  function start() {
    play();
    if (hintFile) setTimeout(() => toast('Para escuchar canciones completas abre la tienda con "Abrir tienda.bat"'), 7000);
  }

  /* pulso visual (Spotify y YouTube no exponen el audio: se simula al ritmo) */
  let beat = 0, ph = 0;
  function pulse() {
    ph += 0.016;
    const bpm = 122, k = (ph * bpm / 60) % 1;
    const target = playing ? Math.pow(1 - k, 3) * 0.8 : 0;
    beat = lerp(beat, target, 0.35);
    document.documentElement.style.setProperty('--beat', beat.toFixed(3));
    requestAnimationFrame(pulse);
  }

  function init() {
    $('#playBtn').addEventListener('click', toggle);
    $('#navMusic').addEventListener('click', toggle);
    $('#nextBtn').addEventListener('click', () => { if (!playing) wantPlay = true; next(); if (mode === 'yt' && ready && !playing) yt.playVideo(); });
    $('#prevBtn').addEventListener('click', prev);
    $('#volume').addEventListener('input', (e) => {
      const v = +e.target.value;
      if (master) master.gain.value = v * 0.8;
      if (yt && ready && yt.setVolume) yt.setVolume(Math.round(v * 100));
    });
    $('#progressBar').addEventListener('click', (e) => {
      if (mode !== 'yt' || !ready) return;
      const r = e.currentTarget.getBoundingClientRect();
      yt.seekTo(((e.clientX - r.left) / r.width) * (yt.getDuration() || 0), true);
    });
    // se encoge solo al bajar por la página (para no tapar contenido) y crece al pasar el cursor
    let manual = false;
    $('#playerToggle').addEventListener('click', () => { manual = true; el.classList.remove('is-auto'); el.classList.toggle('is-min'); });
    if (innerWidth < 760) el.classList.add('is-min');
    addEventListener('scroll', () => {
      if (manual || innerWidth < 760) return;
      const down = scrollY > innerHeight * 0.7;
      el.classList.toggle('is-min', down); el.classList.toggle('is-auto', down);
    }, { passive: true });
    setInterval(() => {
      if (mode !== 'yt' || !ready || !yt.getDuration) return;
      const d = yt.getDuration(), c = yt.getCurrentTime();
      $('#progressFill').style.transform = `scaleX(${d ? Math.min(1, c / d) : 0})`;
    }, 500);
    if (mode === 'yt') loadYT();
    else if (mode === 'spotify') loadSpotify();
    else fail('');
    requestAnimationFrame(pulse);
  }
  return { init, start, toggle, blip, sfx };
})();

/* ---------------------------------------------------------------------
   14. SCROLL, NAVEGACIÓN Y ARRANQUE
   --------------------------------------------------------------------- */
function initScroll() {
  const nav = $('#nav'), prog = $('#progress');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 30);
    nav.classList.toggle('is-hidden', y > lastY && y > 300 && !$('#mobileMenu').classList.contains('is-open'));
    lastY = y;
  }, { passive: true });

  // enlace activo del menú según la sección visible
  const links = $$('.nav__links a');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  addEventListener('scroll', () => {
    const mid = innerHeight * 0.4;
    let cur = null;
    sections.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) cur = s; });
    links.forEach((a) => a.classList.toggle('is-active', cur && a.getAttribute('href') === '#' + cur.id));
  }, { passive: true });

  $$('.split').forEach((el) => { if (!el.closest('.hero')) onVisible(el, (x) => x.classList.add('in')); });
  $$('.reveal, .card, .mline').forEach((el) => { if (!el.closest('.hero')) onVisible(el, (x) => x.classList.add('in')); });

  const mq = $('#marquee'); mq.innerHTML += mq.innerHTML;

  $('#newsForm').addEventListener('submit', (e) => { e.preventDefault(); toast('Listo, ya estás en el backstage ✦'); e.target.reset(); Player.blip(); });

  const burger = $('#burger'), menu = $('#mobileMenu');
  burger.addEventListener('click', () => { burger.classList.toggle('is-open'); menu.classList.toggle('is-open'); });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => { burger.classList.remove('is-open'); menu.classList.remove('is-open'); }));
}

document.addEventListener('DOMContentLoaded', () => {
  $$('.split').forEach(splitWords);
  initBento();
  Collection.init();
  initReviews();
  initLookbook();
  initHelp();
  initCounters();
  Closet.init();
  initCountdown();
  Modal.init();
  Cart.init();
  Player.init();
  initCursor();
  initDust();
  initScroll();
  initIntro();
});
