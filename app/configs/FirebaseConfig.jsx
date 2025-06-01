// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "throwee-68f75.firebaseapp.com",
  projectId: "throwee-68f75",
  storageBucket: "throwee-68f75.firebasestorage.app",
  messagingSenderId: "1051879305753",
  appId: "1:1051879305753:web:90a25f5070fa893fa5b088",
  measurementId: "G-C6DXDP0BXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)