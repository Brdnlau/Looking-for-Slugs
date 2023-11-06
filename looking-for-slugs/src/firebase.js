// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "./firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useState } from 'react';
// Importing datastore scrips
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmzIYxSheADRsRyc5oKq3v35mAXhATAKA",
  authDomain: "lookingforslugs-67b9c.firebaseapp.com",
  projectId: "lookingforslugs-67b9c",
  storageBucket: "lookingforslugs-67b9c.appspot.com",
  messagingSenderId: "774728549815",
  appId: "1:774728549815:web:b5408c12ec6e5e78f8d432",
  measurementId: "G-NEMNKT1JZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
var db = getFirestore(app);

export {auth, app, db};