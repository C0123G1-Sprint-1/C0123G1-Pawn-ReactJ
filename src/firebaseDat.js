// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBoxHFjucRBudRPWu2vtI0JBefFVCxCao4",
  authDomain: "demon-8e35b.firebaseapp.com",
  projectId: "demon-8e35b",
  storageBucket: "demon-8e35b.appspot.com",
  messagingSenderId: "319532068523",
  appId: "1:319532068523:web:ef6bae3bd24e7d32dc91ee"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);