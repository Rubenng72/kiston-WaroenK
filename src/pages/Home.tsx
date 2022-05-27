import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar,
  IonItem,
  IonCard,
  IonCol,
  IonInput,
  IonModal,
  IonGrid,
  IonRow,
  IonText,
  IonTitle,
  IonLabel,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonActionSheet,
} from "@ionic/react";
import "./Home.css";
import "./HomeModal.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Grid, EffectCoverflow } from "swiper";
import "swiper/css/grid";
import { useState, useContext, useEffect, useRef } from "react";
import { trashOutline, close, checkmark } from "ionicons/icons";
import BarangContext from "../data/barang-context";
import { logout } from "../data/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface barangType {
  id: string;
  uId: string;
  foto: string;
  fotoUrl: string;
  title: string;
  price: number;
  type: "box";
  nMax: number;
  amount: number;
}

const Home: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const barangctx = useContext(BarangContext);
  const [ids, setIds] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [TotalHarga, setTotalHarga] = useState<number>(0);
  const [totalItem, setTotalItem] = useState<number>(0);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const inputHandler = async (e: CustomEvent) => {
    const amount = Number(e.detail.value);
    const barangRef = doc(db, "barang", ids);
    await updateDoc(barangRef, { amount: amount });
  };

  const priceCalculation = () => {
    let sum = 0;

    barangctx.items.forEach((value) => {
      if (value.amount > 0) {
        sum += value.price * value.amount;
        // console.log(value.amount);
      }
    });
    setTotalHarga(sum);
    setTotalItem(0);
  };

  const priceTypeHandler = (iPrice: number, iAmount: number) => {
    if (iAmount > 0) {
      return parseFloat((iPrice * iAmount).toString()).toLocaleString("en");
    }
  };

  const clearAllReceipt = () => {
    barangctx.items.forEach((value) => {
      const barangRef = doc(db, "barang", value.id);
      updateDoc(barangRef, { amount: 0 });
      setTotalHarga(0);
      setTotalItem(0);
    });
  };

  const clearItemReceipt = () => {
    // console.log(ids);
    const barangRef = doc(db, "barang", ids);
    updateDoc(barangRef, { amount: 0 });

    setTotalItem(totalItem - 1);

    let hargaItem = 0;
    if (barangctx.items.length !== 0) {
      for (let i = 0; i < barangctx.items.length; i++) {
        if (barangctx.items[i].amount > 0 && barangctx.items[i].id == ids) {
          hargaItem = barangctx.items[i].price * barangctx.items[i].amount;
          setTotalHarga(TotalHarga - hargaItem);
        }
      }
    }
  };

  async function uLogout() {
    const res = await logout();
    if (res) {
      window.location.assign("/tabs/Home");
    }
  }

  const actionSheetHandler = () => {
    setShowActionSheet(true);
  };

  const signinhandler = () => {
    if (user !== null) {
      if (user.isAnonymous) {
        return (
          <IonButtons slot="end">
            <IonButton
              style={{ marginTop: "10px", marginRight: "10px" }}
              fill="solid"
              color="primary"
              routerLink="/login"
            >
              Login/Register
            </IonButton>
          </IonButtons>
        );
      } else {
        return (
          <IonButtons slot="end">
            <IonButton
              style={{ marginTop: "10px", marginRight: "10px" }}
              fill="solid"
              color="primary"
              onClick={actionSheetHandler}
            >
              Logout
            </IonButton>
          </IonButtons>
        );
      }
    } else {
      return (
        <IonButtons slot="end">
          <IonButton
            style={{ marginTop: "10px", marginRight: "10px" }}
            fill="solid"
            color="primary"
            routerLink="/login"
          >
            Login/Register
          </IonButton>
        </IonButtons>
      );
    }
  };

  //new func
  const handlerHandler = () => {
    if (user !== null) {
      if (user.isAnonymous) {
        return (
          <IonGrid>
            <IonRow className="center">
              <IonButtons>
                <IonText className="ion-text-center">
                  <IonImg
                    src={
                      "https://www.svgrepo.com/show/157995/empty-white-box.svg"
                    }
                  />
                  <h5>No Item Listed</h5>
                  <IonButton color="light" routerLink="/TambahBarang">
                    <h5>Add Item</h5>
                  </IonButton>
                </IonText>
              </IonButtons>
            </IonRow>
          </IonGrid>
        );
      } else {
        return (
          <IonGrid>
            <IonRow className="center">
              <IonButtons>
                <IonText className="ion-text-center">
                  <IonImg
                    src={
                      "https://www.svgrepo.com/show/157995/empty-white-box.svg"
                    }
                  />
                  <h5>No Item Listed</h5>
                  <IonButton color="light" routerLink="/TambahBarang">
                    <h5>Add Item</h5>
                  </IonButton>
                </IonText>
              </IonButtons>
            </IonRow>
          </IonGrid>
        );
      }
    } else {
      return (
        <IonGrid>
          <IonRow className="center">
            <IonButtons>
              <IonText className="ion-text-center">
                <IonImg
                  src={
                    "https://www.svgrepo.com/show/157995/empty-white-box.svg"
                  }
                />
                <IonTitle>You need to Sign In / Register first!</IonTitle>
                <IonButton color="" routerLink="/Register">
                  <h5>Register</h5>
                </IonButton>
                <IonButton color="light" routerLink="/Login">
                  <h5>Login</h5>
                </IonButton>
              </IonText>
            </IonButtons>
          </IonRow>
        </IonGrid>
      );
    }
  };

  const totalItemReceipt = () => {
    setShowModal(true);
    let totalItemR = 0;
    if (barangctx.items.length !== 0) {
      for (let i = 0; i < barangctx.items.length; i++) {
        if (barangctx.items[i].amount > 0) {
          totalItemR = totalItemR + 1;
        }
      }
    }
    setTotalItem(totalItemR);
  };

  // Function Search
  // useEffect(() => {
  //   searchFunction();
  //   totalItemReceipt();
  // }, [searchValue]);

  const searchFunction = () => {
    return barangctx.items.filter((barang: barangType) =>
      barang.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const convert = (iAmount: number, inMax: number) => {
    if (iAmount > 0 && iAmount < inMax) {
      return <IonTitle class="satuan-jumlah">{iAmount} pcs</IonTitle>;
    } else if (iAmount > 0 && iAmount >= inMax) {
      let temp = 0;
      let modulus = 0;
      let box = 0;

      modulus = iAmount % inMax;
      temp = modulus;

      box = iAmount - temp;
      box = box / inMax;
      if (temp == 0) {
        return (
          <>
            <IonTitle class="satuan-jumlah">{box} box</IonTitle>
          </>
        );
      } else {
        return (
          <>
            <IonTitle class="satuan-jumlah">
              {box} box
              <br />+ {temp} pcs
            </IonTitle>
          </>
        );
      }
    }
  };

  const boxPrice = (iPrice: number, inMax: number) => {
    let hargaBox = 0;

    hargaBox = inMax * iPrice;

    return parseFloat(hargaBox.toString()).toLocaleString("en");
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar color="none">
          <IonButtons slot="start">
            <IonSearchbar
              id="caribarang"
              placeholder="Search"
              onIonChange={(e) => setSearchValue(e.detail.value!)}
              style={{ marginTop: "10px", marginRight: "5px" }}
            />
            <IonButton routerLink="#" />
          </IonButtons>
          {signinhandler()}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <Swiper
          effect={"coverflow"}
          spaceBetween={15}
          slidesPerView={1}
          grid={{
            rows: 3,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            // clickable: true,
            dynamicBullets: true,
          }}
          modules={[Grid, Pagination, EffectCoverflow]}
        >
          {searchValue == "" &&
            barangctx.items.length != 0 &&
            barangctx.items.map((item) => (
              <SwiperSlide key={item.id}>
                <IonRow className="card-slider center">
                  <IonCol size="5">
                    <IonImg
                      className="img-slider"
                      src={item.fotoUrl}
                      alt={item.title}
                    />
                  </IonCol>

                  <IonCol size="4.5">
                    <IonCardTitle style={{ textAlign: "left" }}>
                      {item.title}
                    </IonCardTitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      (1 pcs)
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      Rp.{" "}
                      {parseFloat(item.price.toString()).toLocaleString("en")}
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      Items in Stock :
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      Dummy stock
                    </IonCardSubtitle>
                  </IonCol>
                  <IonCol size="2" className="padding-right">
                    <IonRow className="jumlah-item">
                      <IonInput
                        className="inputbox"
                        maxlength={2}
                        value={item.amount.toString()}
                        clearOnEdit
                        onIonChange={(e) => inputHandler(e)}
                        onIonInput={() => setIds(item.id)}
                        onIonBlur={() => priceCalculation()}
                      ></IonInput>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </SwiperSlide>
            ))}

          {barangctx.items.length == 0 && (
            <SwiperSlide>{handlerHandler}</SwiperSlide>
          )}

          {searchValue != "" &&
            barangctx.items.length != 0 &&
            searchFunction().map((item) => (
              <SwiperSlide key={item.id}>
                <IonRow className="card-slider center">
                  <IonCol size="5">
                    <IonImg
                      className="img-slider"
                      src={item.fotoUrl}
                      alt={item.title}
                    />
                  </IonCol>

                  <IonCol size="4.5">
                    <IonCardTitle style={{ textAlign: "left" }}>
                      {item.title}
                    </IonCardTitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      (1 pcs)
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      Rp.{" "}
                      {parseFloat(item.price.toString()).toLocaleString("en")}
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      (Items in Stock)
                    </IonCardSubtitle>
                    <IonCardSubtitle style={{ textAlign: "left" }}>
                      Dummy stock
                    </IonCardSubtitle>
                  </IonCol>
                  <IonCol size="2" className="padding-right">
                    <IonRow className="jumlah-item">
                      <IonInput
                        className="inputbox"
                        maxlength={2}
                        value={item.amount.toString()}
                        clearOnEdit
                        onIonChange={(e) => inputHandler(e)}
                        onIonInput={() => setIds(item.id)}
                        onIonBlur={() => priceCalculation()}
                      ></IonInput>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </SwiperSlide>
            ))}
        </Swiper>
        <IonCard className="card-th-dh-lds" color="primary">
          <IonRow className="center">
            <IonCol size="5.5" className="label-TH">
              Total Price
            </IonCol>
            <IonCol size="5.5" className="label-DH">
              <IonLabel>
                Rp. {parseFloat(TotalHarga.toString()).toLocaleString("en")}
              </IonLabel>
              ,-
            </IonCol>
          </IonRow>
          <IonRow className="center">
            <IonCol
              size="11.5"
              color="light"
              className="label-LDS"
              onClick={() => totalItemReceipt()}
            >
              View Receipt
            </IonCol>
          </IonRow>
        </IonCard>
        <IonModal
          isOpen={showModal}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 1]}
          onDidDismiss={() => setShowModal(false)}
          className="modal-box"
        >
          <IonItem lines="none"></IonItem>
          <h3 className="center text-bold">Receipt</h3>
          <IonGrid
            className="ion-no-padding ion-no-margin"
            style={{ maxHeight: "35px" }}
          >
            <IonRow>
              <IonCol size="8">
                <IonTitle className="total-barang text-bold">
                  Total Items: {totalItem}
                </IonTitle>
              </IonCol>
              <IonCol size="4">
                <IonButton
                  fill="clear"
                  color="medium"
                  className="text-bold ion-text-right ion-margin-start"
                  onClick={clearAllReceipt}
                >
                  CLEAR ALL
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonContent scrollEvents={true} className="modalContent">
            {barangctx.items.length != 0 ? (
              barangctx.items.map((item) => {
                if (item.amount > 0) {
                  return (
                    <IonItem lines="none" className="card-modal" key={item.id}>
                      <IonCol size="3">
                        <img
                          className="img-modal center"
                          src={item.fotoUrl}
                          alt={item.title}
                        />
                      </IonCol>
                      <IonCol size="9">
                        <IonRow>
                          <IonCol size="7">
                            <IonText>{item.title}</IonText>
                            <IonCardSubtitle>
                              Price/Pcs <br /> Rp.
                              {parseFloat(item.price.toString()).toLocaleString(
                                "en"
                              )}
                            </IonCardSubtitle>
                            <IonCardSubtitle>
                              Total Price/Item <br />
                              Rp. {priceTypeHandler(item.price, item.amount)}
                            </IonCardSubtitle>
                          </IonCol>
                          <IonCol size="5">
                            <IonCol>{convert(item.amount, item.nMax)}</IonCol>
                            <IonButton
                              onIonFocus={() => setIds(item.id)}
                              className="trash-can"
                              fill="clear"
                              onClick={() => clearItemReceipt()}
                            >
                              <IonIcon color="danger" icon={trashOutline} />
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonItem>
                  );
                }
              })
            ) : (
              <div style={{ marginTop: "30px" }} className="ion-text-center">
                <IonImg
                  style={{ width: "20%" }}
                  src={"assets/foto/empty.png"}
                />
                <h5 style={{ fontWeight: "bold" }}>Your Cart Is Empty</h5>
              </div>
            )}
          </IonContent>

          <IonCard
            color="primary"
            className="card-th-dh-lds-modal ion-no-margin"
          >
            <IonRow className="center">
              <IonCol size="5.5" className="label-TH">
                Total Price
              </IonCol>
              <IonCol size="5.5" className="label-DH">
                <IonLabel>
                  Rp. {parseFloat(TotalHarga.toString()).toLocaleString("en")}
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="center">
              <IonCol
                size="11.5"
                color="light"
                className="label-LDS"
                onClick={() => setShowModal(true)}
              >
                Transaction Date: {date}
              </IonCol>
            </IonRow>
            <IonRow className="center">
              <IonButton>Save to History</IonButton>
            </IonRow>
          </IonCard>
        </IonModal>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          header="Are you sure you want to Logout?"
          buttons={[
            {
              text: "Ok",
              role: "destructive",
              icon: checkmark,
              id: "delete-button",
              data: {
                type: "delete",
              },
              handler: () => {
                uLogout();
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
              handler: () => {
                // console.log("Cancel clicked");
              },
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default Home;
