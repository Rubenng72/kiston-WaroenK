import React from "react";
import { useState, useContext } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonButtons, IonButton, IonActionSheet, IonCard} from '@ionic/react';
import { pencilOutline, trashOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import BarangContext from '../../data/barang-context';
import './ItemListCard.css'

const ItemListCard: React.FC = () => {

    const barangctx = useContext(BarangContext);
    const [ids, setId] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [actionSheet, setShowActionSheet] = useState(false);

    async function deleteBarang(id: string, img: string) {
      barangctx.deleteSingleItem(id, img);
    }

    const sheetHandler = (id: string, img: string) => {
      setShowActionSheet(true);
      setId(id);
      setImg(img);
    }

    const setEditData = (id: string) => {
      barangctx.items.forEach((value)=>{
        if(value.id == id)
        {
          localStorage.setItem("editId", value.id);
          localStorage.setItem("editItem", JSON.stringify(value));
        }
      })
    }

    return (
      <IonGrid>
        {barangctx.items.length != 0  ? barangctx.items.map((item) =>(
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
          <IonCol size="3" className="ion-no-margin">
            <img src={(item.fotoUrl)} className="Item-img" alt={item.title}/>
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
              <IonButton routerLink={`/EditBarang/${item.id}`} fill ="solid" className="icon" onClick={()=>setEditData(item.id)} >
                <IonIcon icon={pencilOutline} slot="icon-only" size="large"/>
              </IonButton>
            </IonButtons>
          </IonCol>
          <IonCol size="2" >
            <IonButtons className="icon-button">
              <IonButton color="danger" onClick={() => sheetHandler (item.id, item.foto)}  fill ="solid" className="icon">
                <IonIcon icon={trashOutline} slot="icon-only"size="large" />
              </IonButton>
            </IonButtons>
          </IonCol>
          </IonRow>
        </IonCard>))
        :
        <IonButtons className="ion-padding ion-margin">
          <IonText className="ion-text-center">
            <IonButton color="light" routerLink="/TambahBarang">
            <h5>Tambah barang</h5>
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
                handler: () => deleteBarang(ids, img),
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
