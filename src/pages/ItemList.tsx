import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton,IonSearchbar, IonGrid, IonImg, IonRow, IonText, IonTitle} from "@ionic/react";
import { isPlatform} from '@ionic/react';
import {addOutline} from "ionicons/icons";
import ItemListCard from '../components/ItemList/ItemListCard';
import HapusSemuabtn from '../components/ItemList/HapusSemua';
import { getAuth } from "firebase/auth";

const ItemList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const auth = getAuth();
  const user = auth.currentUser;

     //new func
  const handlerHandler = () => {
    if (user !== null) {
      if (user.isAnonymous) {
        return (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink="/TambahBarang">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonFabButton>
              </IonFab>
        );
      } else {
        return (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/TambahBarang">
              <IonIcon size="large"  md={addOutline} ios={addOutline}/>
          </IonFabButton>
        </IonFab>
        );
      }
    } else {
      return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink="/Register">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonFabButton>
              </IonFab>

      );
    }
  };

    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar color="none">
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" onIonChange={e => setSearchValue(e.detail.value!)} style={{marginTop:"10px", marginRight:"10px"}} />
              </IonButtons>
              <HapusSemuabtn/>
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

            
            {handlerHandler()}
            

            <ItemListCard onSearchValue={searchValue}/>    
          
          </IonContent>
        </IonPage>
    );
};

export default ItemList;
