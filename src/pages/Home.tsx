import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar} from "@ionic/react";
import {addOutline} from "ionicons/icons";

const Home: React.FC = () => {
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start" >
              <IonSearchbar placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"5px"}} />
                <IonButton routerLink="/tabs/TambahBarang"/>
              </IonButtons>
              {/* <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton> */}
              {/* </IonButtons> */}
              <IonButtons slot="end" >
                <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="danger" routerLink="/tabs/TambahBarang">
                  Reset
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>

              </IonToolbar>
            </IonHeader>

          </IonContent>
        </IonPage>
    );
};

export default Home;
