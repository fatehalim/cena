// Import the functions you need from the SDKs you need
import { firebase } from "firebase/compat/app";
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAK9NxYP1gi-6rPoKgHdl-LP7O0IPQUPxg",
    authDomain: "cena-686c3.firebaseapp.com",
    databaseURL: "https://cena-686c3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cena-686c3",
    storageBucket: "cena-686c3.appspot.com",
    messagingSenderId: "774988888979",
    appId: "1:774988888979:web:48e9fa458ac4722563c666",
    measurementId: "G-C3RRMCFSHE"
  
};

// Initialize Firebase
if (getApps().length == 0){
    initializeApp(firebaseConfig)
}

const db = getDatabase();

export { db }
