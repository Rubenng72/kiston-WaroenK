import React from "react";
import { useState, useContext } from "react";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonContent, IonBackButton, IonCard, IonRow, IonCol, IonCardContent, IonText, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList } from "@ionic/react";
import { arrowDownCircle, trashOutline } from "ionicons/icons";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
import BarangContext from '../data/barang-context';
import './History.css'

const History: React.FC = () => {
    const barangctx = useContext(BarangContext);
    const db = getFirestore();

    async function deleteSingleHistory(id: string) {
        const dataHistory = doc(db, "history", id);
        const dataHistoryReceipt = query(collection(db, "historyReceipt"), where("receiptId", "==", id));
        try{
          await deleteDoc(dataHistory);

          });
          // console.log('done');
        }catch(error){
          // console.log(error);
        }
    }

    const deleteAllHistory = () => {
        if(barang.length != 0){
          for(let i = 0; i < barang.length; i++){
            deleteBarang(barang[i].id, barang[i].foto);
          }
        }else{
          window.location.assign("/tabs/History");
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>History</IonTitle>
                    <IonButtons slot="end" >
                        <IonButton id="clear-btn" fill="solid" color="danger">
                            Clear History
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
            {barangctx.history.length != 0 && (barangctx.history.map((item)=>(
                <IonCard id="history-card" key={item.id}>
                    <IonRow id="il-fs">

                        <IonCol size="5">
                            <IonCardContent className="ion-text-left">

                                <IonLabel>{item.date}</IonLabel><br></br>
                                <IonLabel>Total Harga :</IonLabel>

                            </IonCardContent>
                        </IonCol>

                        <IonCol size="5">
                            <IonCardContent className="center">

                                <IonLabel>{item.time}</IonLabel><br></br>
                                <IonLabel>Rp. {item.totalPrice}</IonLabel>

                            </IonCardContent>
                        </IonCol>

                        <IonCol size="2">
                            <IonButtons className="icon-button">
                                <IonButton color="danger" fill="solid" className="icon" onClick={() => deleteSingleHistory(item.id)}>
                                    <IonIcon icon={trashOutline} slot="icon-only" size="large" />
                                </IonButton>
                            </IonButtons>
                        </IonCol>

                    </IonRow>

                    <IonAccordionGroup>
                        <IonAccordion id="drop-down" toggleIcon={arrowDownCircle}>

                            <IonItem className="ion-no-padding" slot="header">
                                <IonTitle>Receipt Details</IonTitle>
                            </IonItem>

                            <IonList slot="content">
                            {barangctx.historyReceipt.map((value)=>{
                                if(value.receiptId == item.id){
                                    return(
                                        <>
                                        <IonItem lines="none">
                                            <IonCol size="6">
                                                <IonLabel>{value.name}</IonLabel>
                                            </IonCol>

                                            <IonCol size="6">
                                                <IonLabel>{value.quantity} pcs</IonLabel>
                                            </IonCol>
                                        </IonItem>
                                        
                                        <IonItem>
                                                <IonCol size="6">
                                                    
                                                </IonCol>

                                                <IonCol size="6">
                                                    <IonLabel>Rp. {value.totalPrice}</IonLabel>
                                                </IonCol>
                                        </IonItem>
                                        </>
                                    )
                                }
                            })}
                            </IonList>

                            
                        </IonAccordion>
                    </IonAccordionGroup>

                </IonCard>
            )))}

            </IonContent>

        </IonPage>
    );
};

export default History;
