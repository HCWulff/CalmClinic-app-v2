// sw.js
const CACHE_NAME = "calmclinic-assets-v1";
const urlsToCache = [
  "/images/1ohurtige (1).png",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json"
];

// Installer serviceworker og cache kun nødvendige assets (ikke HTML/JS)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Hent HTML og JS fra nettet først – fallback til cache for assets
self.addEventListener("fetch", event => {
  const requestURL = new URL(event.request.url);

  // Hvis det er et asset vi har cachen (som ikon/billede) – så brug cache
  if (urlsToCache.includes(requestURL.pathname)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  } else {
    // Alt andet (HTML/JS): hent fra nettet først
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});

