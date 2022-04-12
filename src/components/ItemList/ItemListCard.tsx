import React from "react";
import { useContext, useState } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonItem, IonButtons, IonButton, IonActionSheet} from '@ionic/react';
import { pencilOutline, trashOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import BarangContext from '../../data/barang-context';
import './ItemListCard.css'

const ItemListCard: React.FC = () => {
    const barangctx = useContext(BarangContext);
    const [ids, setId] = useState<string>();
    const [actionSheet, setShowActionSheet] = useState(false);

    const deleteBarang = (id: string) => {
      barangctx.deleteItem(id);
    }

    const sheetHandler = (id: string) => {
      setShowActionSheet(true);
      setId(id);
    }


    return (
      <IonGrid>
        {barangctx.items.length != 0 ? barangctx.items.map((item) => (
          <IonRow key={item.id}>
            <IonItem id="item-list" className="ion-no-padding imgbackground" lines="none">
              <IonCol size="3">
                  <img src={item.base64url} className="Item" alt={item.title} />
              </IonCol>
              <IonCol size="5">
                <IonCardContent className="ion-text-left" id="content-list">
                  <IonText>
                    <h2>{item.title}</h2>
                    <h2>1 {item.type}</h2>
                    <p className="hargacolor">{item.price}</p>
                  </IonText>
                </IonCardContent>
              </IonCol>
              <IonCol size="2">
                <IonButtons >
                  <IonButton color="warning" routerLink="#" fill ="solid" style={{height:"40px"}}>
                    <IonIcon icon={pencilOutline} slot="icon-only" />
                  </IonButton>
                </IonButtons>
              </IonCol>
              <IonCol size="2">
                <IonButtons>
                  <IonButton color="danger" onClick={() => sheetHandler(item.id)} fill ="solid" style={{height:"40px"}}>
                    <IonIcon icon={trashOutline} slot="icon-only" />
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonItem>
        </IonRow>))
        :
        <IonButtons className="ion-padding ion-margin">
          <IonText className="ion-text-center">
            <h5></h5>
            <IonButton color="light" routerLink="">
            </IonButton>
          </IonText>
        </IonButtons>
        }
        {ids && <IonActionSheet
            isOpen={actionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            header="Hapus barang?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Iya, Hapus",
                handler: () => deleteBarang(ids),
              },
              {
                icon: closeOutline,
                text: "Tidak",
              }
            ]}
            />
          }
      </IonGrid>
    );
};

export default ItemListCard;
