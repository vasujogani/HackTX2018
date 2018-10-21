// Initialize Firebase
import firebase from "firebase";
import firestore from 'firebase/firestore';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDSEi9zKBrQLDqvgzWi0Me91qPeP9W15u0",
    authDomain: "hacktx2018-e7f10.firebaseapp.com",
    databaseURL: "https://hacktx2018-e7f10.firebaseio.com",
    projectId: "hacktx2018-e7f10",
    storageBucket: "hacktx2018-e7f10.appspot.com",
    messagingSenderId: "39661822152"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
