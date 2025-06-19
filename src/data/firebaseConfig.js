// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCo16tWjGVSEUYq45orw9H8xaNbN7XhA0U",
    authDomain: "blast-of-history---db.firebaseapp.com",
    projectId: "blast-of-history---db",
    storageBucket: "blast-of-history---db.firebasestorage.app",
    messagingSenderId: "617619167254",
    appId: "1:617619167254:web:a695a3f268de172679bd37"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export both
export { app, db };
