// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCSCFXb9i4Zu_iPN-3u4_yi_HEOEIxvxhM",
  authDomain: "e-bus-tracker-v1.firebaseapp.com",
  projectId: "e-bus-tracker-v1",
  storageBucket: "e-bus-tracker-v1.appspot.com",
  messagingSenderId: "441792159715",
  appId: "1:441792159715:web:2899a4c5bfe41b049d8ad6",
  measurementId: "G-XDSJWLQBJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export to other files
export { auth, db };

