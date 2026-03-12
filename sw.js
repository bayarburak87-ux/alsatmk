const CACHE_NAME = 'alsat-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './translations.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate' || e.request.url.endsWith('.html') || 
      e.request.url.includes('index.html') || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  if (['style', 'script', 'font'].includes(e.request.destination) || 
      e.request.url.includes('style.css') || e.request.url.includes('script.js') || 
      e.request.url.includes('translations.js') || e.request.url.includes('manifest.json')) {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return res;
      }))
    );
  }
});
