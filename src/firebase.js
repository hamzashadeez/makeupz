import firebase from 'firebase'

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpECKYAJHzFVdN4sxA7djE1ItHFB7aREU",
    authDomain: "makeup-tut.firebaseapp.com",
    databaseURL: "https://makeup-tut.firebaseio.com",
    projectId: "makeup-tut",
    storageBucket: "makeup-tut.appspot.com",
    messagingSenderId: "248955250451",
    appId: "1:248955250451:web:0ec67814ac8cd8f9f75ce6",
    measurementId: "G-WT20BHW32H"
  });

  const storage = firebaseApp.storage();
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();

  export {db, storage, auth}; 