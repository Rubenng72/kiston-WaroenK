import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {IonGrid, IonSelect, IonSelectOption, IonLabel, IonIcon, IonRow, IonCol, IonButton, IonInput, IonToast, IonAlert} from "@ionic/react";
import {camera} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import './UpdateBarang.css';

const UpdateBarang: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  const [selectedItem, setSelectedItem] = useState<any>();
  const [chosenSatuan, setChosenSatuan] = useState<'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim'>('pcs');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  // const barangctx = useContext(BarangContext);
  const history = useHistory();
  const [startAlert, serStartAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const db = getFirestore();
  const storage = getStorage();
  const id = localStorage.getItem('editId');

  const selectSatuanhandler = (event: CustomEvent) => {
    const selectedSatuan = event.detail.value;
    setChosenSatuan(selectedSatuan);
  }

  useEffect(() => {

    if(id){
      const unsubscribe = onSnapshot(doc(db, "barang", id), (doc)=>{
        setSelectedItem({...doc.data()});
      })
      return () =>{unsubscribe();}
    }
  }, []);

  useEffect(() => {
    setTitle(selectedItem?.title!);
    setPrice(selectedItem?.price!);
    setChosenSatuan(selectedItem?.type!);
  },[selectedItem]);


  const updateData = async(url: string|null, bId: string|null, title: string, price: number) =>{
    try {
      if(bId && url !==null){
        const docRef = await updateDoc(doc(db, "barang", bId), {
          title: title,
          price: price,
          type: chosenSatuan,
          foto: fileName,
          fotoUrl: url,
        });
        localStorage.removeItem('editItem');
      }
    if(bId && url == null){
      const docRef = await updateDoc(doc(db, "barang", bId), {
        title: title,
        price: price,
        type: chosenSatuan,
      });
      localStorage.removeItem('editItem');
    }
    } catch (e) {
      console.error("Error adding Document: ", e);
    }
  }

  const editBarangHandler = async () =>{
    if(!title || title.toString().trim().length === 0 || !price || !chosenSatuan){
      serStartAlert(true);
      return;
    }

    const storageRef = ref(storage, fileName);
    if(takenPhoto){
      const imgDeleteRef = ref(storage,  selectedItem.foto);
      await deleteObject(imgDeleteRef);

      uploadBytes(storageRef, selectedFile as Blob).then((snapshot) => {
        // console.log('upload file success');
        getDownloadURL(ref(storage, fileName)).then((url) => {
            updateData(url, id, title, price);
        })
      })
    }else if(!takenPhoto){

      updateData(null,id,title,price);
    }

    setToastMessage('Barang berhasil diubah!');
    history.length > 0 ? history.goBack() : history.replace('/tabs/ItemList');
  }

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500
    });

    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    setSelectedFile(blob as File);
    const photoName = (new Date().getTime() + ".jpeg") as string;
    setFileName(photoName);

    if(!photo || !photo.webPath)
    {
      return;
    }

    setTakenPhoto(
      {
        path: photo.path ? photo.path : "",
        preview: photo.webPath
      });
  };

  return (
    <React.Fragment>
        <IonAlert isOpen={startAlert}
                  cssClass="alertCss"
                  header="Warning!!!"
                  message="Lengkapi data barang yang ingin diedit!"
                  buttons={[
                      {text: 'Ok', role: 'cancel', handler: () => {serStartAlert(false)}}
                  ]}></IonAlert>

        <IonGrid className="card-box">

          <IonRow className="ion-text-center">
            <IonCol>
              <div >
                {!takenPhoto && <img className="image-preview" src={selectedItem?.fotoUrl}/>}
                {takenPhoto && <img className="image-preview" src={takenPhoto.preview} alt="Preview"/>}
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="ion-text-center">
            <IonButton color="success" className="camera-btn" fill = "clear" onClick={takePhotoHandler}>
              <IonIcon slot="start" icon={camera}></IonIcon>
              <IonLabel>Take Photo</IonLabel>
            </IonButton>
          </IonRow>

          <IonRow className="ion-padding">
              {/* <IonLabel>Nama Barang</IonLabel> */}
              <IonInput className="inputtext" placeholder="Nama Barang" type="text" value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
          </IonRow>

          <IonRow className="ion-padding">
            {/* <IonLabel>Harga Barang</IonLabel> */}
            <IonInput className="inputtext" placeholder="Harga Barang" type="number" value={price} onIonChange={e => setPrice(parseInt(e.detail.value!))}><IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel></IonInput>
            <IonSelect className="inputselection" interface="popover" placeholder={selectedItem?.type} onIonChange={selectSatuanhandler} value={chosenSatuan}>
                <IonSelectOption value="pcs">Pcs</IonSelectOption>
                <IonSelectOption value="lusin">Lusin</IonSelectOption>
                <IonSelectOption value="kodi">Kodi</IonSelectOption>
                <IonSelectOption value="gross">Gross</IonSelectOption>
                <IonSelectOption value="rim">Rim</IonSelectOption>
            </IonSelect>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton color="success" onClick={editBarangHandler}>Edit Barang</IonButton>
            </IonCol>
          </IonRow>

        <IonToast isOpen={!!toastMessage}
                      message={toastMessage}
                      duration={2000}
                      onDidDismiss={() => {setToastMessage('')}}/>
          </IonGrid>
      </React.Fragment>
  );
};

export default UpdateBarang;
