import { app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut, sendPasswordResetEmail, signInAnonymously, EmailAuthProvider, linkWithCredential} from "firebase/auth";
import { addData } from './addUserData';
import CryptoJS from 'crypto-js';
app();
const auth = getAuth();
const user = auth.currentUser;
const secretKey = 'KistonWar';

export const userRegister = async (email: string, password: string) => {
  if(user !== null && user.isAnonymous){
    try{
      var decrypted = CryptoJS.AES.decrypt(password, secretKey);
      const rPass = decrypted.toString(CryptoJS.enc.Utf8);
      const credential = EmailAuthProvider.credential(email, rPass);
      const istrue = await linkWithCredential(user, credential).then(()=>{return true;})
      .catch((error)=>{
        alert(error);
        return false});
        if(istrue){
          return true
        }
    }catch(error){
      console.log(error);
      return false;
    }
  }else{
    try{
      var decrypted = CryptoJS.AES.decrypt(password, secretKey);
      const rPass = decrypted.toString(CryptoJS.enc.Utf8);
      const istrue = await createUserWithEmailAndPassword(auth, email, rPass)
      .then((userCredential) => {
        const user = userCredential.user;
        addData(user.uid, user.email);
        sendEmailVerification(auth.currentUser!).then(()=>{});
        return true;
      }).catch((error)=>{
        console.log(error);
        return false;
      })
      if(istrue){
        return true
      }
    }catch(error){
      console.log(error);
      return false;
    }
  }
}

export async function userLogin(email: string, password: string) {
  try{
    var decrypted = CryptoJS.AES.decrypt(password, secretKey);
    const rPass = decrypted.toString(CryptoJS.enc.Utf8);
    const istrue = await signInWithEmailAndPassword(auth, email, rPass).then(()=>{return true})
    .catch((error)=>{
      alert(error);
      return false;
    })
    if(istrue){
      return true;
    }
  }catch(error){
    return false;
  };
}

export async function fpass(email:string){
  try{
    const istrue = await sendPasswordResetEmail(auth, email).then(()=>{
      alert('email terkirim');
      return true;
    })
    .catch((error)=>{
      alert(error);
      return false;
    })
    if(istrue){
      return true;
    }
  }catch(error){
    return false;
  }
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
    const istrue = await signOut(auth).then(()=>{
      return true;
    })
    .catch((error)=>{
      alert(error);
      return false;
    });
    if(istrue){
      return true;
    }
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
