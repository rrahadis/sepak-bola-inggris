importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);
  
workbox.routing.registerRoute(
  ({url}) => url.origin,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-data'  
  })
);


workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://api.football-data.org/v2/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data'
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    badge: "/img/logo192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});