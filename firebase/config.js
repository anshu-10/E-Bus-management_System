// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSCFXb9i4Zu_iPN-3u4_yi_HEOEIxvxhM",
  authDomain: "e-bus-tracker-v1.firebaseapp.com",
  projectId: "e-bus-tracker-v1",
  storageBucket: "e-bus-tracker-v1.appspot.com",
  messagingSenderId: "441792159715",
  appId: "1:441792159715:web:2899a4c5bfe41b049d8ad6",
  measurementId: "G-XDSJWLQBJ1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
