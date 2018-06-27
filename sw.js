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
})



self.addEventListener('activate', function(e) {
	console.log('[demoPWA - ServiceWorker] Activate event fired.');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[demoPWA - ServiceWorker] Removing old cache...', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});