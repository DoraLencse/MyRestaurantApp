
// Empty the old cache for testing
caches.keys().then(names => {
    for (let name of names)
        caches.delete(name);
});

// Create a version and a cache name
const staticCacheName = 'restaurant-static';

// Cache all the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll([
          '/',
          'index.html',
          'restaurant.html',
		  'sw.js',
          'css/styles.css',
          'js/dbhelper.js',
          'js/main.js',
          'js/register.js',
          'data/restaurants.json',
		  'img/1.jpg',
		  'img/2.jpg',
		  'img/3.jpg',
		  'img/4.jpg',
		  'img/5.jpg',
		  'img/6.jpg',
		  'img/7.jpg',
		  'img/8.jpg',
		  'img/9.jpg',
		  'img/10.jpg',
        ]).catch(error => {
        console.log('Caches opening failed: ' + error);
      });
    })
  );
});

// Remove outdated cache
self.addEventListener('activate', event => {
  event.waitUntil(
    // caches.delete('-restaurant-static-001')
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});

/*
// Cache falling back to the network: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cachefallback
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
    })
  );
});
*/
