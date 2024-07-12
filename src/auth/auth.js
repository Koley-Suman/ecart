// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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


export const onAuthStateChanged_Listener = (callback) =>
  onAuthStateChanged(auth, callback);

// const dataRef = {name:'suman', value:"123456"}
// export const createdb = await addDoc(collection(db,"user"),dataRef)
export const createUserFromAuth = async (userauth) => {
  const userReferance = doc(db, "users", userauth.uid);
  const userSnapshot = await getDoc(userReferance);


  if (!userSnapshot.exists()) {
    const { displayName, email } = userauth;
    const createDate = Date.now();
    console.log("create", userauth);

    try {
      await setDoc(userReferance, {
        email,
        createDate,
        displayName
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userReferance;
};

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChanged_Listeners = (callback) =>
  onAuthStateChanged(auth, callback);