import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonText, IonTitle, IonLabel, IonCardSubtitle, IonCardTitle, IonImg, IonActionSheet} from "@ionic/react";
import './Home.css'
import './HomeModal.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid, EffectCoverflow} from "swiper";
import "swiper/css/grid";
import { useState, useContext, useEffect} from "react";
import { trashOutline, close, checkmark } from "ionicons/icons";
import BarangContext from '../data/barang-context';
import {logout} from "../data/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// interface barangType {
//   id: string;
//   uId: string;
//   foto: string;
//   fotoUrl: string;
//   title: string;
//   price: number;
//   type: 'pcs' | 'lusin' | 'kodi' | 'gross' | 'rim';
//   amount: number;
// };
interface barangType {
  id: string;
  uId: string;
  foto: string;
  fotoUrl: string;
  title: string;
  price: number;
  type: 'box';
  disc: number;
  nMax: number;
  amount: number;
};

const Home: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const barangctx = useContext(BarangContext);
  const [ids, setIds] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [TotalHarga, setTotalHarga] = useState<number>(0);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const inputHandler = async(e:CustomEvent) => {
    const amount = Number(e.detail.value);
    const barangRef = doc(db, "barang", ids);
    await updateDoc(barangRef, { "amount" : amount})
  }

  // const priceCalculation = () =>{
  //   let sum = 0;
  //   barangctx.items.forEach((value)=>{
  //     if(value.amount >0){
  //       sum += value.price * value.amount;
  //       console.log(value.amount);
  //     }
  //   })
  //   setTotalHarga(sum);
  // }

  let hargaBox = 0;
  const priceCalculation = () =>{
    let sum = 0;
    let temp = 0;
    let modulus = 0;
    let box = 0;
   

    barangctx.items.forEach((value)=>{
      if(value.amount > 0 && value.amount < value.nMax){
        sum += value.price * value.amount;
        console.log(value.amount);
      } else if (value.amount > 0 && value.amount >= value.nMax){
        hargaBox = (value.nMax * value.price) - ((value.nMax * value.price) * (value.disc));
        console.log(hargaBox);
        modulus = value.amount % value.nMax; 
        temp = modulus; 

        box = value.amount - temp; 
        box = box / value.nMax;
        sum += (box * hargaBox) + (temp * value.price); 
      }
    })
    setTotalHarga(sum);
  }

  const clearReceipt = () => {
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
        <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="primary" onClick={actionSheetHandler}>
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

   // Function Search
   useEffect(() => {
    searchFunction();
  }, [searchValue]);

  const searchFunction = () => {
    return barangctx.items.filter((barang: barangType) => (
      barang.title.toLowerCase().includes(searchValue.toLowerCase())
    ));
  }

    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar color="none">
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" onIonChange={e => setSearchValue(e.detail.value!)} style={{marginTop:"10px", marginRight:"5px"}} />
                <IonButton routerLink="#"/>
              </IonButtons>
              {/* <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton> */}
              {/* </IonButtons> */}
              <IonButtons slot="end" >
                <IonButton style={{marginTop:"10px", marginRight:"5px"}} fill="solid" color="danger" onClick={()=>clearReceipt()}>
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
                dynamicBullets:true
              }}
              modules={[ Grid,Pagination,EffectCoverflow]}>

              {searchValue == '' && barangctx.items.length != 0 && ( barangctx.items.map((item)=>(
                <SwiperSlide key={item.id}>
                  <IonRow className="card-slider center">
                    <IonCol size="5">
                      <IonImg className="img-slider" src={item.fotoUrl} alt={item.title}/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>{item.title}</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 {item.type})</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. {parseFloat(item.price.toString()).toLocaleString('en')}</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput maxlength={2} placeholder={item.amount.toString()} onIonChange={(e)=>inputHandler(e)} onIonInput={()=>setIds(item.id)} onIonBlur={()=>priceCalculation()}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>
               ))
              )}

              {barangctx.items.length == 0 && (
                <SwiperSlide>
                  <IonGrid>
                    <IonRow className="center">
                      <IonButtons>
                        <IonText className="ion-text-center">
                          <IonImg src={'https://www.svgrepo.com/show/157995/empty-white-box.svg'} />
                          <h5>No Item Listed</h5>
                          <IonButton color="light" routerLink="/TambahBarang">
                          <h5>Add Item</h5>
                          </IonButton>
                        </IonText>
                      </IonButtons>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
              )}

              {searchValue != '' && barangctx.items.length != 0 && ( searchFunction().map((item)=>(
                <SwiperSlide key={item.id}>
                <IonRow className="card-slider center">
                  <IonCol size="5">
                    <IonImg className="img-slider" src={item.fotoUrl} alt={item.title}/>
                  </IonCol>
                  <IonCol size="7">
                    <IonCardTitle style={{textAlign:"left"}}>{item.title}</IonCardTitle>
                    <IonCardSubtitle style={{textAlign:"left"}}>(1 {item.type})</IonCardSubtitle>
                    <IonCardSubtitle style={{textAlign:"left"}}>Rp. {parseFloat(item.price.toString()).toLocaleString('en')}</IonCardSubtitle>
                    <IonRow className="jumlah-item">
                      <IonInput maxlength={2} placeholder={item.amount.toString()} onIonChange={(e)=>inputHandler(e)} onIonInput={()=>setIds(item.id)} onIonBlur={()=>priceCalculation()}></IonInput>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </SwiperSlide>
               ))
              )}  

            </Swiper>
            <IonCard className="card-th-dh-lds" color="primary">
              <IonRow className="center">
                <IonCol size="5.5" className="label-TH">Total Price</IonCol>
                <IonCol size="5.5" className="label-DH"><IonLabel>Rp. {parseFloat(TotalHarga.toString()).toLocaleString('en')}</IonLabel>,-</IonCol>
              </IonRow>
              <IonRow className="center">
                <IonCol size="11.5" color="light" className="label-LDS"onClick={()=>setShowModal(true)}>
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
                <IonGrid className="ion-no-padding ion-no-margin" style={{maxHeight:"35px"}}>
                  <IonRow>
                    <IonCol size="8">
                      <IonTitle className="total-barang text-bold">Total Items: 07 </IonTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton fill="clear" color="medium" className="text-bold ion-text-right ion-margin-start">CLEAR ALL</IonButton>
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
                            <IonCol size="7">
                              <IonText>{item.title}</IonText>
                              <IonCardSubtitle>Rp. {parseFloat(item.price.toString()).toLocaleString('en')}</IonCardSubtitle>
                              <IonCardSubtitle>Rp. {hargaBox} </IonCardSubtitle>
                            </IonCol>
                            <IonCol size="5">
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
                  }else{
                    return(
                      <div style={{marginTop: '30px'}} className="ion-text-center">
                        <IonImg style={{width:'20%'}} src={'assets/foto/empty.png'} /> 
                        <h5 style={{fontWeight: 'bold'}}>Your Cart Is Empty</h5>
                      </div>
                  )
                  }
                })
                  :
                  <div style={{marginTop: '30px'}} className="ion-text-center">
                    <IonImg style={{width:'20%'}} src={'assets/foto/empty.png'} /> 
                    <h5 style={{fontWeight: 'bold'}}>Your Cart Is Empty</h5>
                  </div>
                  
                }
                </IonContent>

                <IonCard color="primary" className="card-th-dh-lds-modal ion-no-margin">
                  <IonRow className="center">
                    <IonCol size="5.5" className="label-TH">Total Price</IonCol>
                    <IonCol size="5.5" className="label-DH">{parseFloat(TotalHarga.toString()).toLocaleString('en')}</IonCol>
                  </IonRow>
                  <IonRow className="center">
                    <IonCol size="11.5" color="light" className="label-LDS"onClick={()=>setShowModal(true)}>
                      Transaction Date: {date}
                    </IonCol>
                  </IonRow>
                </IonCard>

            </IonModal>

            <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass='my-custom-class'
            header= 'Are you sure you want to Logout?'
            buttons={[{
              text: 'Ok',
              role: 'destructive',
              icon: checkmark,
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
