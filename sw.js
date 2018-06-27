var cacheStorageKey = 'minimal-pwa-1'

var cacheList = [
  './',
  "./index.html",
  "./main.css",
  "./pwa.png"
];

self.addEventListener('install', e => {
  console.log('[demoPWA - ServiceWorker] Install event fired.');
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
});


self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
      event.respondWith(
        caches.open(cacheStorageKey).then(function(cache) {
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function() {
            return cache.match(event.request);
          });
        })
      );
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if ( cacheStorageKey.indexOf(cacheName) === -1 ) {
            // When it doesn't match any condition, delete it.
            console.info('SW: deleting ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});


