// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Hardcoded Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3vLNvAV9owMBDOC_taYDYA_FWqqa0JyU",
  authDomain: "aai-ai.firebaseapp.com",
  projectId: "aai-ai",
  storageBucket: "aai-ai.appspot.com",
  messagingSenderId: "783081489638",
  appId: "1:783081489638:web:16e605e1dcddb0e72da727",
  measurementId: "G-KV7BVM2VZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };