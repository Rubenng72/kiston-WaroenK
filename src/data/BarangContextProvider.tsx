import { Directory, Filesystem } from "@capacitor/filesystem";
import React, { useCallback, useEffect, useState } from "react";
import BarangContext, { Barang, History, HistoryReceipt } from "./barang-context";
import { Storage } from "@capacitor/storage";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";

const BarangContextProvider: React.FC = props => {
  const [items, setItems] = useState<Barang[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [historyReceipt, setHistoryReceipt] = useState<HistoryReceipt[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const db = getFirestore();
  const storage = getStorage();

  const addDataItem = async(uId: string, title: string, price: number, cost: number, type: 'box', nMax: number, stock: number, image: string, url: string, amount: number=0) =>{
    try {
      const docRef = await addDoc(collection(db, "barang"), {
        uId: uId,
        title: title,
        price: price,
        cost: cost,
        type: type,
        nMax: nMax,
        stock: stock,
        foto: image,
        fotoUrl: url,
        amount: amount,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding Document: ", e);
    }
  }


  const updateDataItem = async(url: string|null, bId: string|null, title: string, price: number, cost: number, type: 'box', nMax: number, fileName: string) =>{
    try {
      if(bId && url !==null){
        const docRef = await updateDoc(doc(db, "barang", bId), {
          title: title,
          price: price,
          cost: cost,
          type: type,
          nMax: nMax,
          foto: fileName,
          fotoUrl: url,
        });
        localStorage.removeItem('editId');
        localStorage.removeItem('editItem');
      }
    if(bId && url == null){
      const docRef = await updateDoc(doc(db, "barang", bId), {
        title: title,
        price: price,
        cost: cost,
        type: type,
        nMax: nMax,
      });
      localStorage.removeItem('editId');
      localStorage.removeItem('editItem');
    }
    } catch (e) {
      // console.error("Error adding Document: ", e);
    }
  }

  const deleteSingleItem = async(id:string, img: string) => {
    const dataRef = doc(db, "barang", id);
    const imgRef = ref(storage,  img);
    try{
      await deleteDoc(dataRef);
      await deleteObject(imgRef);
      // console.log('done');
    }catch(error){
      // console.log(error);
    }
  }

  // Function History
  const saveToHistory = async(uId: string|null, totalPrice: number, date: string, time: string) => {
    try {
      const docRef = await addDoc(collection(db, "history"), {

        uId: uId,
        totalPrice: totalPrice,
        date: date,
        time: time,
      });
      if(docRef){
        items.forEach(async(value)=>{
          if(value.amount > 0 && value.amount <= value.stock && value.stock > 0){
            let stockTemp = 0;
            stockTemp = value.stock - value.amount;
            const barangRef = doc(db, "barang", value.id);

            try{
              await updateDoc(barangRef, {stock: stockTemp});
              addDoc(collection(db, "historyReceipt"), {
                uId: userId,
                name:value.title,
                quantity: value.amount,
                receiptId: docRef.id,
                totalPrice: value.price*value.amount,
              });
            } catch (e) {
              // console.error("Error adding Document: ", e);
            }
          }
        })
      }
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding Document: ", e);
    }
  }

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : '';

  const q = query(collection(db, "barang"), where("uId", "==", userId));
  const qhistory = query(collection(db, "history"), where("uId", "==", userId));
  const qreceipt = query(collection(db, "historyReceipt"), where("uId", "==", userId));

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
          cost:doc.data().cost,
          stock:doc.data().stock,
          type: doc.data().type,
          nMax: doc.data().nMax,
          amount: doc.data().amount
        }));
        setItems(storableItems);
        setIsEmpty(querySnapshot.empty);
        Storage.set({ key: "items", value: JSON.stringify(storableItems)});
      })
    }

    if(history.length == 0 && !isEmpty){
      onSnapshot(qhistory, (querySnapshot) => {
        const storableHistory = querySnapshot.docs.map((doc) => ({
          id:doc.id,
          uId:doc.data().uId,
          totalPrice:doc.data().totalPrice,
          date:doc.data().date,
          time:doc.data().time
        }));
        setHistory(storableHistory);
        setIsEmpty(querySnapshot.empty);
        Storage.set({ key: "history", value: JSON.stringify(storableHistory)});
      })
    }

    if(historyReceipt.length == 0 && !isEmpty){
      onSnapshot(qreceipt, (querySnapshot) => {
        const storableHistoryReceipt = querySnapshot.docs.map((doc) => ({
          id:doc.id,
          uId:doc.data().uId,
          name:doc.data().name,
          quantity:doc.data().quantity,
          receiptId:doc.data().receiptId,
          totalPrice:doc.data().totalPrice
        }));
        setHistoryReceipt(storableHistoryReceipt);
        setIsEmpty(querySnapshot.empty);
        Storage.set({ key: "historyReceipt", value: JSON.stringify(storableHistoryReceipt)});
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
        cost: storedItem.cost,
        stock: storedItem.stock,
        nMax: storedItem.nMax,
        foto: storedItem.foto,
        fotoUrl: storedItem.fotoUrl,
        amount: storedItem.amount
      });
    }
    setItems(loadedItems);
  }, []);

  const initContextHistory = useCallback(async () => {
    const historyData = await Storage.get({ key: "history" });
    const storedHistories = historyData.value ? JSON.parse(historyData.value) : [];
    const loadedHistory: History[] = [];
    for (const storedHistory of storedHistories) {
      loadedHistory.push({
        id: storedHistory.id,
        uId: storedHistory.uId,
        totalPrice: storedHistory.totalPrice,
        date: storedHistory.date,
        time: storedHistory.time,
      });
    }
    setHistory(loadedHistory);
  }, []);

  const initContextHistoryReceipt = useCallback(async () => {
    const historyReceiptData = await Storage.get({ key: "historyReceipt" });
    const storedHistoryReceipts = historyReceiptData.value ? JSON.parse(historyReceiptData.value) : [];
    const loadedHistoryReceipt: HistoryReceipt[] = [];
    for (const storedHistoryReceipt of storedHistoryReceipts) {
      loadedHistoryReceipt.push({
        id: storedHistoryReceipt.id,
        uId: storedHistoryReceipt.uId,
        name: storedHistoryReceipt.name,
        quantity: storedHistoryReceipt.quantity,
        receiptId: storedHistoryReceipt.receiptId,
        totalPrice: storedHistoryReceipt.totalPrice
      });
    }
  }, []);



  return(
    <BarangContext.Provider value={{items, history, historyReceipt, addDataItem, updateDataItem, saveToHistory, deleteSingleItem, initContext, initContextHistory, initContextHistoryReceipt}}>
      {props.children}
    </BarangContext.Provider>
  );
}

export default BarangContextProvider;
