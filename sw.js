let CACHE_NAME = 'Project2-IT-202';
let urlsToCache = [
  "./",
  "./images/background.jpg",
  "./images/cat.svg",
  "./images/cheese.svg",
  "./images/mouse.svg",
  "./images/icons/icon.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
    if (response) {
      return response;
    }
     return fetch(event.request).then(
     (response) => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseToCache = response.clone();
         caches.open(CACHE_NAME)
           .then((cache) => {
           cache.put(event.request, responseToCache);
         });
        return response;
      }
      );
      })
    );
});