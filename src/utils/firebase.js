import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9wOWf49tjWujuGDh-2zqeBHCNKqBfhOs",
    authDomain: "household-inventory-app.firebaseapp.com",
    databaseURL: "https://household-inventory-app.firebaseio.com",
    projectId: "household-inventory-app",
    storageBucket: "household-inventory-app.appspot.com",
    messagingSenderId: "89534490645",
    appId: "1:89534490645:web:7f4a153d265d40e836861c"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;

