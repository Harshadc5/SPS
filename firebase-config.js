// Firebase Configuration
// Replace these values with your actual Firebase project configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt2sQJo5EcfSoDSx6bngFVg27t9_iiOQ0",
  authDomain: "fir-p-s-c76fe.firebaseapp.com",
  databaseURL: "https://fir-p-s-c76fe-default-rtdb.firebaseio.com",
  projectId: "fir-p-s-c76fe",
  storageBucket: "fir-p-s-c76fe.firebasestorage.app",
  messagingSenderId: "475254775096",
  appId: "1:475254775096:web:47c910325358779728b5cd",
  measurementId: "G-9W275ZRZP7"
};



// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, get, push, remove, update, child } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export database functions
export { database, ref, set, get, push, remove, update, child };
