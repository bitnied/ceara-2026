/* Service worker: deixa o roteiro funcionando offline durante a viagem. */
const CACHE = 'ceara2026-v3';
const FOTOS_CACHE = 'ceara2026-fotos';
const ARQUIVOS = ['./', 'index.html', 'css/styles.css', 'js/icons.js', 'js/data.js', 'js/fotos.js', 'js/app.js', 'manifest.webmanifest', 'icons/icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== FOTOS_CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname === 'api.open-meteo.com') return; // previsão: sempre da rede

  // Fotos do Wikimedia: cache primeiro (ficam disponíveis offline depois de vistas)
  if (url.hostname.endsWith('wikimedia.org')) {
    e.respondWith(caches.open(FOTOS_CACHE).then((c) => c.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
      if (r && (r.ok || r.type === 'opaque')) c.put(e.request, r.clone());
      return r;
    }))));
    return;
  }

  const ehFonte = url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com');
  if (url.origin !== location.origin && !ehFonte) return;
  // Rede primeiro (pega atualizações), cache como reserva offline.
  const req = url.origin === location.origin ? new Request(url.href, { cache: 'no-cache' }) : e.request;
  e.respondWith(
    fetch(req)
      .then((r) => {
        if (r && (r.ok || r.type === 'opaque')) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); }
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
