import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput} from "@ionic/react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {logoGoogle} from "ionicons/icons";
import { userRegister } from '../firebaseConfig';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfimPassword] = useState('');

    async function uRegister()
    {
      if(password != confirmPassword)
      {
        console.log('sad');
        return false;
      }
      if(email.trim() === '' || password === '')
      {
        return false;
      }
      const res = await userRegister(email, password);
    }
    return (
        <IonPage>
          <IonToolbar color="none">
            <IonButtons slot="start" >
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
          <IonContent>
            <IonGrid>
              <IonRow className="ion-padding">
                  <IonLabel className="ion-padding">Email</IonLabel>
                  <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
              </IonRow>
              <IonRow className="ion-padding">
                  <IonLabel className="ion-padding">Password</IonLabel>
                  <IonInput className="inputtext" placeholder="Password" type="password" minlength={6} onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
              </IonRow>
              <IonRow className="ion-padding">
                  <IonLabel className="ion-padding">Confirm Password</IonLabel>
                  <IonInput className="inputtext" placeholder="Confirm" type="password" onIonChange={(e: any) => setConfimPassword(e.target.value)}></IonInput>
              </IonRow>
              <IonRow className="ion-padding">
                <IonButton
                  id="g-button"
                  color="light"
                  shape="round"
                  onClick={uRegister}
                  >
                  <IonLabel>Register</IonLabel>
                </IonButton>
              </IonRow>
            </IonGrid>
            <IonLabel>Already have an Account?</IonLabel>
            <Link to="/Login"><IonLabel color="warning">Login</IonLabel></Link>
            <IonLabel>OR</IonLabel>
            <IonButton
              id="g-button"
              color="light"
              shape="round"
              onClick={()=>console.log()}
              >
              <IonIcon class="ion-margin-end" icon={logoGoogle} />
              <IonLabel>Continue With Google</IonLabel>
            </IonButton>


          </IonContent>

        </IonPage>
    );
};

export default Register;
