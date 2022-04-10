import React from "react";
import { useContext } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonAvatar, IonIcon, IonItemOptions, IonItemOption, IonItem, IonButtons, IonButton} from '@ionic/react';
import {addOutline} from "ionicons/icons";
import BarangContext from '../../data/barang-context';

const GoodMemories: React.FC = () => {
    const barangctx = useContext(BarangContext);

    return (
      <IonGrid>
      {barangctx.items.length != 0 ? barangctx.items.map((item) => (
        <IonRow key={item.id}>
          <IonItem id="item-list" className="ion-no-padding" lines="none">
            <IonCol size="4">
                <img src={item.base64url} alt={item.title} />
            </IonCol>
            <IonCol size="8">
              <IonCardContent className="ion-text-left" id="content-list">
                <IonText>
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                </IonText>
              </IonCardContent>
            </IonCol>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption color="warning" onClick={() => console.log("to edit")}>
              <IonIcon icon={addOutline} slot="icon-only" />
            </IonItemOption>
            <IonItemOption color="danger" onClick={() => console.log("to delete")}>
              <IonIcon icon={addOutline} slot="icon-only" />
            </IonItemOption>
          </IonItemOptions>
      </IonRow>
    ))
    :
      <IonButtons className="ion-padding ion-margin">
        <IonText className="ion-text-center">
<<<<<<< HEAD
          <h5></h5>
          <IonButton color="light" routerLink="">

=======
          <h5>Anda Masih Solo Player?</h5>
          <IonButton color="light" routerLink="/DaftarCalonPasangan">
            Find Partner
>>>>>>> 9da178cfd6b0466c5d1ae0de19310d8717c6bc09
          </IonButton>
        </IonText>
      </IonButtons>
  }
      </IonGrid>
    );
};

export default GoodMemories;
