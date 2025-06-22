// firebase/config.js

// Firebase compat version setup (suitable for script-based HTML apps)
const firebaseConfig = {
  apiKey: "AIzaSyDTNT5g94Qyj1-vDjhapA_uPlbRH53d0kA",
  authDomain: "e-bus-management-system-45082.firebaseapp.com",
  projectId: "e-bus-management-system-45082",
  storageBucket: "e-bus-management-system-45082.appspot.com",
  messagingSenderId: "512855889809",
  appId: "1:512855889809:web:387f41b9b144bf84e2ac30",
  measurementId: "G-EYB6VSSBJ6"
};

// Initialize Firebase using compat version
firebase.initializeApp(firebaseConfig);

// Setup global access for Firestore and Auth
const db = firebase.firestore();
const auth = firebase.auth();

window.db = db;
window.auth = auth;
