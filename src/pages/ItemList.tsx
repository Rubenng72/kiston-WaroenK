import React from "react";
import { useEffect, useState } from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton,IonSearchbar} from "@ionic/react";
import { isPlatform} from '@ionic/react';
import {addOutline} from "ionicons/icons";
import ItemListCard from '../components/ItemList/ItemListCard';
import HapusSemuabtn from '../components/ItemList/HapusSemua';

const ItemList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
      setLoading(true);
      setTimeout(()=>{
          setLoading(false);
      }, 2000)
    }, [])
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar color="none">
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"10px"}} />
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

            {(
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink="/TambahBarang">
                    <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonFabButton>
              </IonFab>
            )}
            {loading? <></> : <ItemListCard />}
          </IonContent>
        </IonPage>
    );
};

export default ItemList;
