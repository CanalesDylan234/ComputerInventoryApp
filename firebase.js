import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// Firebase Configuration (Information is personalized from Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyAYvcs4ENaBqJNJoAdGHhcxfNOZoaf8wZE",
    authDomain: "practicedb-33604.firebaseapp.com",
    databaseURL: "https://practicedb-33604-default-rtdb.firebaseio.com",
    projectId: "practicedb-33604",
    storageBucket: "practicedb-33604.appspot.com",
    messagingSenderId: "853163617610",
    appId: "1:853163617610:web:c23e844486282efaa9e5b3",
    measurementId: "G-D62BBWERYR"
};

// Initialize Firebase application (communication with firebase)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//Initialize the Firebase Database
const db = firebase.firestore();
// Export Database and Firebase to use in other files for functions!
export { db, firebase };
