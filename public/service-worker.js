// public/service-worker.js
importScripts("https://js.pusher.com/beams/service-worker.js");

// Optional: Add custom notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    // Handle notification click - open specific page
    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    } else {
        // Default: open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});