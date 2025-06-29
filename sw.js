// sw.js
const CACHE_NAME = "calmclinic-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/forside.html",
  "/videoer/intro.mp4",
  "/images/1ohurtige (1).png",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
