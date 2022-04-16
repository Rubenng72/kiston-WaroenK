import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow, IonFooter, IonInfiniteScroll, IonInfiniteScrollContent, IonText, IonTitle} from "@ionic/react";
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid} from "swiper";
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
        slidesPerView={1}
        grid={{
          rows: 3,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
      >
        {/* {shuffledata.map((data)=>( */}
          <SwiperSlide >
          <IonItem lines="full" button color='primary' style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px',marginBottom:"10px", minWidth:"95%"}}>
            <div style={{display:"flex"}}>
            <img style={{borderRadius:'100%',marginTop:'10px',marginBottom:'10px', marginRight:'auto',marginLeft:'auto',display:'block', height:"120px", width:"120px"}} src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
            <div >
            <h6 style={{marginTop:'10px',marginLeft:'10px', fontSize:"12px",fontWeight:'bold', width:'100px'}}>nama item</h6>
            <p style={{marginTop:'5px',marginLeft:'10px' , fontSize:"12px",fontWeight:'bold'}}>jumlah item</p>
            <p className="hargacolor" style={{marginTop:'0px',marginLeft:'10px', fontSize:"10px",fontWeight:"bold"}}>harga item</p>
            <IonItem className='input' style={{marginBottom:"5px", marginLeft:"10px",width:"50px", paddingRight:"0"}}>
            <IonInput maxlength={2} value={0} ></IonInput>
            </IonItem>
            </div>
            </div>
            </IonItem>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>

        {/* ))} */}
      
      </Swiper> 

      <IonCard color="primary">
      <div style={{display:'flex', height:'50px', marginLeft:"auto", marginRight:'auto', textAlign:'center', marginBottom:"auto",marginTop:"auto"}}>
      <h6 style={{marginLeft:'10px',marginRight:"5px",marginTop:'10px',paddingTop:"5px", fontSize:"15px", width:"50%",backgroundColor:"black",color:"white",borderRadius:"5px"}}>Total Harga</h6>
      <h6 style={{marginLeft:'5px',marginRight:"10px",marginTop:'10px',paddingTop:"5px", fontSize:"15px",color:'white', width:"50%",backgroundColor:"green", borderRadius:"5px"}}>Dummy Harga</h6>
      </div>
      <div style={{marginLeft:"auto", marginRight:'auto', textAlign:'center', marginBottom:'5px'}}>
      <IonButton onClick={()=>setShowModal(true)} color="light">Lihat Daftar Struk</IonButton>
      </div>
      </IonCard>
               
      <IonModal
          isOpen={showModal}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.5, 1]}
          onDidDismiss={() => setShowModal(false)}>
          <h1 className="ion-no-padding" style={{textAlign:"center", fontWeight:"bold"}}>Struk Belanja</h1>
          <IonGrid className="ion-no-padding ion-no-margin" style={{maxHeight:"35px"}}>
            <IonRow>
              <IonCol>
                <div className="left">Total Barang : .....</div>
              </IonCol>
              <IonCol>
                <IonButtons className="right">
                  <IonButton color="dark">
                   Hapus Semua
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonContent scrollEvents={true} className="modalContent">
          <IonItem lines="full" button color='primary' style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px',marginBottom:"10px", borderRadius:'5px', paddingRight:"0"}}>
            
            <IonCol size="3">
            <img style={{borderRadius:'100%',margin:'auto',display:'block', height:"70px", width:"70px"}} src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
            </IonCol>
            <IonCol size="6">
            <h6 style={{marginTop:'10px',marginLeft:'20px', fontSize:"12px",fontWeight:'bold', width:'100px'}}>nama item</h6>
            <p className="hargacolor" style={{marginTop:'5px',marginLeft:'20px' , fontSize:"12px",fontWeight:'bold'}}>harga satuan item</p>
            <p className="hargacolor" style={{marginTop:'0px',marginLeft:'20px', fontSize:"10px",fontWeight:"bold"}}>harga item</p>
            </IonCol>
            <IonCol size="3">
              <IonRow className="rightIcon ion-no-padding ion-no-margin">
                <IonButtons >
                <IonButton>
                  <IonIcon color="danger" icon={closeCircleOutline}/>
                </IonButton>
              </IonButtons>
              </IonRow>
              <IonRow>
              <p style={{width:"100px", fontSize:"10px",fontWeight:"bold"}}>... pcs/lusin</p>
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
