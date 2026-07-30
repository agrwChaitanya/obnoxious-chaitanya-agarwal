import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmfQ0w87Ali85wgcc0xNvTGKqxcmDdSzg",
  authDomain: "canteen-pre-order-socf.firebaseapp.com",
  projectId: "canteen-pre-order-socf",
  storageBucket: "canteen-pre-order-socf.firebasestorage.app",
  messagingSenderId: "265181988695",
  appId: "1:265181988695:web:6032eff6e3fc9fb0cde012"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);