import React from "react";
import { useState, useContext } from "react";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonContent, IonBackButton, IonCard, IonRow, IonCol, IonCardContent, IonText, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonActionSheet } from "@ionic/react";
import { arrowDownCircle, checkmarkOutline, closeOutline, trashOutline } from "ionicons/icons";
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
import BarangContext from '../data/barang-context';
import './History.css'

const History: React.FC = () => {
    const barangctx = useContext(BarangContext);
    const db = getFirestore();

    const [actionSheetDeleteSingleHistory, setActionSheetDeleteSingleHistory] = useState(false);
    const [actionSheetDeleteAllHistory, setActionSheetDeleteAllHistory] = useState(false);
    const [idH, setIdH] = useState<string>('');

    async function deleteSingleHistory(id: string) {
        const dataHistory = doc(db, "history", id);
        barangctx.historyReceipt.forEach((value)=>{
          if(value.receiptId == id){
            try{
              deleteDoc(doc(db,"historyReceipt", value.id));
              console.log('deleted', value.id)
            }catch(e){
              // console.log(error);
            }
          }
        })
        try{
          await deleteDoc(dataHistory);

          // console.log('done');
        }catch(error){
          // console.log(error);
        }
    }

    const deleteAllHistory = () => {
        if(barangctx.history.length != 0){
            if(barangctx.historyReceipt.length != 0){
                for(let i = 0; i < barangctx.history.length; i++){
                    deleteSingleHistory(barangctx.history[i].id);
                }
            }
        }else{
          window.location.assign("/tabs/History");
        }
    }

    const sheetDeleteSinleHistoryHandler = (id: string) => {
        setActionSheetDeleteSingleHistory(true);
        setIdH(id);
    }
    const sheetDeleteAllHistoryHandler = () => {
        setActionSheetDeleteAllHistory(true);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>History</IonTitle>
                    <IonButtons slot="end" >
                        <IonButton id="clear-btn" fill="solid" color="danger" onClick={() => sheetDeleteAllHistoryHandler ()}>
                            Clear History
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            { <IonActionSheet
            cssClass = 'IASBackground'
            isOpen={actionSheetDeleteAllHistory}
            onDidDismiss={() => setActionSheetDeleteAllHistory(false)}
            header="Delete All Histories?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Yes, Delete",
                handler: () => deleteAllHistory(),
              },
              {
                icon: closeOutline,
                text: "No",
              }
            ]}
            />
          }

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
                                <IonButton color="danger" fill="solid" className="icon" onClick={() => sheetDeleteSinleHistoryHandler(item.id)}>
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
            {idH && (
                <IonActionSheet
                cssClass="IASBackground"
                isOpen={actionSheetDeleteSingleHistory}
                onDidDismiss={() => setActionSheetDeleteSingleHistory(false)}
                header="Delete History?"
                buttons={[
                    {
                    icon: checkmarkOutline,
                    text: "Yes, Delete",
                    handler: () => deleteSingleHistory(idH),
                    },
                    {
                    icon: closeOutline,
                    text: "No",
                    },
                ]}
                />
            )}

            </IonContent>

        </IonPage>
    );
};

export default History;
