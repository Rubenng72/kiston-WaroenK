import { initializeApp } from "firebase/app";
import {collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5NkeUcDwETdelUw1-VTtR-YiqUOXs6LU",
  authDomain: "kiston-waroenk.firebaseapp.com",
  projectId: "kiston-waroenk",
  storageBucket: "kiston-waroenk.appspot.com",
  messagingSenderId: "256630237276",
  appId: "1:256630237276:web:4a37fc72ef8f87a4171e99",
  measurementId: "G-MTNR7Q0Z7W"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
export const addData = async(uId: string, email: string|null) =>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userId:uId,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding Document: ", e);
  }
}

export default addData;
