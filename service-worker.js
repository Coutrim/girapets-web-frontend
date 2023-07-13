// service-worker.js

// Cache name
const cacheName = 'my-app-cache';

// Files to cache
const cacheFiles = "./index.html"

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se o recurso está no cache, retorná-lo
      if (response) {
        return response;
      }

      // Caso contrário, fazer a solicitação à rede
      return fetch(event.request);
    })
  );
});
