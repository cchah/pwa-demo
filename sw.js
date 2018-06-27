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
    // .then(() => self.skipWaiting())
  )
})

