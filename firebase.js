// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import  { getFirestore, collection, getDocs} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDBLTJvnBa-LIz2kZCJyUtgFYCidkigpvc",
  authDomain: "vocab-b7b7f.firebaseapp.com",
  projectId: "vocab-b7b7f",
  storageBucket: "vocab-b7b7f.appspot.com",
  messagingSenderId: "970363988070",
  appId: "1:970363988070:web:a622ff0622508fe6d1e5a7",
  measurementId: "G-765ZHJEQ61"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getFirestore(app)