import React from "react";
import { useContext, useState } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonItem, IonButtons, IonButton, IonActionSheet, IonCard} from '@ionic/react';
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
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
          <IonCol size="3" className="ion-no-margin">
          <img src={item.base64url} className="Item-img" alt={item.title} />
          </IonCol>
          <IonCol size="5">
            <IonCardContent className="ion-text-left ion-no-padding " id="content-list" >
              <IonText>
                <h2>{item.title}</h2>
                <h2>1 {item.type}</h2>
                <p className="hargacolor">{item.price}</p>
              </IonText>
            </IonCardContent>
          </IonCol>
          <IonCol size="2" >
            <IonButtons className="icon-button">
              <IonButton routerLink={`/EditBarang/${item.id}`} fill ="solid" className="icon" >
                <IonIcon icon={pencilOutline} slot="icon-only" size="large"/>
              </IonButton>
            </IonButtons>
          </IonCol>
          <IonCol size="2" >
            <IonButtons className="icon-button">
              <IonButton color="danger" onClick={() => sheetHandler (item.id)}  fill ="solid" className="icon">
                <IonIcon icon={trashOutline} slot="icon-only"size="large" />
              </IonButton>
            </IonButtons>
          </IonCol>
          </IonRow>
        </IonCard>))
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
            cssClass = 'IASBackground'
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
