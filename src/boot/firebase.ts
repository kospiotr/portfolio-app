// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrA79f1SU2gKns7yDB3oUKlcsMT828mL0',
  authDomain: 'portfolio-repository.firebaseapp.com',
  projectId: 'portfolio-repository',
  storageBucket: 'portfolio-repository.appspot.com',
  messagingSenderId: '676031848053',
  appId: '1:676031848053:web:86260f5ebd7c561408a23c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log('firebase init" ', app, db);
export { app, db };
