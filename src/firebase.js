// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCboUXGSWcwdHABCYZbyjTSFMztvCnUW50",
  authDomain: "climbingclubsite.firebaseapp.com",
  projectId: "climbingclubsite",
  storageBucket: "climbingclubsite.firebasestorage.app",
  messagingSenderId: "434213620782",
  appId: "1:434213620782:web:aa291ff5ed13990120a3bf",
  measurementId: "G-CZZ0SXW3WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
