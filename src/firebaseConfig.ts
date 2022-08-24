import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD31LCEgjoAryFilOOqm6cT4ttoB4siVV4",
  authDomain: "meetmax-ada29.firebaseapp.com",
  projectId: "meetmax-ada29",
  storageBucket: "meetmax-ada29.appspot.com",
  messagingSenderId: "765351271703",
  appId: "1:765351271703:web:62127008058a58e1a0eb52",
  measurementId: "G-499F2DP8SF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth()