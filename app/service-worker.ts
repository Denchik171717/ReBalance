/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "psycho-help-v1";
const urlsToCache = [
  "/",
  "/assessment",
  "/progress",
  "/resources",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.svg",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith("chrome-extension://")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone response before caching
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(async () => {
        // Network failed, try cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          const offlinePage = await caches.match("/");
          if (offlinePage) {
            return offlinePage;
          }
        }

        return new Response("Network error", {
          status: 408,
          headers: { "Content-Type": "text/plain" },
        });
      })
  );
});

export {};
