#  E-Bus Management System

A web-based platform for managing, posting, searching, and tracking bus routes in a city. This system helps:
- Drivers post live bus availability
- Users search for available buses between two locations
- Admins monitor and delete bus data
- All user authentication is handled via Firebase Auth

---

##  Features

-  Login/Register using Firebase Authentication
-  Driver panel for posting bus information
-  User search page to find buses by source and      destination
-  Admin dashboard to view and delete posted buses
-  Firebase + GitHub automatic deployment

---

##  Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- Firebase (Auth + Firestore + Hosting)
- GitHub Actions (CI/CD for deploy)
- Responsive design basics (custom CSS)

---

##  Basic Workflow

```text
            +------------------------+
            |   Registration Page   |
            |  - Register/Login     |
            +----------+------------+
                       |
                       v
      +----------------+----------------+
      |                |                |
      v                v                v
+-------------+  +-------------+  +--------------+
| Driver Page |  |  User Page  |  | Admin Panel  |
| - Post Bus  |  |  - Search   |  | - Load Buses |
| Info to DB  |  |  - View     |  | - Delete     |
+-------------+  +-------------+  +--------------+

        ↳ All data handled via Firebase Firestore
        ↳ Firebase Auth manages user session
        ↳ Firebase Hosting serves site live


##  Firebase Setup

Go to Firebase Console

Create a new project

Enable:

Firebase Authentication (Email/Password)

Firestore Database (Test Mode)

Create a firebase/config.js file and paste your config:



##js

Copy code


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = { ... };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };




Deployment with Firebase + GitHub
🔧 Setup Steps

# Init Firebase project
firebase init

# Link GitHub during init
firebase init hosting:github




EbusTracker/
├── index.html               # Home page
├── registration.html        # Login/Register page
├── driver.html              # Bus posting page
├── admin.html               # Admin dashboard
├── user.html                # Search buses
│
├── firebase/
│   └── config.js            # Firebase initialization
│
├── js/
│   └── script.js            # All Firebase logic (auth, db)
│
├── CSS/
│   └── style.css            # Shared styling
│
├── .firebaserc
├── firebase.json
├── README.md
