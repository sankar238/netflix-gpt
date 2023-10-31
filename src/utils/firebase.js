// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXzZBHEoEssE1C_4TiRvzHCI0PCB3L9VY",
  authDomain: "netflixgpt-f05c3.firebaseapp.com",
  projectId: "netflixgpt-f05c3",
  storageBucket: "netflixgpt-f05c3.appspot.com",
  messagingSenderId: "300673303691",
  appId: "1:300673303691:web:9ac7da61f79bad68be008e",
  measurementId: "G-N01310DV9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();