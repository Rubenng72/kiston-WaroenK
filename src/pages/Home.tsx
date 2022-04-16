import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput, IonModal, IonGrid, IonRow} from "@ionic/react";
import {createOutline, text, trashOutline} from "ionicons/icons";
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid} from "swiper";
import "swiper/css/grid";
import { useState } from "react";


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
          <h6 style={{textAlign:"center"}}>Struk Belanja</h6>
          
        </IonModal>
          </IonContent>
        </IonPage>
    );
};

export default Home;
