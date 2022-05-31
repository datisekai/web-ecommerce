// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCpZ0WGKl_H0nu4jTtrr1R0FcgpU08iL8",
  authDomain: "web-ecommerce-92d39.firebaseapp.com",
  projectId: "web-ecommerce-92d39",
  storageBucket: "web-ecommerce-92d39.appspot.com",
  messagingSenderId: "536512662528",
  appId: "1:536512662528:web:6807a07cd3b8926bed1ce5",
  measurementId: "G-GJ78H4B0XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);