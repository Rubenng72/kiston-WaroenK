import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput} from "@ionic/react";
import { useState } from 'react';
import { fpass } from '../data/auth';
import { useHistory  } from 'react-router-dom';

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
          <IonGrid className="card-box">
            <IonRow className="ion-padding">
                <IonLabel className="ion-padding">Email</IonLabel>
                <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
            </IonRow>
            <IonRow className="ion-padding">
              <IonCol className="center">
              <IonButton
                id="g-button"
                color="light"
                shape="round"
                onClick={uFPass}
                >
                <IonLabel>send</IonLabel>
              </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonContent>

      </IonPage>
    );
};

export default ForgotPassword;
