import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonText, IonTitle, IonLabel, IonCardSubtitle, IonCardTitle, IonImg, IonActionSheet} from "@ionic/react";
import './Home.css'
import './HomeModal.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid, EffectCoverflow} from "swiper";
import "swiper/css/grid";
import { useState, useContext} from "react";
import { trash, trashOutline, close } from "ionicons/icons";
import BarangContext from '../data/barang-context';
import {logout} from "../data/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Home: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const barangctx = useContext(BarangContext);
  const [ids, setIds] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [TotalHarga, setTotalHarga] = useState<number>(0);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const inputHandler = async(e:CustomEvent) => {
    const amount = Number(e.detail.value);
    const barangRef = doc(db, "barang", ids);
    await updateDoc(barangRef, { "amount" : amount})
  }

  const priceCalculation = () =>{
    let sum = 0;
    barangctx.items.forEach((value)=>{
      if(value.amount >0){
        sum += value.price * value.amount;
        console.log(value.amount);
      }
    })
    setTotalHarga(sum);
  }

  const resetAmount = () => {
    // console.log(barang.length, isEmpty);
    // barang.forEach((value)=>{
    //   const barangRef = doc(db, "barang", value.id);
    //   updateDoc(barangRef, { "amount" : 0})
    // })
  }


  async function uLogout()
  {
    const res = await logout();
    if(res){
      window.location.assign("/tabs/Home");
    }
  }

  const actionSheetHandler = () => {
        setShowActionSheet(true);
        };

  const signinhandler = () =>
  {
    if(user !== null){
      if(user.isAnonymous){
        return(<IonButtons slot="end" >
        <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="primary" routerLink="/login">
        Login/Register
        </IonButton>
        </IonButtons>)
      }
      else{
        return(<IonButtons slot="end" >
        <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="secondary" onClick={actionSheetHandler}>
        Logout
        </IonButton>
        </IonButtons>)
      }
    }
    else{
      return(<IonButtons slot="end" >
      <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="primary" routerLink="/login">
      Login/Register
      </IonButton>
      </IonButtons>)
    }
  }

    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar color="none">
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"5px"}} />
                <IonButton routerLink="#"/>
              </IonButtons>
              {/* <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton> */}
              {/* </IonButtons> */}
              <IonButtons slot="end" >
                <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="danger" onClick={()=>resetAmount()}>
                  Reset
                </IonButton>
              </IonButtons>
              {signinhandler()}

            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>

              </IonToolbar>
            </IonHeader>
            <Swiper
              effect={"coverflow"}
              spaceBetween={1}
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
                dynamicBullets:true
              }}
              modules={[ Grid,Pagination,EffectCoverflow]}>

              {barangctx.items.length != 0 ? barangctx.items.map((item)=>(
                <SwiperSlide key={item.id}>
                  <IonRow className="card-slider center">
                    <IonCol size="5">
                      <IonImg className="img-slider" src={item.fotoUrl} alt={item.title}/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>{item.title}</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 {item.type})</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. {item.price}</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput className="ion-margin" maxlength={2} placeholder={item.amount.toString()} onIonChange={(e)=>inputHandler(e)} onIonInput={()=>setIds(item.id)} onIonBlur={()=>priceCalculation()}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>
               ))
             :
             <SwiperSlide >
             <IonButtons className="ion-padding ion-margin">
               <IonText className="ion-text-center">
                <h5>kosong</h5>
                 <IonButton color="light" routerLink="/TambahBarang">
                 <h5>Tambah barang</h5>
                 </IonButton>
               </IonText>
             </IonButtons>
             </SwiperSlide>
           }
            </Swiper>
            <IonCard className="card-th-dh-lds" color="primary">
              <IonRow className="center">
                <IonCol size="5.5" className="label-TH">Total Harga</IonCol>
                <IonCol size="5.5" className="label-DH"><IonLabel>Rp. </IonLabel>{TotalHarga},-</IonCol>
              </IonRow>
              <IonRow className="center">
                <IonCol size="11.5" color="light" className="label-LDS"onClick={()=>setShowModal(true)}>
                Lihat Daftar Struk
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
                <h3 className="center text-bold">Struk Belanja</h3>
                <IonGrid className="ion-no-padding ion-no-margin" style={{maxHeight:"35px"}}>
                  <IonRow>
                    <IonCol size="8">
                      <IonTitle className="total-barang text-bold">Total Barang: 07 </IonTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton fill="clear" color="medium" className="text-bold">Hapus Semua</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonContent scrollEvents={true} className="modalContent">

                {barangctx.items.length != 0 ? barangctx.items.map((item)=>{
                  if(item.amount > 0){
                    return(
                      <IonItem lines="none" className="card-modal" key={item.id}>
                        <IonCol size="3">
                          <img className="img-modal center" src={item.fotoUrl} alt={item.title}/>
                        </IonCol>
                        <IonCol size="9">
                          <IonRow>
                            <IonCol size="8">
                              <IonText>{item.title}</IonText>
                              <IonCardSubtitle>Rp. {item.price}</IonCardSubtitle>
                              <IonCardSubtitle>Rp. {item.price * item.amount}</IonCardSubtitle>
                            </IonCol>
                            <IonCol size="4">
                              <IonCol>
                                <IonTitle class="satuan-jumlah">{item.amount} {item.type}</IonTitle>
                              </IonCol>
                              <IonButton className="trash-can" fill="clear">
                                <IonIcon color="danger" icon={trashOutline}/>
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonCol>
                      </IonItem>
                    )
                  }
                })
                  :
                  <h2 className="text-center">daftar kosong</h2>
                }
                </IonContent>

                <IonCard color="primary" className="card-th-dh-lds-modal ion-no-margin">
                  <IonRow className="center">
                    <IonCol size="5.5" className="label-TH">Total Harga</IonCol>
                    <IonCol size="5.5" className="label-DH">{TotalHarga}</IonCol>
                  </IonRow>
                  <IonRow className="center">
                    <IonCol size="11.5" color="light" className="label-LDS"onClick={()=>setShowModal(true)}>
                    Tanggal: {date}
                    </IonCol>
                  </IonRow>
                </IonCard>

            </IonModal>

        <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        // cssClass='my-custom-class'
        header= 'Apakah kamu yakin ingin Logout dari akun ini ?'
        buttons={[{
          text: 'Saya Yakin',
          role: 'destructive',
          icon: trash,
          id: 'delete-button',
          data: {
            type: 'delete'
          },
          handler: () => {
            uLogout()
          }
        }, 
        {
          text: 'Cancel',
          icon: close,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>

          </IonContent>
        </IonPage>
    );
};

export default Home;
