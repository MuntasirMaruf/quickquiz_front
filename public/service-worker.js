// public/service-worker.js

importScripts('https://js.pusher.com/beams/service-worker.js');

// Optional: Listen to notification click events
self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    // Focus or open your app
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
