// Import the functions you need from the SDKs you need

// import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {initializeApp} from "@firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey : "AIzaSyCWQ_4f6XKLFbKQhFb0rt1rSUa7iuBTyZ0" ,
    authDomain : "pawn-shop-e9145.firebaseapp.com" ,
    projectId : "pawn-shop-e9145" ,
    storageBucket : "pawn-shop-e9145.appspot.com" ,
    messagingSenderId : "422697996522" ,
    appId : "1:422697996522:web:234b425034220659644793" ,
    measurementId : "G-6WTCKSQ36R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const storage = getStorage(app)

