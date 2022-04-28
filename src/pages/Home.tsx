import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonFooter, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonTitle, IonLabel, IonCardSubtitle, IonAvatar, IonCardTitle, IonImg} from "@ionic/react";
import './Home.css'
import './HomeModal.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid, EffectCoverflow} from "swiper";
import "swiper/css/grid";
import { useContext, useState } from "react";
import {createOutline, text, trashOutline, closeCircleOutline} from "ionicons/icons";
import BarangContext from '../data/barang-context';

const Home: React.FC = () => {
  const barangctx = useContext(BarangContext);
  const [ids, setId] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [TotalHarga, setTotalHarga] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);


  const inputHandler = (price: number, quantity: number) => {
    setTotalHarga(quantity * price);
    setQuantity(quantity);
  }

    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar color="none">
              <IonButtons slot="start" >
              <IonSearchbar id="caribarang" placeholder="Cari Barang" style={{marginTop:"10px", marginRight:"5px"}} />
                <IonButton routerLink="/tabs/TambahBarang"/>
              </IonButtons>
              {/* <IonButtons slot="end" >
                <IonButton routerLink="/tabs/TambahBarang">
                  <IonIcon size="large"  md={addOutline} ios={addOutline}/>
                </IonButton> */}
              {/* </IonButtons> */}
              <IonButtons slot="end" >
                <IonButton style={{marginTop:"10px", marginRight:"10px"}} fill="solid" color="danger" routerLink="/tabs/TambahBarang">
                  Reset
                </IonButton>
              </IonButtons>
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
                      <IonImg className="img-slider" src={item.base64url} alt={item.title}/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>{item.title}</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 {item.type})</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. {item.price}</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput id="home" maxlength={2} value={quantity} type={"number"} onIonChange={quantity => inputHandler(item.price, Number(quantity.detail.value))}></IonInput>
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
              breakpoints={[0, 0.5, 1]}
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
          </IonContent>
        </IonPage>
    );
};

export default Home;
