import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {IonGrid, IonSelect, IonSelectOption, IonLabel, IonIcon, IonRow, IonCol, IonButton, IonInput, IonToast, IonAlert, IonActionSheet} from "@ionic/react";
import {camera, checkmarkOutline, closeOutline} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import './InputBarang.css';

const InputBarang: React.FC = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const storage = getStorage();

    const [takenPhoto, setTakenPhoto] = useState<{
      path: string | undefined;
      preview: string;
    }>();
    const [chosenSatuan, setChosenSatuan] = useState<'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim'>('pcs');
    const titleRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState('');
    const history = useHistory();
    const [actionSheet, setShowActionSheet] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const selectSatuanhandler = (event: CustomEvent) => {
      const selectedSatuan = event.detail.value;
      setChosenSatuan(selectedSatuan);
    }

    const sheetHandler = () => {
      setShowActionSheet(true);
    }

    const addData = async(url: string, uId: string|null, title: string, price: number) =>{
      try {
        const docRef = await addDoc(collection(db, "barang"), {
          uId: uId,
          title: title,
          price: price,
          type: chosenSatuan,
          foto: fileName,
          fotoUrl: url,
          quantity: 0,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding Document: ", e);
      }
    }

    const addBarangHandler = async () =>{
      setToastMessage('Barang berhasil ditambahkan!');
      const enteredTitle = titleRef.current?.value;
      const enteredPrice = priceRef.current?.value;
      if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !enteredPrice || !takenPhoto || !chosenSatuan){
        console.log('sad');
        return;
      }

      const title= titleRef.current?.value as string;
      const price= priceRef.current?.value as number;
      const storageRef = ref(storage, fileName);
      uploadBytes(storageRef, selectedFile as Blob).then((snapshot) => {
        console.log('upload file success');
        getDownloadURL(ref(storage, fileName)).then((url) => {
          if(user == null){
            addData(url, 'all', title, price);
          }
          else{
            addData(url, user.uid, title, price);
          }
        })
      })
      history.length > 0 ? history.goBack() : history.replace('/tabs/ItemList');
    }

    const takePhotoHandler = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
      });
      // console.log(photo);
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
          <IonGrid className="card-box">

            <IonRow className="ion-text-center">
              <IonCol>
                <div >
                  {!takenPhoto && <h3>Belum Ada Photo</h3>}
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
                <IonInput className="inputtext" placeholder="Nama Barang" type="text" ref={titleRef}></IonInput>
            </IonRow>

            <IonRow className="ion-padding">
              {/* <IonLabel>Harga Barang</IonLabel> */}
              <IonInput className="inputtext" placeholder="Harga Barang" type={"number"} ref={priceRef}><IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel></IonInput>
              <IonSelect className="inputselection" interface="popover" onIonChange={selectSatuanhandler} value={chosenSatuan}>
                  <IonSelectOption className="" value="pcs">Pcs</IonSelectOption>
                  <IonSelectOption value="lusin">Lusin</IonSelectOption>
                  <IonSelectOption value="kodi">Kodi</IonSelectOption>
                  <IonSelectOption value="gross">Gross</IonSelectOption>
                  <IonSelectOption value="rim">Rim</IonSelectOption>
              </IonSelect>
            </IonRow>

            <IonRow className="ion-margin-top">
              <IonCol className="ion-text-center">
                <IonButton color="success" onClick={sheetHandler}>Tambah Barang</IonButton>
              </IonCol>
            </IonRow>

            <IonToast isOpen={!!toastMessage}
                      message={toastMessage}
                      duration={2000}
                      onDidDismiss={() => {setToastMessage('')}}/>

            {<IonActionSheet
            cssClass = 'IASBackground'
            isOpen={actionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            header="Tambahkan Barang?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Iya, Tambahkan Barang",
                handler: () => addBarangHandler(),
              },
              {
                icon: closeOutline,
                text: "Tidak",
              }
            ]}/>
          }
          </IonGrid>
    );
};

export default InputBarang;
