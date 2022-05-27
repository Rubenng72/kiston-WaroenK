import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, IonText, IonToast, useIonToast, IonCard, IonItem, IonImg} from "@ionic/react";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from '../data/auth';
import { getAuth } from "firebase/auth";
import CryptoJS from 'crypto-js';
import './Login.css';

const Login: React.FC = () => {
    const [present] = useIonToast();
    const [toastMessage, setToastMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const secretKey = 'KistonWar';

    const passwordEncryptionHandler = (pass: string) => {
      var encrypted = CryptoJS.AES.encrypt(pass, secretKey).toString();
      setPassword(encrypted);
    }

    async function uLogin()
    {
      if(email.trim() === '' || password === '')
      {
        present('Please fill your email and password', 3000)
        //password/email kosong
        return false;
      }
      const res = await userLogin(email, password);
      if(res){
        present('Berhasil Login', 3000)
        window.location.assign("/tabs/Home");
        // history.replace('/tabs/Home');
        //berhasil login
      }else{
        present('Incorrect email or password', 3000)
      }
    }

    return (
      <IonPage>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>

        <IonContent>
          <IonCard className="card-login">

            <IonImg src={'https://www.svgrepo.com/show/382774/user-application-identity-authentication-login.svg'} />
            <IonTitle className="ion-no-padding text-bold ion-margin-vertical" color="dark">Login</IonTitle>
            <IonRow className="ion-padding-vertical">
                <IonLabel>Don't have an account?</IonLabel>
                <Link to="/Register">
                  <IonLabel color="dark">&nbsp; Create your account</IonLabel>
                </Link>
            </IonRow>

            <IonItem className="ion-no-padding">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonItem>

            <IonItem className="ion-no-padding">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput minlength={6} placeholder="Password" type="password" onIonChange={(e: any) => passwordEncryptionHandler(e.target.value)}></IonInput>
            </IonItem>

            <IonRow className="ion-padding-vertical ion-float-right">
              <Link to="/ForgotPassword">
                <IonLabel color="dark">Forgot Password</IonLabel>
              </Link>
            </IonRow>

            <IonRow className="ion-padding-vertical ion-float-left">
              <IonLabel color="medium">6-20 characters or numbers</IonLabel>
            </IonRow>

            <IonRow className="tombol-login">
              <IonButton
              shape="round"
              expand="block"
              className="tombol-login" onClick={uLogin}>
                <IonLabel>Login</IonLabel>
              </IonButton>
            </IonRow>

            {/* <IonRow>
              <IonCol>
                <IonText className='text-between-line'>OR</IonText>
              </IonCol>
            </IonRow> */}


            {/* {skipbuttonhandler()} */}
          </IonCard>
        </IonContent>
      </IonPage>
    );
};

export default Login;
