import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonContent, IonBackButton } from "@ionic/react";
import { chevronBackOutline, addOutline} from "ionicons/icons";
import UpdateBarang from '../components/EditBarang/UpdateBarang';

const EditBarang: React.FC = () => {
    const history = useHistory();
    const cancelEdit = () =>{
      localStorage.removeItem('editId');
      localStorage.removeItem('editItem');
      history.goBack();
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={()=>cancelEdit()}>
                  <IonIcon size="large" icon={chevronBackOutline}/>
                </IonButton>
              </IonButtons>
              <IonTitle>Edit Barang</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonButtons slot="start" >
                  <IonButton routerLink="#">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end" >
                  <IonButton routerLink="#">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end" >
                  <IonButton routerLink="#">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <UpdateBarang />
          </IonContent>
        </IonPage>
    );
};

export default EditBarang;
