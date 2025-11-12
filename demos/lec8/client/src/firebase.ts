import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Our web app's Firebase configuration (example)
const firebaseConfig = {
  apiKey: "AIzaSyAb4k6jaHCxhgQrbiZJDCSS_fr2snMXWIg",
  authDomain: "trends-lec7-fa25-demo.firebaseapp.com",
  projectId: "trends-lec7-fa25-demo",
  storageBucket: "trends-lec7-fa25-demo.firebasestorage.app",
  messagingSenderId: "979059028672",
  appId: "1:979059028672:web:e6916375f2de1b8850f325",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth();
