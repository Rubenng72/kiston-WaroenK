import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent} from "@ionic/react";
import {addOutline} from "ionicons/icons";

const Home: React.FC = () => {
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton>
              </IonButtons>
              <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton>
              </IonButtons>
              <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
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
