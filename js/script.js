// js/script.js
import { auth, db } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  collection, addDoc, doc, getDoc, getDocs,
  deleteDoc, query, where, orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ✅ Register Function
export function register(name, email, password) {
  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log("✅ Firebase Auth Success", cred.user);
      return addDoc(collection(db, "users"), {
        uid: cred.user.uid,
        name
      });
    })
    .then(() => {
      console.log("✅ User added to Firestore");
      alert("✅ Registered successfully!");
      setTimeout(() => {
        window.location.href = "user.html";
      }, 1000);
    })
    .catch(error => {
      console.error("❌ Registration Error:", error.message);
      alert("❌ " + error.message);
    });
}

// ✅ Login Function
export function login(email, password) {
  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Login successful!");
      window.location.href = "user.html";
    })
    .catch(error => alert("❌ " + error.message));
}

// ✅ Logout Function
export function logoutUser() {
  signOut(auth).then(() => {
    alert("👋 You’ve been logged out.");
    window.location.reload();
  }).catch(error => {
    console.error("Logout error:", error);
  });
}

// ✅ Post Bus
export function postBus(data) {
  addDoc(collection(db, "buses"), {
    ...data,
    time: new Date().toLocaleString()
  })
    .then(() => alert("✅ Bus posted"))
    .catch(err => alert("❌ Error: " + err.message));
}

// ✅ Load All Buses (for Admin)
export function loadBuses() {
  return getDocs(query(collection(db, "buses"), orderBy("time", "desc")));
}

// ✅ Delete Bus (Admin)
export function deleteBusById(busId) {
  return deleteDoc(doc(db, "buses", busId));
}

// ✅ Search Buses by Route (User)
export function searchBuses(src, dest) {
  return getDocs(
    query(
      collection(db, "buses"),
      where("source", "==", src),
      where("destination", "==", dest)
    )
  );
}




