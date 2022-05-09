import { app } from '../firebaseConfig';
import {collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
app();
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
