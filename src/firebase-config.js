// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ppfF8tzfkuSN9PjFFIzXo4uQWMNU7cU",
  authDomain: "invoice-app-46468.firebaseapp.com",
  projectId: "invoice-app-46468",
  storageBucket: "invoice-app-46468.appspot.com",
  messagingSenderId: "78069037883",
  appId: "1:78069037883:web:a54eeeefd907fbe637551e",
  measurementId: "G-JMC11VDHNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)