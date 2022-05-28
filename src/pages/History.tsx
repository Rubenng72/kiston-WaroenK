import React from "react";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonIcon, IonContent, IonBackButton, IonCard, IonRow, IonCol, IonCardContent, IonText, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList } from "@ionic/react";
import { arrowDownCircle, trashOutline } from "ionicons/icons";
import './History.css'

const History: React.FC = () => {
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

                <IonCard id="history-card">
                    <IonRow id="il-fs">

                        <IonCol size="5">
                            <IonCardContent className="ion-text-left">

                                <IonLabel>28/05/2022</IonLabel><br></br>
                                <IonLabel>Total Harga :</IonLabel>

                            </IonCardContent>
                        </IonCol>

                        <IonCol size="5">
                            <IonCardContent className="center">

                                <IonLabel>21:50:59</IonLabel><br></br>
                                <IonLabel>Rp. 120.000</IonLabel>

                            </IonCardContent>
                        </IonCol>

                        <IonCol size="2">
                            <IonButtons className="icon-button">
                                <IonButton color="danger" fill="solid" className="icon">
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

                                <IonItem lines="none">
                                    <IonCol size="6">
                                        <IonLabel>Nama Barang 1</IonLabel>
                                    </IonCol>

                                    <IonCol size="6">
                                        <IonLabel>Jumlah Barang</IonLabel>
                                    </IonCol>
                                </IonItem>

                                <IonItem>
                                    <IonCol size="6">
                                        <IonLabel>Price/Pcs</IonLabel>
                                    </IonCol>

                                    <IonCol size="6">
                                        <IonLabel>Rp 12.000</IonLabel>
                                    </IonCol>
                                </IonItem>

                            </IonList>

                            <IonList slot="content">

                                <IonItem lines="none">
                                    <IonCol size="6">
                                        <IonLabel>Nama Barang 1</IonLabel>
                                    </IonCol>

                                    <IonCol size="6">
                                        <IonLabel>Jumlah Barang</IonLabel>
                                    </IonCol>
                                </IonItem>

                                <IonItem>
                                    <IonCol size="6">
                                        <IonLabel>Price/Pcs</IonLabel>
                                    </IonCol>

                                    <IonCol size="6">
                                        <IonLabel>Rp 12.000</IonLabel>
                                    </IonCol>
                                </IonItem>

                            </IonList>

                            
                        </IonAccordion>
                    </IonAccordionGroup>

                </IonCard>

            </IonContent>

        </IonPage>
    );
};

export default History;
