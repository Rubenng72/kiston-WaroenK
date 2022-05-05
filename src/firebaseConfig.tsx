import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, sendPasswordResetEmail, signInAnonymously, EmailAuthProvider, linkWithCredential} from "firebase/auth";
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
const user = auth.currentUser;

export const userRegister = async (email: string, password: string) => {
  if(user !== null && user.isAnonymous){
    try{
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(user, credential);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }else{
    try{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addData(user.uid, user.email);
        sendEmailVerification(auth.currentUser!).then(()=>{console.log('email sent')})
      })
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}

export async function userLogin(email: string, password: string) {
  try{
    await signInWithEmailAndPassword(auth, email, password)
    return true;
  }catch(error){
    return false;
  };
}

export async function fpass(email:string){
  sendPasswordResetEmail(auth, email);
}

export const userAsAnonymous  = async () => {
  try{
    signInAnonymously(auth);
    return true;
  }catch(error){
    return false;
  }
}

export async function logout(){
  try{
    signOut(auth);
    return true;
  }catch(error){
    return false;
  }

}

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("users", JSON.stringify(user));
  } else {
    localStorage.clear();
  }
});
