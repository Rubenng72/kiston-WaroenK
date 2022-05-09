import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, IonText, IonToast} from "@ionic/react";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userLogin, userAsAnonymous } from '../firebaseConfig';
import { getAuth } from "firebase/auth";
import CryptoJS from 'crypto-js';
import './Login.css';

const Login: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory();
    const [toastMessage, setToastMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function uLogin()
    {
      const res = await userLogin(email, password);
      if(res){
        history.replace('/tabs/Home');
        //berhasil login
      }
    }

    async function uSkip()
    {
      const res = await userAsAnonymous();
      if(res){
        history.replace('/tabs/Home');
        //continue as guest
      }
    }

    const skipbuttonhandler = () =>
    {
      if(user == null)
      {
        return(<IonButton
          routerLink='/Home'
          color="light"
          shape="round"
          expand="block"
          onClick={uSkip}>
          <IonLabel color="warning">SKIP continue as guest</IonLabel>
        </IonButton>);
      }
      else{
        return;
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
          <IonGrid className="card-box">
            <IonRow className="ion-padding" style={{paddingBottom: 0}}>
                <IonLabel className="ion-padding" style={{marginRight:27}}>Email</IonLabel>
                <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding">Password</IonLabel>
                <IonInput className="inputtext"minlength={6} placeholder="Password" type="password" onIonChange={(e: any) => setPassword(CryptoJS.SHA256(e.target.value).toString())}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
              <IonCol className="center">
              <IonButton
                id="g-button"
                color="light"
                onClick={uLogin}
                shape="round"
                expand="block"
                >
                <IonLabel>Login</IonLabel>
              </IonButton>

              <IonButton
                routerLink='/ForgotPassword'
                color="light"
                shape="round"
                expand="block"
               >
                <IonLabel color="warning">Forgot Password</IonLabel>
              </IonButton>

              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonText className='text-between-line'>OR</IonText>
              </IonCol>
            </IonRow>

        <IonRow className="ion-padding">
            <IonLabel>New here?</IonLabel>
            <Link to="/Register"><IonLabel color="warning">Register</IonLabel></Link>
        </IonRow>
        {skipbuttonhandler()}
        </IonGrid>

        </IonContent>
      </IonPage>
    );
};

export default Login;
