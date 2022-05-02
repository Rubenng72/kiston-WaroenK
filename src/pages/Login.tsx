import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput} from "@ionic/react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {logoGoogle} from "ionicons/icons";
import { userLogin, GoogleLogin } from '../firebaseConfig';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function uLogin()
    {
      const res = await userLogin(email, password);

    }

    async function uGoogleLogin()
    {
      const res = GoogleLogin();

    }

    return (
      <IonPage>
        <IonToolbar color="none">
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding">Email</IonLabel>
                <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding">Password</IonLabel>
                <IonInput className="inputtext"minlength={6} placeholder="Password" type="password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
              <IonButton
                id="g-button"
                color="light"
                shape="round"
                onClick={uLogin}
                >
                <IonLabel>Login</IonLabel>
              </IonButton>
            </IonRow>
          </IonGrid>
          <IonButton routerLink='/ForgotPassword' color="none"><IonLabel color="warning">forgot password</IonLabel></IonButton>
          <IonLabel>OR</IonLabel>
          <IonButton
            id="g-button"
            color="light"
            shape="round"
            onClick={uGoogleLogin}
            >
            <IonIcon class="ion-margin-end" icon={logoGoogle} />
            <IonLabel>Continue With Google</IonLabel>
          </IonButton>

          <IonLabel>new here?</IonLabel>
          <Link to="/Register"><IonLabel color="warning">Register</IonLabel></Link>

        </IonContent>

      </IonPage>
    );
};

export default Login;
