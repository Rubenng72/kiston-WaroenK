import { Directory, Filesystem } from "@capacitor/filesystem";
import React, { useCallback, useEffect, useState } from "react";
import BarangContext, { Barang } from "./barang-context";
import { Storage } from "@capacitor/storage";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";

const BarangContextProvider: React.FC = props => {
  const [items, setItems] = useState<Barang[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const db = getFirestore();
  const storage = getStorage();

  const addDataItem = async(uId: string, title: string, price: number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim', image: string, url: string, amount: number=0) =>{
    try {
      const docRef = await addDoc(collection(db, "barang"), {
        uId: uId,
        title: title,
        price: price,
        type: type,
        foto: image,
        fotoUrl: url,
        amount: amount,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding Document: ", e);
    }
  }

  const deleteSingleItem = async(id:string, img: string) => {
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

  // const updateItem = (id: string, imagePath: string, base64url: string, title: string, price: number, type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim') => {
  //   const update: Barang = {id, imagePath, base64url, title, price, type}
  //   const updateIndex = items.findIndex(i => i.id === id)
  //
  //   setItems(curItems => {
  //     curItems[updateIndex] = update
  //
  //     return curItems
  //   })
  //
  // }
  //
  //
  // const deleteItem = (id: string) => {
  //   for(let i = 0; i < items.length; i++)
  //   {
  //     if(items[i].id == id)
  //     {
  //       items.splice(i, 1);
  //       break;
  //     }
  //   }
  // }
  //
  // const deleteAllItems = () => {
  //   items.splice(0, items.length);
  // };
  
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

  const q = query(collection(db, "barang"), where("uId", "==", userId));

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const storableItems = querySnapshot.docs.map((doc) => ({
  //       id:doc.id,
  //       uId:doc.data().uId,
  //       foto:doc.data().foto,
  //       fotoUrl:doc.data().fotoUrl,
  //       title: doc.data().title,
  //       price: doc.data().price,
  //       type: doc.data().type,
  //       amount: doc.data().amount
  //     }));
  //     setItems(storableItems);
  //     setIsEmpty(querySnapshot.empty);
  //     console.log('woi stop');
  //     // Storage.set({ key: "items", value: JSON.stringify(storableItems)});
  //   })
  //   return () => {
  //     unsubscribe();
  //   }
  // },[]);

  useEffect(() => {
    if(items.length == 0 && !isEmpty){
      onSnapshot(q, (querySnapshot) => {
        const storableItems = querySnapshot.docs.map((doc) => ({
          id:doc.id,
          uId:doc.data().uId,
          foto:doc.data().foto,
          fotoUrl:doc.data().fotoUrl,
          title: doc.data().title,
          price: doc.data().price,
          type: doc.data().type,
          amount: doc.data().amount
        }));
        setItems(storableItems);
        setIsEmpty(querySnapshot.empty);
        Storage.set({ key: "items", value: JSON.stringify(storableItems)});
      })
    }
  });



  const initContext = useCallback(async () => {
    const itemsData = await Storage.get({ key: "items" });
    const storedItems = itemsData.value ? JSON.parse(itemsData.value) : [];
    const loadedItems: Barang[] = [];
    for (const storedItem of storedItems) {
      loadedItems.push({
        id: storedItem.id,
        uId: storedItem.uId,
        title: storedItem.title,
        price: storedItem.price,
        type: storedItem.type,
        foto: storedItem.foto,
        fotoUrl: storedItem.fotoUrl,
        amount: storedItem.amount
      });
    }

    setItems(loadedItems);
  }, []);


  return(
    <BarangContext.Provider value={{items, addDataItem, deleteSingleItem, initContext}}>
      {props.children}
    </BarangContext.Provider>
  );
}

export default BarangContextProvider;
