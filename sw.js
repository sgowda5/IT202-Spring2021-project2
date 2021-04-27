const cacheName = "Project2"
const assets = [
  "./",
  "./images/background.jpg",
  "./images/cat.svg",
  "./images/cheese.svg",
  "./images/mouse.svg",
  "./images/icons/icon.png"
];

// event handler for the install event
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets)
        })
    )
})

// event handler for the fetch event
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})