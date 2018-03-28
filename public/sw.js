var CACHE_NAME = 'r7-cache-v4';
var urlsToCache = [
  '/',
  '/sw.js',
  '/index.html',
  'manifest.json',
  '/fazenda.json',
  '/assets/icone-fazenda.png',
  '/javascripts/r7-com-app.min.js',
  '/stylesheets/style.css',
  '/stylesheets/main/main.css',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
 });

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['r7-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});