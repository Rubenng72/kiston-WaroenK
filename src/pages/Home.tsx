import {IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonItem, IonCard, IonCol, IonInput} from "@ionic/react";
import {createOutline, trashOutline} from "ionicons/icons";
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination ,Grid} from "swiper";
import "swiper/css/grid";


const Home: React.FC = () => {
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
          <SwiperSlide>Slide 1
          {/* <IonItem lines="full" button color='light' style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
            <div style={{display:"flex", height:'120px'}}>
            <img style={{borderRadius:'100%',marginTop:'10px',marginBottom:'10px', marginRight:'auto',marginLeft:'auto',display:'block'}} src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
            <div >
            <h6 style={{marginTop:'10px',marginLeft:'10px', fontSize:"12px",fontWeight:'bold', width:'100px'}}>nama item</h6>
            <p style={{marginTop:'5px',marginLeft:'10px' , fontSize:"12px",fontWeight:'bold'}}>jumlah item</p>
            <p style={{marginTop:'0px',marginLeft:'10px', fontSize:"9px",fontWeight:"lighter"}}>harga item</p>
            <IonItem>
            <IonInput></IonInput>
            </IonItem>
            </div>
            </div>
            </IonItem> */}
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

        {/* <SwiperSlide  >
        </SwiperSlide> */}

        {/* <IonItem lines="full" button color='light' style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
            <div style={{display:"flex", height:'120px'}}>
            <img style={{borderRadius:'100%',marginTop:'10px',marginBottom:'10px', marginRight:'auto',marginLeft:'auto',display:'block'}} src="assets/foto/beefTesting.jpg" alt="yoast seo"/>
            <div >
            <h6 style={{marginTop:'10px',marginLeft:'10px', fontSize:"12px",fontWeight:'bold', width:'100px'}}>nama item</h6>
            <p style={{marginTop:'5px',marginLeft:'10px' , fontSize:"12px",fontWeight:'bold'}}>jumlah item</p>
            <p style={{marginTop:'0px',marginLeft:'10px', fontSize:"9px",fontWeight:"lighter"}}>harga item</p>
            <IonItem>
            <IonInput></IonInput>
            </IonItem>
            </div>
            </div>
            </IonItem> */}
          
          {/* style={{width:'40px', height:'40px'}} */}

        
      </Swiper>          
          </IonContent>
        </IonPage>
    );
};

export default Home;
