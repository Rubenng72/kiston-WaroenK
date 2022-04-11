import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton, IonLabel, IonSearchbar} from "@ionic/react";
import { isPlatform} from '@ionic/react';
import {addOutline} from "ionicons/icons";
import ItemListCard from '../components/ItemList/ItemListCard';
import HapusSemuabtn from '../components/ItemList/HapusSemua';

const ItemList: React.FC = () => {
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start" >
              <IonSearchbar placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"10px"}} />
              </IonButtons>
              {/* <IonButtons slot="end" >
                <IonButton routerLink="#">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton>
              </IonButtons> */}
              <HapusSemuabtn />
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
            {(
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink="/TambahBarang">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonFabButton>
              </IonFab>
            )}
            <ItemListCard />
          </IonContent>
        </IonPage>
    );
};

export default ItemList;
