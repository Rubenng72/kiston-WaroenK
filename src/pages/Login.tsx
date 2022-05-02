import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, IonText} from "@ionic/react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {logoGoogle} from "ionicons/icons";
import { userLogin, GoogleLogin } from '../firebaseConfig';
import './Login.css';

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
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>

        <IonContent>
          <IonGrid className="card-box">
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding" style={{marginRight:27}}>Email</IonLabel>
                <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding">Password</IonLabel>
                <IonInput className="inputtext"minlength={6} placeholder="Password" type="password" onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
              <IonCol className="center">
              <IonButton
                id="g-button"
                color="light"
                
                onClick={uLogin}
                >
                <IonLabel>Login</IonLabel>
              </IonButton>
              
              <IonButton 
                routerLink='/ForgotPassword' 
                color="light"
                style={{textDecoration: 'none', color:'black'}}
               >
                <IonLabel color="warning">forgot password</IonLabel>
              </IonButton>
          
              </IonCol>
            </IonRow>

            <IonRow>  
              <IonCol>
                <IonText className='text-between-line'>Or</IonText>
              </IonCol>
            </IonRow>

          <IonRow className="ion-padding">
            <IonCol className="center">
              <IonButton
                id="g-button"
                color="light"
                shape="round"
                onClick={uGoogleLogin}
                >
                <IonIcon class="ion-margin-end" icon={logoGoogle} />
                <IonLabel>Continue With Google</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

        <IonRow className="ion-padding">
            <IonLabel>New here?</IonLabel>
            <Link to="/Register"><IonLabel color="warning">Register</IonLabel></Link>
        </IonRow>
        </IonGrid>
        </IonContent>
      </IonPage>
    );
};

export default Login;
