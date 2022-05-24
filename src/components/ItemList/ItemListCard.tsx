import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonButtons, IonButton, IonActionSheet, IonCard, IonTitle, IonLabel} from '@ionic/react';
import { pencilOutline, trashOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import BarangContext from '../../data/barang-context';
import './ItemListCard.css'
import { getAuth } from "firebase/auth";
interface barangType {
  id: string;
  uId: string;
  foto: string;
  fotoUrl: string;
  title: string;
  price: number;
  type: 'box';
  disc: number;
  nMax: number;
  amount: number;
};

const ItemListCard: React.FC<{ onSearchValue: string} > = props => {

    const barangctx = useContext(BarangContext);
    const [ids, setId] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [actionSheet, setShowActionSheet] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

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

    const priceTypeHandler = (iPrice: number, inMax: number, iDisc: number) =>{
      let hargaBox = 0;

      hargaBox = (inMax * iPrice) - ((inMax * iPrice) * (iDisc/100));

      return parseFloat(((hargaBox)).toString()).toLocaleString('en');
    }

    // Function Search
    useEffect(() => {
      searchFunction();
    }, [props.onSearchValue]);

    const searchFunction = () => {
      return barangctx.items.filter((barang: barangType) => (
        barang.title.toLowerCase().includes(props.onSearchValue.toLowerCase())
      ));
    }

    const handlerHandler = () => {
      if (user !== null) {
        if (user.isAnonymous) {
          return (
            <IonButton fill="clear" expand="block" color="light" routerLink="/TambahBarang">
            <IonTitle>Tambah barang</IonTitle>
          </IonButton>
          );
        } else {
          return (
            <IonButton fill="clear" expand="block" color="light" routerLink="/TambahBarang">
            <IonTitle>Tambah barang</IonTitle>
          </IonButton>
  
          );
        }
      } else {
        return (
          
          <>
          <br></br>
          <IonTitle className="ion-text-center">You need to Sign In / Register first!</IonTitle>
          <br></br>
          <IonButton fill="clear" expand="block" color="light" routerLink="/Login">
            <IonTitle>Login</IonTitle>
          </IonButton><IonButton fill="clear" expand="block" color="" routerLink="/Login">
              <IonTitle>Register</IonTitle>
            </IonButton></>
  
        );
      }
    };


    return (
      <IonGrid>        
        {props.onSearchValue == '' && barangctx.items.length != 0  && ( barangctx.items.map((item) =>(
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
          <IonCol size="3" className="ion-no-margin">
            <img src={(item.fotoUrl)} className="Item-img" alt={item.title}/>
          </IonCol>
          <IonCol size="5">
            <IonCardContent className="ion-text-left ion-no-padding " id="content-list" >
              <IonText>
                <h2>{item.title}</h2>
                <h2>1 pcs</h2> <p className="hargacolor ion-no-padding">Rp. {parseFloat(item.price.toString()).toLocaleString('en')}</p>
                <h2>1 {item.type} ({item.nMax} pcs)</h2> <p className="hargacolor ion-no-padding">Rp. {priceTypeHandler(item.price, item.nMax, item.disc)}</p>
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
        )}

        {barangctx.items.length == 0 && (
         <IonGrid>{handlerHandler()}</IonGrid>
        )}

        {props.onSearchValue != '' && barangctx.items.length != 0  && ( searchFunction().map((item) =>(
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
          <IonCol size="3" className="ion-no-margin">
            <img src={(item.fotoUrl)} className="Item-img" alt={item.title}/>
          </IonCol>
          <IonCol size="5">
            <IonCardContent className="ion-text-left ion-no-padding " id="content-list" >
              <IonText>
                <h2>{item.title}</h2>
                <h2>1 pcs</h2> <p className="hargacolor ion-no-padding">Rp. {parseFloat(item.price.toString()).toLocaleString('en')}</p>
                <h2>1 {item.type} ({item.nMax} pcs)</h2> <p className="hargacolor ion-no-padding">Rp. {priceTypeHandler(item.price, item.nMax, item.disc)}</p>
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
        )}

        {ids && <IonActionSheet
            cssClass = 'IASBackground'
            isOpen={actionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            header="Delete Item?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Yes, Delete",
                handler: () => deleteBarang(ids, img),
              },
              {
                icon: closeOutline,
                text: "No",
              }
            ]}
            />
          }
      </IonGrid>
    );
};

export default ItemListCard;
