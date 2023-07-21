// Import the functions you need from the SDKs you need

import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAJSBooh2q6TrT3PLwIG2B2YWjGy0dOHUk",
    authDomain: "file-30cfe.firebaseapp.com",
    projectId: "file-30cfe",
    storageBucket: "file-30cfe.appspot.com",
    messagingSenderId: "768865130975",
    appId: "1:768865130975:web:c3fafd7f2512c28898cc6a",
    measurementId: "G-3D8B04XK2R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const storage = getStorage(app)

