// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTNT5g94Qyj1-vDjhapA_uPlbRH53d0kA",
  authDomain: "e-bus-management-system-45082.firebaseapp.com",
  projectId: "e-bus-management-system-45082",
  storageBucket: "e-bus-management-system-45082.firebasestorage.app",
  messagingSenderId: "512855889809",
  appId: "1:512855889809:web:387f41b9b144bf84e2ac30",
  measurementId: "G-EYB6VSSBJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);