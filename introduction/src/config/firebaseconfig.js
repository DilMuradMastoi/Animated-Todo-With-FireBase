import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcJCKWAeEpxL6UfXMc-LBosFxA_vb4bdk",
  authDomain: "fir-db-project-2baa1.firebaseapp.com",
  projectId: "fir-db-project-2baa1",
  storageBucket: "fir-db-project-2baa1.firebasestorage.app",
  messagingSenderId: "139155023005",
  appId: "1:139155023005:web:253fdd8acb101bfea8a074"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);