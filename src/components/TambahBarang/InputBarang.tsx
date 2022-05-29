import React from "react";
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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import BarangContext from "../../data/barang-context";
import "./InputBarang.css";

const InputBarang: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const storage = getStorage();
  const barangctx = useContext(BarangContext);

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  // const [chosenSatuan, setChosenSatuan] = useState<'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim'>('pcs');
  const [chosenSatuan, setChosenSatuan] = useState<"box">("box");
  const titleRef = useRef<HTMLIonInputElement>(null);
  const priceRef = useRef<HTMLIonInputElement>(null);
  const costRef = useRef<HTMLIonInputElement>(null);
  const nMaxRef = useRef<HTMLIonInputElement>(null);
  const bAmountRef = useRef<HTMLIonInputElement>(null);
  const [marginPrice, setMarginPrice] = useState<number>(0);
  const [marginPersen, setMarginPersen] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState("");
  const [startAlert, serStartAlert] = useState(false);

  const selectSatuanhandler = (event: CustomEvent) => {
    const selectedSatuan = event.detail.value;
    setChosenSatuan(selectedSatuan);
  };

  const calculateMargin = (
    nMaxRef: React.RefObject<HTMLIonInputElement>,
    costRef: React.RefObject<HTMLIonInputElement>,
    priceRef: React.RefObject<HTMLIonInputElement>
  ) => {
    const jumlahPcsPerBox = nMaxRef.current?.value as number;
    const modalPricePerBox = costRef.current?.value as number;
    const sellingPricePerPcs = priceRef.current?.value as number;

    let hargaPerPiece = 0;
    let hargaProfit = 0;
    let marginProfit = 0;

    hargaPerPiece = modalPricePerBox / jumlahPcsPerBox;
    hargaProfit = sellingPricePerPcs - hargaPerPiece;
    marginProfit =
      (100 * (sellingPricePerPcs - hargaPerPiece)) / sellingPricePerPcs;

    setMarginPrice(hargaProfit);
    setMarginPersen(marginProfit);
  };

  const addBarangHandler = async () => {
    const enteredTitle = titleRef.current?.value;
    const enteredPrice = priceRef.current?.value;
    const enteredCost = costRef.current?.value;
    const enteredbAmount = bAmountRef.current?.value;
    const enterednMax = nMaxRef.current?.value;
    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !enteredPrice ||
      !enteredCost ||
      !enterednMax ||
      !enteredbAmount ||
      !takenPhoto ||
      !chosenSatuan
    ) {
      serStartAlert(true);
      return;
    }

    const title = titleRef.current?.value as string;
    const price = priceRef.current?.value as number;
    const cost = costRef.current?.value as number;
    const nMax = nMaxRef.current?.value as number;
    const boxAmount = bAmountRef.current?.value as number;
    const storageRef = ref(storage, fileName);

    let totalStock = 0;
    totalStock = boxAmount * nMax;

    uploadBytes(storageRef, selectedFile as Blob).then((snapshot) => {
      getDownloadURL(ref(storage, fileName)).then((url) => {
        if (user !== null) {
          barangctx.addDataItem(
            user.uid,
            title,
            price,
            cost,
            chosenSatuan,
            nMax,
            totalStock,
            fileName,
            url
          );
        }
      });
    });
    serStartAlert(false);
    setToastMessage("Item added successfully!");
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
        message={"Complete the data of the item "}
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
              {!takenPhoto && <h3>No Photo Taken</h3>}
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
            placeholder="Item Name"
            type="text"
            ref={titleRef}
          ></IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          <IonInput
            className="inputtext"
            style={{ marginRight: 30 }}
            placeholder="Box Amount "
            type={"number"}
            ref={bAmountRef}
          ></IonInput>
          <IonInput
            className="inputtext"
            placeholder="Pcs Amount in Box"
            type={"number"}
            ref={nMaxRef}
          ></IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          {/* <IonLabel>Harga Barang</IonLabel> */}
          <IonInput
            className="inputtext"
            placeholder="Modal Price/box"
            type={"number"}
            ref={costRef}
          >
            <IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel>
          </IonInput>
        </IonRow>

        <IonRow className="ion-padding">
          {/* <IonLabel>Harga Barang</IonLabel> */}
          <IonInput
            className="inputtext"
            placeholder="Selling Price/pcs"
            type={"number"}
            ref={priceRef}
          >
            <IonLabel className="ion-text-left ion-margin-start">Rp. </IonLabel>
          </IonInput>
        </IonRow>

        <IonRow className="ion-padding centering">
          <IonButton
            className=""
            onClick={() => calculateMargin(nMaxRef, costRef, priceRef)}
          >
            Calculate Margin
          </IonButton>
        </IonRow>
        <IonRow>
          <IonLabel className="ion-no-padding Marginlabel centering">
            Margin Jual dalam Rupiah = Rp.{" "}
            {parseFloat(marginPrice.toString()).toLocaleString("en")}
          </IonLabel>
          <br />
          <IonLabel className="ion-no-padding Marginlabel centering">
            Margin Jual dalam persen ={" "}
            {parseFloat(marginPersen.toString()).toLocaleString("en")}%
          </IonLabel>
        </IonRow>

        <IonRow className="ion-margin-top">
          <IonCol className="ion-text-center">
            <IonButton color="success" onClick={addBarangHandler}>
              Add Item
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

export default InputBarang;
