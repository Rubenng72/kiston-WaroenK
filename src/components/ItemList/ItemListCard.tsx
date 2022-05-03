import React from "react";
import { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonCardContent, IonText,IonIcon, IonButtons, IonButton, IonActionSheet, IonCard} from '@ionic/react';
import { pencilOutline, trashOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import { collection, getDocs, deleteDoc, query, doc, where } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import './ItemListCard.css'

const ItemListCard: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const storage = getStorage();
    const [barang, setBarang] = useState<Array<any>>([]);
    const [ids, setId] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [actionSheet, setShowActionSheet] = useState(false);

    let dbquery = query(collection(db, "barang"),where("uId","==", "all"));

    if(user !== null)
    {
      dbquery = query(collection(db, "barang"),where("uId","==", user.uid));
    }

    useEffect(() => {
      // let isMounted = true;

      async function getData() {
        const querySnapshot = await getDocs(dbquery);
        // console.log('querySnapshot: ', querySnapshot);

        // if(isMounted){
          setBarang(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
        // }

        // querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${doc.data()}`);
        //   console.log('doc:', doc);
        // })
      }
      getData();

      // return() => {isMounted = false}
    }, []);

    async function deleteBarang(id: string, img: string) {
      const dataRef = doc(db, "barang", id);
      const imgRef = ref(storage,  img);
      try{
        await deleteDoc(dataRef);
        await deleteObject(imgRef);
        console.log('done');
      }catch(error){
        console.log(error);
      }

    }

    const sheetHandler = (id: string, img: string) => {
      setShowActionSheet(true);
      setId(id);
      setImg(img);
    }



    return (
      <IonGrid>
        {barang.length != 0 ? barang.map((item) => (
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
              <IonButton routerLink={`/EditBarang/${item.id}`} fill ="solid" className="icon" >
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
