import firebase from "firebase";

let firebaseConfig = {
	apiKey: "AIzaSyBP3sNL7A5LXgkAs5G8llMuZ6udpMgY68k",
	authDomain: "vue-firebase-tutorial-dfb85.firebaseapp.com",
	databaseURL: "https://vue-firebase-tutorial-dfb85.firebaseio.com",
	projectId: "vue-firebase-tutorial-dfb85",
	storageBucket: "vue-firebase-tutorial-dfb85.appspot.com",
	messagingSenderId: "905927013869"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();