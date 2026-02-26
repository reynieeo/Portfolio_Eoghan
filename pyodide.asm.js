const CACHE_NAME = "RTERMLAB-V1";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/main.js",
  "./styles/main.css",

  "./src/terminals/python.js",

  "./vendor/mdl/material.min.css",
  "./vendor/mdl/material.min.js",

  "./vendor/xterm/xterm.css",
  "./vendor/xterm/xterm.js",

  "./vendor/pyodide/pyodide.js",
  "./vendor/pyodide/pyodide.asm.wasm",
  "./vendor/pyodide/python_stdlib.zip",
  "./vendor/pyodide/packages.json",
  "./vendor/pyodide/pyodide-lock.json",
  "./vendor/pyodide/pyodide.asm.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  let REQUEST = event.request;
  let URL_OBJ = new URL(REQUEST.url);

  // même origine uniquement
  if (URL_OBJ.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(REQUEST).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(REQUEST)
        .then(function (response) {
          if (REQUEST.method === "GET" && response.ok) {
            let COPY = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(REQUEST, COPY);
            });
          }
          return response;
        })
        .catch(function () {
          if (REQUEST.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("", {
            status: 504,
            statusText: "Offline"
          });
        });
    })
  );
});
