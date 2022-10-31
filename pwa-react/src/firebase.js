// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDqlL-r-HvbpBGF4oScxcYUb6-q8juEqaw",
	authDomain: "pwa-react-koma.firebaseapp.com",
	projectId: "pwa-react-koma",
	storageBucket: "pwa-react-koma.appspot.com",
	messagingSenderId: "1088626886496",
	appId: "1:1088626886496:web:490b2e6eac9689dbdbc005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
	return getToken(messaging, { vapidKey: 'BHGPr3pJQSflJAJtTIVXbmcEXlPV_HP29TZQRcqrGCN10gKIa-ojIJmtvM9kQGcsNKsWIA6ezKFG8Bd6LTjaVc0' }).then((currentToken) => {
		if (currentToken) {
			console.log('current token for client: ', currentToken);
			setTokenFound(true);
			// Track the token -> client mapping, by sending to backend server
			// show on the UI that permission is secured
		} else {
			console.log('No registration token available. Request permission to generate one.');
			setTokenFound(false);
			// shows on the UI that permission is required 
		}
	}).catch((err) => {
		console.log('An error occurred while retrieving token. ', err);
		// catch error while creating client token
	});
}

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});