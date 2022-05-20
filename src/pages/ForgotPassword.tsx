import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, IonItem, IonCard, IonImg} from "@ionic/react";
import { useState } from 'react';
import { fpass } from '../data/auth';
import { useHistory  } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    async function uFPass()
    {
      const res = await fpass(email);
      if(res){
        history.replace('/tabs/Home');
      }
    }

    return (
      <IonPage>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
        <IonContent>
         
          <IonCard className="card-fp">
            <IonImg src={'https://www.svgrepo.com/show/288860/password.svg'} />
            <IonTitle className="ion-no-padding text-bold ion-margin-vertical" color="dark">Forgot Password</IonTitle>

            <IonRow className="ion-padding-vertical ion-justify-content-center">
                <IonLabel>Enter your email and we'll send you a link to reset your password.</IonLabel>
            </IonRow>

            <IonItem className="ion-no-padding">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonItem>

            <IonRow className="tombol-fp">
              <IonButton 
              shape="round" 
              expand="block" 
              className="tombol-fp ion-padding-vertical" onClick={uFPass}>
                <IonLabel>Send</IonLabel>
              </IonButton>
            </IonRow>

          </IonCard>

        </IonContent>
      </IonPage>
    );
};

export default ForgotPassword;
