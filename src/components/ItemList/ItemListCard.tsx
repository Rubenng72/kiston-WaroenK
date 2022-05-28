import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {IonGrid, IonRow, IonCol, IonCardContent, IonText, IonIcon, IonButtons, IonButton, IonActionSheet, IonCard, IonTitle, IonLabel, IonAccordion, IonItem, IonList, IonAccordionGroup, IonInput,} from '@ionic/react';
import { pencilOutline, trashOutline, checkmarkOutline, closeOutline, arrowDownCircle} from "ionicons/icons";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
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
  nMax: number;
  amount: number;
  cost: number;
  stock: number;
};

const ItemListCard: React.FC<{ onSearchValue: string} > = props => {

    const barangctx = useContext(BarangContext);
    const [ids, setId] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [add, setAdd] = useState<number>(0);

    const [actionSheet, setShowActionSheet] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

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

    const priceTypeHandler = (iPrice: number, inMax: number) =>{
      let hargaBox = 0;

      hargaBox = (inMax * iPrice);

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

    // const accordionHandler = (id: string) => {
    //  setId(id);
    // };

    const addItemStock = async() => {
      let stockSum = 0
      barangctx.items.forEach((value)=>{
        if(value.id == ids){
          stockSum = (value.nMax * add) + value.stock
        }
      })
     const barangRef = doc(db, "barang", ids);
     await updateDoc(barangRef, { stock: stockSum });
    }

    // const showHistoryReceipt = (id: string) =>{
    //   historyRec.forEach((value)=>{
    //     if(value.receiptId == id){
    //       return(
    //           <IonItem>
    //             <IonLabel>{value.quantity} pcs</IonLabel>
    //           </IonItem>
    //       )
    //     }
    //   })
    // }

    return (
      <IonGrid>
        {props.onSearchValue == '' && barangctx.items.length != 0  && ( barangctx.items.map((item) =>(
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
            <IonCol size="3" className="ion-no-margin">
                <img src={item.fotoUrl} className="Item-img" alt={item.title} />
              </IonCol>
              <IonCol size="5">
                <IonCardContent
                  className="ion-text-left ion-no-padding "
                  id="content-list"
                >
                  <IonText>
                    <h2>{item.title}</h2>
                    <h2>1 pcs</h2>{" "}
                    <p className="hargacolor ion-no-padding">
                      Rp.{" "}
                      {parseFloat(item.price.toString()).toLocaleString("en")}
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCol>
              <IonCol size="2">
                <IonButtons className="icon-button">
                  <IonButton
                    routerLink={`/EditBarang/${item.id}`}
                    fill="solid"
                    className="icon"
                    onClick={() => setEditData(item.id)}
                  >
                    <IonIcon
                      icon={pencilOutline}
                      slot="icon-only"
                      size="large"
                    />
                  </IonButton>
                </IonButtons>
              </IonCol>
              <IonCol size="2">
                <IonButtons className="icon-button">
                  <IonButton
                    color="danger"
                    onClick={() => sheetHandler(item.id, item.foto)}
                    fill="solid"
                    className="icon"
                  >
                    <IonIcon
                      icon={trashOutline}
                      slot="icon-only"
                      size="large"
                    />
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonRow>
            <IonAccordionGroup>
            <IonAccordion toggleIcon={arrowDownCircle}>
                <IonItem slot="header">
                  <IonLabel>Items in Stock</IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel>Stock Amount : {item.stock} pcs</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Pcs/Box : {item.nMax}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonCard color="light">
                      <IonInput placeholder="increase stock /box" value={add} type={"number"} clearOnEdit onIonChange={(e) => setAdd(Number(e.detail.value))} onIonInput={() => setId(item.id)}><IonLabel className="ion-text-left ion-margin-start">Box</IonLabel></IonInput>
                    </IonCard>
                    <IonButton onClick={()=>addItemStock()}>+ Stock</IonButton>
                  </IonItem>
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCard>
        )))}

        {barangctx.items.length == 0 && (<IonGrid>{handlerHandler()}</IonGrid>)}

        {props.onSearchValue != '' && barangctx.items.length != 0  && ( searchFunction().map((item) =>(
          <IonCard id="item-list" className="ion-no-margin" key={item.id}>
            <IonRow>
            <IonCol size="3" className="ion-no-margin">
                <img src={item.fotoUrl} className="Item-img" alt={item.title} />
              </IonCol>
              <IonCol size="5">
                <IonCardContent
                  className="ion-text-left ion-no-padding "
                  id="content-list"
                >
                  <IonText>
                    <h2>{item.title}</h2>
                    <h2>1 pcs</h2>{" "}
                    <p className="hargacolor ion-no-padding">
                      Rp.{" "}
                      {parseFloat(item.price.toString()).toLocaleString("en")}
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCol>
              <IonCol size="2">
                <IonButtons className="icon-button">
                  <IonButton
                    routerLink={`/EditBarang/${item.id}`}
                    fill="solid"
                    className="icon"
                    onClick={() => setEditData(item.id)}
                  >
                    <IonIcon
                      icon={pencilOutline}
                      slot="icon-only"
                      size="large"
                    />
                  </IonButton>
                </IonButtons>
              </IonCol>
              <IonCol size="2">
                <IonButtons className="icon-button">
                  <IonButton
                    color="danger"
                    onClick={() => sheetHandler(item.id, item.foto)}
                    fill="solid"
                    className="icon"
                  >
                    <IonIcon
                      icon={trashOutline}
                      slot="icon-only"
                      size="large"
                    />
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonRow>
            <IonAccordionGroup>
            <IonAccordion toggleIcon={arrowDownCircle}>
                <IonItem slot="header">
                  <IonLabel>Items in Stock</IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel>Stock Amount : {item.stock} pcs</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Pcs/Box : {item.nMax}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonCard color="light">
                      <IonInput placeholder="increase stock /box" value={add} type={"number"} clearOnEdit onIonChange={(e) => setAdd(Number(e.detail.value))} onIonInput={() => setId(item.id)}><IonLabel className="ion-text-left ion-margin-start">Box</IonLabel></IonInput>
                    </IonCard>
                    <IonButton onClick={()=>addItemStock()}>+ Stock</IonButton>
                  </IonItem>
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCard>
    )))}
    {ids && (
        <IonActionSheet
          cssClass="IASBackground"
          isOpen={actionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          header="Delete Item?"
          buttons={[
            {
              icon: checkmarkOutline,
              text: "Yes, Delete",
              handler: () => deleteBarang(ids, img),
            },
            {
              icon: closeOutline,
              text: "No",
            },
          ]}
        />
      )}
    </IonGrid>
  );
};

export default ItemListCard;
