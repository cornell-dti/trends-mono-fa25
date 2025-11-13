import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Our web app's Firebase configuration (example)
const firebaseConfig = {
  apiKey: "AIzaSyAp-r5EOre-s8pZm3eHDrag61Mx8-yNP0w",
  authDomain: "trends-fa25-lec8.firebaseapp.com",
  projectId: "trends-fa25-lec8",
  storageBucket: "trends-fa25-lec8.firebasestorage.app",
  messagingSenderId: "920197682301",
  appId: "1:920197682301:web:414539ad6f47aad52fcd14"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth();
