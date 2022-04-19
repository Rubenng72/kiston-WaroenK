import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonFooter, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonTitle, IonLabel, IonCardSubtitle, IonAvatar, IonCardTitle, IonImg} from "@ionic/react";
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid, EffectCoverflow} from "swiper";
import "swiper/css/grid";
import { useState } from "react";
import {createOutline, text, trashOutline, closeCircleOutline} from "ionicons/icons";


const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  
    return (
        <IonPage>
          <IonHeader class="ion-no-border">
            <IonToolbar>
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

              {/* {shuffledata.map((data)=>( */}
                <SwiperSlide style={{padding:'0', margin:'0'}} >
                  <IonRow className="card-slider center">
                    <IonCol size="5">
                      <IonImg className="img-slider" src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>Indomie Goreng</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 pcs)</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. 2.500,00</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput id="home" maxlength={2} value={0}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>
                
                <SwiperSlide>
                  <IonRow className="card-slider center">
                    <IonCol size="5">
                      <img className="img-slider" src="assets/foto/beefTesting.jpg"/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>Indomie Goreng</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 pcs)</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. 2.500,00</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput id="home" maxlength={2} value={0}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>

                <SwiperSlide>
                  <IonRow className="card-slider center">
                    <IonCol size="5">
                      <img className="img-slider" src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
                    </IonCol>
                    <IonCol size="7">
                      <IonCardTitle style={{textAlign:"left"}}>Indomie Goreng</IonCardTitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>(1 pcs)</IonCardSubtitle>
                      <IonCardSubtitle style={{textAlign:"left"}}>Rp. 2.500,00</IonCardSubtitle>
                      <IonRow className="jumlah-item">
                        <IonInput id="home" maxlength={2} value={0}></IonInput>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </SwiperSlide>

                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
                <SwiperSlide>Slide 10</SwiperSlide>
                <SwiperSlide>Slide 11</SwiperSlide>
              {/* ))} */}
            </Swiper>

            <IonCard className="card-default" color="primary">
              <IonRow className="center">
                <IonCol size="5.5" className="label-TH">Total Harga</IonCol>
                <IonCol size="5.5" className="label-DH">Dummy Harga</IonCol>
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
                <h1 className="center text-bold">Struk Belanja</h1>
                <IonGrid className="ion-no-padding ion-no-margin" style={{maxHeight:"35px"}}>
                  <IonRow>
                    <IonCol size="8">
                      <IonTitle className="total-barang text-bold">Total Barang: 07</IonTitle>
                    </IonCol>
                    <IonCol size="4">
                      <IonButton fill="clear" color="dark">Hapus Semua</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonContent scrollEvents={true} className="modalContent">

                  <IonItem lines="none" button color='primary' className="card-modal">
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

                </IonContent>

                <IonCard color="primary" className="bottomCard ion-no-margin">
                  <div style={{display:'flex', height:'50px', marginLeft:"auto", marginRight:'auto', textAlign:'center', marginBottom:"auto",marginTop:"auto"}}>
                    <h6 style={{marginLeft:'10px',marginRight:"5px",marginTop:'10px',paddingTop:"5px", fontSize:"15px", width:"50%",backgroundColor:"black",color:"white",borderRadius:"5px"}}>Total Harga</h6>
                    <h6 style={{marginLeft:'5px',marginRight:"10px",marginTop:'10px',paddingTop:"5px", fontSize:"15px",color:'white', width:"50%",backgroundColor:"green", borderRadius:"5px"}}>Dummy Harga</h6>
                  </div>
                  <div style={{marginLeft:"auto", marginRight:'auto', textAlign:'center', marginBottom:'5px'}}>
                    <h6 style={{marginLeft:'10px',marginRight:"10px",marginTop:'10px',paddingTop:"10px",paddingBottom:"10px", fontSize:"15px",color:'black', borderRadius:"5px",backgroundColor:"white", textAlign:"center"}}>Dummy Tanggal</h6>
                  </div>
                </IonCard>

            </IonModal>
          </IonContent>
        </IonPage>
    );
};

export default Home;
