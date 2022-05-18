import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, useIonToast, useIonAlert} from "@ionic/react";
import { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { userRegister } from '../data/auth';
import CryptoJS from 'crypto-js';

const Register: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [present] = useIonToast();
    const [presentAlert] = useIonAlert();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfimPassword] = useState('');
    const secretKey = 'KistonWar';

    const passwordEncryptionHandler = (pass: string) => {
      var encrypted = CryptoJS.AES.encrypt(pass, secretKey).toString();
      setPassword(encrypted);
    }

    const cPasswordEncryptionHandler = (pass: string) => {
      var encrypted = CryptoJS.AES.encrypt(pass, secretKey).toString();
      setConfimPassword(encrypted);
    }

    async function uRegister()
    {
      var decryptedPass = CryptoJS.AES.decrypt(password, secretKey);
      const rPass = decryptedPass.toString(CryptoJS.enc.Utf8);

      var decryptedCoPass = CryptoJS.AES.decrypt(password, secretKey);
      const rCoPass = decryptedCoPass.toString(CryptoJS.enc.Utf8);

      if(rPass != rCoPass)
      {
        present('Password Tidak Sama', 3000)
        //password tidak sama
        return false;
      }
      if(email.trim() === '' || password === '')
      {
        present('Password/Email Kosong', 3000)
        //password/email kosong
        return false;
      }
      
      const res = await userRegister(email, password);
      if(res){
        presentAlert({
          header: 'Alert',
          message: 'Check email untuk verifikasi',
          buttons: [
            'Cancel',
            { text: 'Ok', handler: (d) => history.replace('/tabs/Home')},
          ],
        })

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
                    <IonInput className="inputtext" placeholder="Password" type="password" minlength={6} onIonChange={(e: any) => passwordEncryptionHandler(e.target.value)}></IonInput>
                  </IonRow>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding" style={{paddingTop: 0}}>
                <IonCol>
                  <IonRow>
                    <IonLabel className="ion-padding" style={{paddingBottom: 0}}>Confirm Password</IonLabel>
                  </IonRow>
                  <IonRow className="ion-padding"  style={{paddingBottom: 0}}>
                    <IonInput className="inputtext" placeholder="Confirm" type="password" onIonChange={(e: any) => cPasswordEncryptionHandler(e.target.value)}></IonInput>
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
