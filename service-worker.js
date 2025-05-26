self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('comanche-ar-v2').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/script.js',
        '/dictionary.json',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
        '/audio/sarii.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});