import React from "react";
import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonFab, IonFabButton, IonLabel, IonSearchbar, IonItem} from "@ionic/react";
import { isPlatform} from '@ionic/react';
import {addOutline, createOutline, trashOutline} from "ionicons/icons";
import ItemListCard from '../components/ItemList/ItemListCard';
import HapusSemuabtn from '../components/ItemList/HapusSemua';

const ItemList: React.FC = () => {
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"10px"}} />
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

            {/* <IonItem lines="full" button color='light' style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
            <div style={{display:"flex", height:'120px'}}>
            <img style={{borderRadius:'100%',marginTop:'10px',marginBottom:'10px', marginRight:'auto',marginLeft:'auto',display:'block'}} src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
            <div >
            <h6 style={{marginTop:'10px',marginLeft:'10px', fontSize:"12px",fontWeight:'bold', width:'100px'}}>nama item</h6>
            <p style={{marginTop:'5px',marginLeft:'10px' , fontSize:"12px",fontWeight:'bold'}}>jumlah item</p>
            <p style={{marginTop:'0px',marginLeft:'10px', fontSize:"9px",fontWeight:"lighter"}}>harga item</p>
            </div>
            </div>
            <div >
                <IonButton size="default">
                  <IonIcon size='default' md={createOutline} />
                </IonButton>
            </div>
            <div >
                <IonButton item-end size='default'>
                  <IonIcon size='default' md={trashOutline} />
                </IonButton>
            </div>
            </IonItem> */}
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
