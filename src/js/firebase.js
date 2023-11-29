// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzupLPn3ccTrHHuJe6K_rAiQ0-o8JJaWg",
  authDomain: "noteslist-vue-b1112.firebaseapp.com",
  projectId: "noteslist-vue-b1112",
  storageBucket: "noteslist-vue-b1112.appspot.com",
  messagingSenderId: "628327165239",
  appId: "1:628327165239:web:1f34cad2498b702b457eb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
