import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput} from "@ionic/react";
import { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { userRegister } from '../firebaseConfig';
import CryptoJS from 'crypto-js';

const Register: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfimPassword] = useState('');

    async function uRegister()
    {
      if(password != confirmPassword)
      {
        console.log(password, confirmPassword);
        console.log('sad');
        //password tidak sama
        return false;
      }
      if(email.trim() === '' || password === '')
      {
        //password/email kosong
        return false;
      }
      const res = await userRegister(email, password);
      if(res){
        history.replace('/tabs/Home');
        //berhasil register ((Alert)'Check email untuk verifikasi')
      }
    }
    return (
        <IonPage>
          <IonToolbar>
            <IonButtons slot="start" >
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
          <IonContent>
            <IonGrid className="card-box">

              <IonRow className="ion-padding"  style={{paddingBottom: 0, paddingTop: 0}}>
                <IonCol>
                  <IonRow className="ion-padding" style={{paddingBottom: 0}}>
                    <IonLabel >Email</IonLabel>
                  </IonRow>
                  <IonRow className="ion-padding" style={{paddingBottom: 0}}>
                    <IonInput className="inputtext" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
                  </IonRow>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding"  style={{paddingTop: 0, paddingBottom:0}}>
                <IonCol>
                  <IonRow className="ion-padding"  style={{paddingBottom: 0}}>
                    <IonLabel>Password</IonLabel>
                  </IonRow>
                  <IonRow className="ion-padding"  style={{paddingBottom: 0}}>
                    <IonInput className="inputtext" placeholder="Password" type="password" minlength={6} onIonChange={(e: any) => setPassword(CryptoJS.SHA256(e.target.value).toString())}></IonInput>
                  </IonRow>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding" style={{paddingTop: 0}}>
                <IonCol>
                  <IonRow>
                    <IonLabel className="ion-padding" style={{paddingBottom: 0}}>Confirm Password</IonLabel>
                  </IonRow>
                  <IonRow className="ion-padding"  style={{paddingBottom: 0}}>
                    <IonInput className="inputtext" placeholder="Confirm" type="password" onIonChange={(e: any) => setConfimPassword(CryptoJS.SHA256(e.target.value).toString())}></IonInput>
                  </IonRow>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding" style={{paddingTop: 0}}>
                <IonCol className="center">
                  <IonButton
                    id="g-button"
                    color="light"
                    shape="round"
                    onClick={uRegister}
                    >
                    <IonLabel>Register</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding">
                <IonLabel>Already have an Account?</IonLabel>
                <Link to="/Login"><IonLabel color="warning">Login</IonLabel></Link>
              </IonRow>
            </IonGrid>

          </IonContent>

        </IonPage>
    );
};

export default Register;
