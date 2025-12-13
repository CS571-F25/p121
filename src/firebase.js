import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCboUXGSWcwdHABCYZbyjTSFMztvCnUW50",
  authDomain: "climbingclubsite.firebaseapp.com",
  projectId: "climbingclubsite",
  storageBucket: "climbingclubsite.appspot.com",
  messagingSenderId: "434213620782",
  appId: "1:434213620782:web:aa291ff5ed13990120a3bf",
  measurementId: "G-CZZ0SXW3WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);