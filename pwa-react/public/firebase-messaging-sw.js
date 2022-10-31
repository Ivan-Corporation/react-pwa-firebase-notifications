// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "AIzaSyDqlL-r-HvbpBGF4oScxcYUb6-q8juEqaw",
	authDomain: "pwa-react-koma.firebaseapp.com",
	projectId: "pwa-react-koma",
	storageBucket: "pwa-react-koma.appspot.com",
	messagingSenderId: "1088626886496",
	appId: "1:1088626886496:web:490b2e6eac9689dbdbc005"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle,
		notificationOptions);
});