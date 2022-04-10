import React from "react";
import { useContext } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonItem, IonButtons, IonButton} from '@ionic/react';
import { pencilOutline, trashOutline} from "ionicons/icons";
import BarangContext from '../../data/barang-context';

const GoodMemories: React.FC = () => {
    const barangctx = useContext(BarangContext);

    return (
      <IonGrid>
      {barangctx.items.length != 0 ? barangctx.items.map((item) => (
        <IonRow key={item.id}>
          <IonItem id="item-list" className="ion-no-padding" lines="none">
            <IonCol size="3">
                <img src={item.base64url} alt={item.title} />
            </IonCol>
            <IonCol size="5">
              <IonCardContent className="ion-text-left" id="content-list">
                <IonText>
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                </IonText>
              </IonCardContent>
            </IonCol>
            <IonCol size="2">
              <IonButtons>
                <IonButton color="warning" onClick={() => console.log("to edit")}>
                  <IonIcon icon={pencilOutline} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonCol>
            <IonCol size="2">
              <IonButtons>
                <IonButton color="danger" onClick={() => console.log("to delete")}>
                  <IonIcon icon={trashOutline} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonItem>
      </IonRow>
    ))
    :
      <IonButtons className="ion-padding ion-margin">
        <IonText className="ion-text-center">
          <h5></h5>
          <IonButton color="light" routerLink="">
          </IonButton>
        </IonText>
      </IonButtons>
  }
      </IonGrid>
    );
};

export default GoodMemories;
