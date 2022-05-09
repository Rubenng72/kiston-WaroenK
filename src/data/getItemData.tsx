import { initializeApp } from "firebase/app";
import { collection, query, where, getDocs } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

const auth = getAuth();
const db = getFirestore();
const user = auth.currentUser;
const userId = user ? user.uid : '';

const dbquery = query(collection(db, "barang"), where("uId", "==", userId));

export const getItemData = async() =>{
    const querySnapshot = await getDocs(dbquery);
    return querySnapshot;
}

export default getItemData;
