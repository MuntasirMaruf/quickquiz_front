"use client";
import React, { useEffect } from "react";
import axios from "axios";

declare global {
    interface Window {
        PusherPushNotifications: any;
    }
}

export default function NotificationTest() {
    useEffect(() => {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(() => console.log('Service Worker registered'));
        }

        // Request notification permission
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });

        // Subscribe to Pusher Beams
        const subscribe = async () => {
            if (window.PusherPushNotifications) {
                const beamsClient = new window.PusherPushNotifications.Client({
                    instanceId: '6f217e32-50af-477f-a270-2eda58db0fab',
                });
                try {
                    await beamsClient.start();
                    await beamsClient.addDeviceInterest('hello');
                    console.log('Subscribed to "hello" interest');
                } catch (err) {
                    console.error('Subscription failed:', err);
                }
            }
        };
        subscribe();
    }, []);

    // Send notification via backend
    const sendTestNotification = async () => {
        try {
            const res = await axios.post('http://localhost:3000/notifications/send', {
                interest: 'hello',
                title: 'Test Notification!',
                message: 'Notification sent successfully.',
            });
            // alert(`Notification sent. Publish ID: ${res.data.publishId}`);
        } catch (err) {
            console.error(err);
            alert('Failed to send notification');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl text-black font-bold mb-4">Pusher Beams Test</h1>
            <button
                onClick={sendTestNotification}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Send Test Notification
            </button>
        </div>
    );
}
