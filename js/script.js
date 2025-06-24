// js/script.js
import { auth, db } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection, addDoc, doc, getDoc, getDocs,
  deleteDoc, query, where, orderBy
} from "firebase/firestore";

export function register(name, email, password) {
  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      return addDoc(collection(db, "users"), { uid: cred.user.uid, name });
    })
    .then(() => {
      alert("✅ Registered successfully!");
      window.location.href = "user.html";
    })
    .catch(error => alert("❌ " + error.message));
}

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Login successful!");
      window.location.href = "user.html";
    })
    .catch(error => alert("❌ " + error.message));
}

export function logoutUser() {
  signOut(auth).then(() => {
    alert("You’ve been logged out.");
    window.location.reload();
  }).catch(error => {
    console.error("Logout error:", error);
  });
}

export function postBus(busData) {
  document.getElementById("loadingSpinner").style.display = "block";
  document.getElementById("message").textContent = "";

  addDoc(collection(db, "buses"), {
    ...busData,
    time: new Date().toLocaleString()
  }).then(() => {
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("message").textContent = "✅ Bus info uploaded successfully!";
    clearForm();
  }).catch(err => {
    document.getElementById("loadingSpinner").style.display = "none";
    alert("❌ Error: " + err.message);
  });
}

export function clearForm() {
  ["busName", "source", "destination", "busType", "contact"]
    .forEach(id => document.getElementById(id).value = "");
}

export function loadBuses() {
  const spinner = document.getElementById("loadingSpinner");
  const busList = document.getElementById("busList");
  spinner.style.display = "block";
  busList.innerHTML = "";

  getDocs(query(collection(db, "buses"), orderBy("time", "desc")))
    .then(snapshot => {
      let html = "<h3>All Posted Buses:</h3>";
      if (snapshot.empty) html += "<p>No buses found.</p>";
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        html += `
          <div>
            <strong>Bus:</strong> ${data.busName} (${data.busType})<br>
            <strong>Route:</strong> ${data.source} → ${data.destination}<br>
            <strong>Contact:</strong> ${data.contact}<br>
            <strong>Posted at:</strong> ${data.time}<br>
            <button onclick="deleteBus('${docSnap.id}')">🗑 Delete</button>
          </div>`;
      });
      busList.innerHTML = html;
      spinner.style.display = "none";
    })
    .catch(error => {
      alert("❌ Error fetching buses: " + error.message);
      spinner.style.display = "none";
    });
}

export function deleteBus(docId) {
  if (confirm("Are you sure you want to delete this bus?")) {
    deleteDoc(doc(db, "buses", docId))
      .then(() => {
        alert("✅ Bus deleted.");
        loadBuses();
      })
      .catch(err => alert("❌ Error deleting: " + err.message));
  }
}

export function searchBus(src, dest) {
  const spinner = document.getElementById("loadingSpinner");
  const resultsDiv = document.getElementById("results");

  if (!src || !dest) return alert("Please enter both source and destination");
  spinner.style.display = "block";
  resultsDiv.innerHTML = "";

  getDocs(query(collection(db, "buses"), where("source", "==", src), where("destination", "==", dest)))
    .then(snapshot => {
      spinner.style.display = "none";
      let html = snapshot.empty ? "❌ No buses found." : "<h3>Available Buses:</h3>";
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `<p><strong>${data.busName}</strong> (${data.busType})<br>Contact: ${data.contact}</p>`;
      });
      resultsDiv.innerHTML = html;
    })
    .catch(error => {
      console.error("Error searching buses:", error);
      spinner.style.display = "none";
      resultsDiv.innerHTML = "❌ Error searching buses.";
    });
}

export function initUserWelcome() {
  const welcomeMsg = document.getElementById("welcomeMsg");

  onAuthStateChanged(auth, user => {
    if (user) {
      const userRef = collection(db, "users");
      getDocs(userRef).then(snapshot => {
        let found = false;
        snapshot.forEach(docSnap => {
          if (docSnap.data().uid === user.uid) {
            welcomeMsg.textContent = "Welcome, " + docSnap.data().name + " 👋";
            found = true;
          }
        });
        if (!found) welcomeMsg.textContent = "Welcome!";
      });
    } else {
      welcomeMsg.textContent = "You're not logged in.";
    }
  });
}
