import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton} from "@ionic/react";
import { isPlatform} from '@ionic/react';
import {addOutline} from "ionicons/icons";

const ItemList: React.FC = () => {
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
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
            {isPlatform('android') && (
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink="/TambahBarang">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonFabButton>
              </IonFab>
            )}

          </IonContent>
        </IonPage>
    );
};

export default ItemList;
