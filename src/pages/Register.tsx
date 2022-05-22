import React from "react";
import {IonPage, IonToolbar, IonButtons, IonButton, IonTitle, IonLabel, IonBackButton, IonContent,IonGrid, IonCol, IonRow, IonInput, useIonToast, useIonAlert, IonCard, IonItem, IonText, IonImg} from "@ionic/react";
import { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { userRegister } from '../data/auth';
import CryptoJS from 'crypto-js';
import './Register.css';

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
            <IonCard className="card-register">
              
              <IonImg src={'https://www.svgrepo.com/show/38273/file.svg'} />
              <IonTitle className="ion-padding text-bold ion-margin-vertical" color="dark">Register</IonTitle>

              <IonRow>
                <IonCol>
                  <IonLabel className="text-bold">Email</IonLabel>
                  <IonInput className="ion-text-start ion-padding-vertical" placeholder="Email" type="email" onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
                  <IonText className='text-between-line'></IonText>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonLabel className="text-bold">Password</IonLabel>
                  <IonInput className="ion-text-start ion-padding-vertical" placeholder="Password" type="password" minlength={6} onIonChange={(e: any) => passwordEncryptionHandler(e.target.value)}></IonInput>
                  <IonText className='text-between-line'></IonText>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonLabel className="text-bold">Confirm Password</IonLabel>
                  <IonInput className="ion-text-start ion-padding-vertical" placeholder="Confirm" type="password" onIonChange={(e: any) => cPasswordEncryptionHandler(e.target.value)}></IonInput>
                  <IonText className='text-between-line'></IonText>
                </IonCol>
              </IonRow>

              <IonRow className="tombol-register">
                <IonButton 
                shape="round" 
                expand="block" 
                className="tombol-register" 
                onClick={uRegister}>
                  <IonLabel>Register</IonLabel>
                </IonButton>
              </IonRow>

              <IonRow className="ion-padding-vertical">
                  <IonLabel>Already have an Account?</IonLabel>
                  <Link to="/Login">
                    <IonLabel color="dark">&nbsp; Login</IonLabel>
                  </Link>
              </IonRow>

            </IonCard>
          </IonContent>
        </IonPage>
    );
};

export default Register;
