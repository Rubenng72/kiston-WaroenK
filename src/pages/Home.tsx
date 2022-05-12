import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonText, IonTitle, IonLabel, IonCardSubtitle, IonCardTitle, IonImg} from "@ionic/react";
import './Home.css'
import './HomeModal.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid, EffectCoverflow} from "swiper";
import "swiper/css/grid";
import { useEffect, useState} from "react";
import { trashOutline } from "ionicons/icons";
import {logout} from "../data/auth";
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Home: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const [barang, setBarang] = useState<Array<any>>([]);
  const [ids, setIds] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [TotalHarga, setTotalHarga] = useState<number>(0);

  const userId = user ? user.uid : '';

  const q = query(collection(db, "barang"), where("uId", "==", userId));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataBarang = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
      // localStorage.setItem("items", JSON.stringify(barang));
      setBarang(dataBarang);
      setIsEmpty(querySnapshot.empty);
    })
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
        setLoading(false);
    }, 1)
    if(barang.length == 0 && !isEmpty){
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const dataBarang = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
        // localStorage.setItem("items", JSON.stringify(barang));
        setBarang(dataBarang);
        setIsEmpty(querySnapshot.empty);
      })
      return () => {
        unsubscribe();
      }
    }
  }, [barang]);




  const inputHandler = async(e:CustomEvent) => {
    const amount = Number(e.detail.value);
    const barangRef = doc(db, "barang", ids);
    await updateDoc(barangRef, { "amount" : amount})
  }

  const priceCalculation = () =>{
    let sum = 0;
    barang.forEach((value)=>{
      if(value.amount >0){
        sum += value.price * value.amount;
      }
    })
    setTotalHarga(sum);
  }

  const resetAmount = () => {
    console.log(barang.length, isEmpty);
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
        <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="secondary" onClick={uLogout}>
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
            {loading? <br/> :
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

              {barang.length != 0 ? barang.map((item)=>(
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
                        <IonInput className="ion-margin" maxlength={2} placeholder={item.amount} readonly={false} onIonChange={(e)=>inputHandler(e)} onIonInput={()=>setIds(item.id)} onIonBlur={()=>priceCalculation()}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>
               ))
             :
             <SwiperSlide>
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
          }
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
            {loading? <br/> :
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
                      <IonTitle className="total-barang text-bold">Total Barang: 07</IonTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton fill="clear" color="medium" className="text-bold">Hapus Semua</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonContent scrollEvents={true} className="modalContent">

                  <IonItem lines="none" className="card-modal">
                    <IonCol size="3">
                      <img className="img-modal center" src="assets/foto/beefTesting.jpg" />
                    </IonCol>
                    <IonCol size="9">
                      <IonRow>
                        <IonCol size="8">
                          <IonText>Indomie Goleng</IonText>
                          <IonCardSubtitle>Rp. 94.500,00</IonCardSubtitle>
                          <IonCardSubtitle>Rp. 189.000,00</IonCardSubtitle>
                        </IonCol>
                        <IonCol size="4">
                          <IonCol>
                            <IonTitle class="satuan-jumlah">2 Lusin</IonTitle>
                          </IonCol>
                          <IonButton className="trash-can" fill="clear">
                            <IonIcon color="danger" icon={trashOutline}/>
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonItem>

                  <IonItem lines="none" className="card-modal">
                    <IonCol size="3">
                      <img className="img-modal center" src="assets/foto/beefTesting.jpg" />
                    </IonCol>
                    <IonCol size="9">
                      <IonRow>
                        <IonCol size="8">
                          <IonText>Indomie Goleng</IonText>
                          <IonCardSubtitle>Rp. 500.000,00</IonCardSubtitle>
                          <IonCardSubtitle>Rp.100.000.000,00</IonCardSubtitle>
                        </IonCol>
                        <IonCol size="4">
                          <IonCol>
                            <IonTitle class="satuan-jumlah">15 Rim</IonTitle>
                          </IonCol>
                          <IonButton className="trash-can" fill="clear">
                            <IonIcon color="danger" icon={trashOutline}/>
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonItem>

                  <IonItem lines="none" className="card-modal">
                    <IonCol size="3">
                      <img className="img-modal center" src="assets/foto/beefTesting.jpg" />
                    </IonCol>
                    <IonCol size="9">
                      <IonRow>
                        <IonCol size="8">
                          <IonText>Indomie Goleng</IonText>
                          <IonCardSubtitle>Rp. 2.500,00</IonCardSubtitle>
                          <IonCardSubtitle>Rp. 10.000,00</IonCardSubtitle>
                        </IonCol>
                        <IonCol size="4">
                          <IonCol>
                            <IonTitle class="satuan-jumlah">4 Pcs</IonTitle>
                          </IonCol>
                          <IonButton className="trash-can" fill="clear">
                            <IonIcon color="danger" icon={trashOutline}/>
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonItem>

                </IonContent>

                <IonCard color="primary" className="card-th-dh-lds-modal ion-no-margin">
                  <IonRow className="center">
                    <IonCol size="5.5" className="label-TH">Total Harga</IonCol>
                    <IonCol size="5.5" className="label-DH">Dummy Harga</IonCol>
                  </IonRow>
                  <IonRow className="center">
                    <IonCol size="11.5" color="light" className="label-LDS"onClick={()=>setShowModal(true)}>
                    Tanggal: 01/01/2022
                    </IonCol>
                  </IonRow>
                </IonCard>

            </IonModal>
            }
          </IonContent>
        </IonPage>
    );
};

export default Home;
