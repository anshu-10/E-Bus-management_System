// firebase/config.js

const firebaseConfig = {
  apiKey: "AIzaSyDTNT5g94Qyj1-vDjhapA_uPlbRH53d0kA",
  authDomain: "e-bus-management-system-45082.firebaseapp.com",
  projectId: "e-bus-management-system-45082",
  storageBucket: "e-bus-management-system-45082.appspot.com",
  messagingSenderId: "512855889809",
  appId: "1:512855889809:web:387f41b9b144bf84e2ac30",
  measurementId: "G-EYB6VSSBJ6"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
window.auth = firebase.auth();

