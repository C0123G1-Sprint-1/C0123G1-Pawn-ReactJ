// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAEpVoVJnSVDRMUlyEp_mSoiq3YKdCsLmc",
    authDomain: "pawn-shop-edf8b.firebaseapp.com",
    projectId: "pawn-shop-edf8b",
    storageBucket: "pawn-shop-edf8b.appspot.com",
    messagingSenderId: "366860057239",
    appId: "1:366860057239:web:66c9e6c26767b7f2d607d2",
    measurementId: "G-FCJVTP4581"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)