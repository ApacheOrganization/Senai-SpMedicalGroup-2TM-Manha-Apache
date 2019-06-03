import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDE0lUOycnpNf0qg2M9Z68JZBQQAIT_Hsg",
    authDomain: "no-sql-sp-medical-group.firebaseapp.com",
    databaseURL: "https://no-sql-sp-medical-group.firebaseio.com",
    projectId: "no-sql-sp-medical-group",
    storageBucket: "no-sql-sp-medical-group.appspot.com",
    messagingSenderId: "819602910921",
    appId: "1:819602910921:web:b4a47218c09882b6"
  };

  firebase.initializeApp(firebaseConfig)

export default firebase;