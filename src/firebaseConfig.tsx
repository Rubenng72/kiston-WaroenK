import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendSignInLinkToEmail} from "firebase/auth";
import { addData } from './data/addUserData';

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
const auth = getAuth(app);

export async function userRegister(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    addData(user.uid, user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
}

export async function userLogin(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

export function GoogleLogin() {

}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    return true;
    // ...
  } else {
    // User is signed out
    // ...
    return false;
  }
});
