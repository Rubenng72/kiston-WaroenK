import React, { useEffect, useState } from "react";
import { useContext} from "react";
import { IonButtons, IonButton, IonGrid, IonActionSheet, IonToolbar, IonLoading} from '@ionic/react';
import BarangContext from '../../data/barang-context';
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import { deleteDoc, doc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const HapusSemua: React.FC = () => {
    // const barangctx = useContext(BarangContext);
    const db = getFirestore();
    const storage = getStorage();
    const [barang, setBarang] = useState<Array<any>>([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : '';

    const q = query(collection(db, "barang"), where("uId", "==", userId));

    useEffect(() => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setBarang(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
      })
      return () => unsubscribe();
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

    const [actionSheet, setShowActionSheet] = useState(false);

    const deleteAll = () => {
      if(barang.length != 0){
        for(let i = 0; i < barang.length; i++){
          deleteBarang(barang[i].id, barang[i].foto);
        }
      }else{
        window.location.assign("/tabs/ItemList");
      }
    }
    const sheetHandler = () => {
      setShowActionSheet(true);
    }

    return (
    
    <>
      <IonButtons slot="end" >
        <IonButton style={{marginTop:"10px", marginRight:"5px"}} fill="solid" color="danger" onClick={() => sheetHandler ()}>
          Hapus Semua
        </IonButton>
      </IonButtons>
      { <IonActionSheet 
            cssClass = 'IASBackground'
            isOpen={actionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            header="Hapus barang?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Iya, Hapus",
                handler: () => deleteAll(),
              },
              {
                icon: closeOutline,
                text: "Tidak",
              }
            ]}
            />
          }

    </>
    );
};

export default HapusSemua;
