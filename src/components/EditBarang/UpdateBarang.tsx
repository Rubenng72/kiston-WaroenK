import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonGrid,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonInput,
  IonToast,
  IonAlert,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import BarangContext from "../../data/barang-context";
import "./UpdateBarang.css";

const UpdateBarang: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  const [selectedItem, setSelectedItem] = useState<any>();
  const [chosenSatuan, setChosenSatuan] = useState<"box">("box");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [disc, setDisc] = useState<number>(0);
  const [nMax, setnMax] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const barangctx = useContext(BarangContext);
  const history = useHistory();
  const [startAlert, serStartAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const db = getFirestore();
  const storage = getStorage();
  const id = localStorage.getItem("editId");

  const selectSatuanhandler = (event: CustomEvent) => {
    const selectedSatuan = event.detail.value;
    setChosenSatuan(selectedSatuan);
  };

  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "barang", id), (doc) => {
        setSelectedItem({ ...doc.data() });
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    setTitle(selectedItem?.title!);
    setPrice(selectedItem?.price!);
    setChosenSatuan(selectedItem?.type!);
    setDisc(selectedItem?.disc!);
    setnMax(selectedItem?.nMax);
  }, [selectedItem]);

  const editBarangHandler = async () => {
    if (!title || title.toString().trim().length === 0 || !price || !nMax || !chosenSatuan) {
      serStartAlert(true);
      return;
    }

    const storageRef = ref(storage, fileName);
    if (takenPhoto) {
      const imgDeleteRef = ref(storage, selectedItem.foto);
      await deleteObject(imgDeleteRef);

      uploadBytes(storageRef, selectedFile as Blob).then((snapshot) => {
        // console.log('upload file success');
        getDownloadURL(ref(storage, fileName)).then((url) => {
          barangctx.updateDataItem(
            url,
            id,
            title,
            price,
            chosenSatuan,
            nMax,
            fileName
          );
        });
      });
    } else if (!takenPhoto) {
      barangctx.updateDataItem(
        null,
        id,
        title,
        price,
        chosenSatuan,
        nMax,
        fileName
      );
    }

    setToastMessage("Data changed successfully");
    history.length > 0 ? history.goBack() : history.replace("/tabs/ItemList");
  };

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    setSelectedFile(blob as File);
    const photoName = (new Date().getTime() + ".jpeg") as string;
    setFileName(photoName);

    if (!photo || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path ? photo.path : "",
      preview: photo.webPath,
    });
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={startAlert}
        cssClass="alertCss"
        header="Warning!!!"
        message="Complete the data of the item"
        buttons={[
          {
            text: "Ok",
            role: "cancel",
            handler: () => {
              serStartAlert(false);
            },
          },
        ]}
      ></IonAlert>

      <IonGrid className="card-box">
        <IonRow className="ion-text-center">
          <IonCol>
            <div>
              {!takenPhoto && (
                <img className="image-preview" src={selectedItem?.fotoUrl} />
              )}
              {takenPhoto && (
                <img
                  className="image-preview"
                  src={takenPhoto.preview}
                  alt="Preview"
                />
              )}
            </div>
          </IonCol>
        </IonRow>

        <IonRow className="ion-text-center">
          <IonButton
            color="success"
            className="camera-btn"
            fill="clear"
            onClick={takePhotoHandler}
          >
            <IonIcon slot="start" icon={camera}></IonIcon>
            <IonLabel>Take Photo</IonLabel>
          </IonButton>
        </IonRow>

        <IonRow className="ion-padding">
          {/* <IonLabel>Nama Barang</IonLabel> */}
          <IonInput
            className="inputtext"
            placeholder="item Name"
            type="text"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          ></IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          {/* <IonLabel>Harga Barang</IonLabel> */}
          <IonInput
            className="inputtext"
            placeholder="Modal Price/Box"
            type="number"
            value={price}
            onIonChange={(e) => setPrice(parseInt(e.detail.value!))}
          >
            <IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel>
          </IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          {/* <IonLabel>Harga Barang</IonLabel> */}
          <IonInput
            className="inputtext"
            placeholder="Selling Price/pcs"
            type="number"
            value={price}
            onIonChange={(e) => setPrice(parseInt(e.detail.value!))}
          >
            <IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel>
          </IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          <IonButton className="">Calculate Margin</IonButton>
          <IonLabel className="ion-padding">Test Price</IonLabel>
          <IonLabel className="ion-padding">%</IonLabel>
        </IonRow>

        <IonRow className="ion-margin-top">
          <IonCol className="ion-text-center">
            <IonButton color="success" onClick={editBarangHandler}>
              Edit Barang
            </IonButton>
          </IonCol>
        </IonRow>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => {
            setToastMessage("");
          }}
        />
      </IonGrid>
    </React.Fragment>
  );
};

export default UpdateBarang;
