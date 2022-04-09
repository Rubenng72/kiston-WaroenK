import React from "react";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {IonGrid, IonSelect, IonSelectOption, IonLabel, IonIcon, IonRow, IonCol, IonButton, IonInput} from "@ionic/react";
import {camera} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {base64FromPath} from '@ionic/react-hooks/filesystem';
import BarangContext from '../../data/barang-context';

const InputBarang: React.FC = () => {
    const [takenPhoto, setTakenPhoto] = useState<{
      path: string | undefined;
      preview: string;
    }>();
    const [chosenSatuan, setChosenSatuan] = useState<'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim'>('pcs');
    const titleRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    const barangctx = useContext(BarangContext);
    const history = useHistory();

    const selectSatuanhandler = (event: CustomEvent) => {
      const selectedSatuan = event.detail.value;
      setChosenSatuan(selectedSatuan);
    }

    const addBarangHandler = async () =>{
      const enteredTitle = titleRef.current?.value;
      const enteredPrice = priceRef.current?.value;
      if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !enteredPrice || enteredPrice.toString().trim().length === 0 || !takenPhoto || !chosenSatuan){
        console.log('sad');
        return;
      }

      const fileName = new Date().getTime() + '.jpeg';
      const base64 = await base64FromPath(takenPhoto!.preview);
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Data
      });

      barangctx.addItem(fileName, base64, enteredTitle.toString(), enteredPrice.toString(),chosenSatuan);
      history.length > 0 ? history.goBack() : history.replace('/tabs/ItemList');
    }

    const takePhotoHandler = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
      });
      console.log(photo);

      if(!photo || /* !photo.path || */ !photo.webPath)
      {
        return;
      }

      setTakenPhoto(
        {
          path: photo.path,
          preview: photo.webPath
        });
    };

    return (
          <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview">
                {!takenPhoto && <h3>Belum Ada Photo</h3>}
                {takenPhoto && <img src={takenPhoto.preview} alt="Preview"/>}
              </div>
              <IonButton fill = "clear" onClick={takePhotoHandler}>
                <IonIcon slot="start" icon={camera}></IonIcon>
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

            <IonRow className="ion-padding">
              <IonCol>
                  <IonLabel>Nama Barang</IonLabel>
                  <IonInput type="text" ref={titleRef}></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="ion-padding">
              <IonCol>
                  <IonLabel>Harga Barang</IonLabel>
                  <IonInput type="text" ref={priceRef}></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonSelect interface="popover" onIonChange={selectSatuanhandler} value={chosenSatuan}>
                  <IonSelectOption value="pcs">Pcs</IonSelectOption>
                  <IonSelectOption value="lusin">Lusin</IonSelectOption>
                  <IonSelectOption value="kodi">Kodi</IonSelectOption>
                  <IonSelectOption value="gross">Gross</IonSelectOption>
                  <IonSelectOption value="rim">Rim</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow className="ion-margin-top">
              <IonCol className="ion-text-center">
                <IonButton onClick={addBarangHandler}>Tambah Barang</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
    );
};

export default InputBarang;
