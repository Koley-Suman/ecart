// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnOOD86wyRmI-dG_SQH3hxjgeG7Mz2aFM",
  authDomain: "ecart-56baa.firebaseapp.com",
  projectId: "ecart-56baa",
  storageBucket: "ecart-56baa.appspot.com",
  messagingSenderId: "32660153572",
  appId: "1:32660153572:web:93d0e57ea2767a91b4b8f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createAuth = async(userauth)=>{
  
}

// const dataRef = {name:'suman', value:"123456"}
// export const createdb = await addDoc(collection(db,"user"),dataRef)