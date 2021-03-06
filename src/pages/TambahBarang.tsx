import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonContent, IonBackButton} from "@ionic/react";
import {addOutline} from "ionicons/icons";
import InputBarang from '../components/TambahBarang/InputBarang';

const TambahBarang: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" >
                <IonBackButton defaultHref="/tabs/ItemList"></IonBackButton>
              </IonButtons>
              <IonTitle>Add Item</IonTitle>
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

            <InputBarang />
          </IonContent>

        </IonPage>
    );
};

export default TambahBarang;
