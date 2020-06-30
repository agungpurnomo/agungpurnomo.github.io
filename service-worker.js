importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


if (workbox)
    console.log('Workbox berhasil dimuat');
    const urlsToCache = [
    { url : "./", revision : "1"},
    { url : "./nav.html", revision : "1"},
    { url : "./index.html", revision : "1"},
    { url : "./team.html", revision : "1"},
    { url : "./pages/klasemen.html", revision : "1"},
    { url : "./pages/favorite.html", revision : "1"},
    { url : "./css/materialize.min.css", revision : "1"},
    { url : "./css/font-awesome.min.css", revision : "1"},
    { url : "./css/MaterialIcons-Regular.woff2", revision : "1"},
    { url : "./css/icon.css", revision : "1"},
    { url : "./js/materialize.min.js", revision : "1"},
    { url : "./js/nav.js", revision : "1"},
    { url : "./js/api.js", revision : "1"},
    { url : "./js/db.js", revision : "1"},
    { url : "./js/idb.js", revision : "1"},
    { url : "./js/app.js", revision : "1"},
    { url : "./service-worker.js", revision : "1"},
    { url : "./push.js", revision : "1"},
    { url : "./img/icon.png", revision : "1"},
    { url : "./img/PL.png", revision : "1"},
    { url : "./img/icon-192x192.png", revision : "1"},
    { url : "./img/icon-512x512.png", revision : "1"},
    { url : "./manifest.json", revision : "1"},
];

workbox.precaching.precacheAndRoute(urlsToCache, {
ignoreURLParametersMatching: [/.*/],
});
   


workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0,200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2"),
    workbox.strategies.cacheFirst({
        Plugins : [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds : 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);



self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

