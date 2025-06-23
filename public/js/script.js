// js/script.js

function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({ name: name });
    })
    .then(() => {
      alert("✅ Registered successfully!");
      window.location.href = "user.html";
    })
    .catch(error => alert("❌ " + error.message));
}


function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ Login successful!");
      window.location.href = "user.html";
    })
    .catch(error => alert("❌ " + error.message));
}

function postBus() {
  const spinner = document.getElementById("loadingSpinner");
  const message = document.getElementById("message");
  message.textContent = "";
  spinner.style.display = "block";

  const busData = {
    busName: document.getElementById("busName").value,
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    busType: document.getElementById("busType").value,
    contact: document.getElementById("contact").value,
    time: new Date().toLocaleString()
  };

  db.collection("buses").add(busData)
    .then(() => {
      spinner.style.display = "none";
      message.textContent = "✅ Bus info uploaded successfully!";
      clearForm();
    })
    .catch(err => {
      spinner.style.display = "none";
      alert("❌ Error: " + err.message);
    });
}

function clearForm() {
  ["busName", "source", "destination", "busType", "contact"].forEach(id => document.getElementById(id).value = "");
}

function loadBuses() {
  const spinner = document.getElementById("loadingSpinner");
  const busList = document.getElementById("busList");
  spinner.style.display = "block";
  busList.innerHTML = "";

  db.collection("buses").orderBy("time", "desc").get()
    .then(snapshot => {
      let html = "<h3>All Posted Buses:</h3>";
      if (snapshot.empty) html += "<p>No buses found.</p>";
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `
          <div>
            <strong>Bus:</strong> ${data.busName} (${data.busType})<br>
            <strong>Route:</strong> ${data.source} → ${data.destination}<br>
            <strong>Contact:</strong> ${data.contact}<br>
            <strong>Posted at:</strong> ${data.time}<br>
            <button onclick="deleteBus('${doc.id}')">🗑 Delete</button>
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

function deleteBus(docId) {
  if (confirm("Are you sure you want to delete this bus?")) {
    db.collection("buses").doc(docId).delete()
      .then(() => {
        alert("✅ Bus deleted.");
        loadBuses();
      })
      .catch(err => alert("❌ Error deleting: " + err.message));
  }
}

function searchBus() {
  const src = document.getElementById("src").value.trim();
  const dest = document.getElementById("dest").value.trim();
  const spinner = document.getElementById("loadingSpinner");
  const resultsDiv = document.getElementById("results");

  if (!src || !dest) return alert("Please enter both source and destination");
  spinner.style.display = "block";
  resultsDiv.innerHTML = "";

  db.collection("buses")
    .where("source", "==", src)
    .where("destination", "==", dest)
    .get()
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