import React, { useState } from "react";
import { useContext} from "react";
import { IonButtons, IonButton, IonGrid, IonActionSheet, IonToolbar, IonLoading} from '@ionic/react';
import BarangContext from '../../data/barang-context';
import { checkmarkOutline, closeOutline } from "ionicons/icons";


const HapusSemua: React.FC = () => {
    const barangctx = useContext(BarangContext);
    const [actionSheet, setShowActionSheet] = useState(false);
    const deleteAll = () => {
      console.log("delete all function");
      barangctx.deleteAllItems();
      window.location.assign("/tabs/ItemList");
    }
    const sheetHandler = () => {
      setShowActionSheet(true);
    }

    return (
    
    <IonToolbar>
      <IonButtons slot="end" >
        <IonButton style={{marginTop:"10px", marginRight:"5px"}} fill="solid" color="danger" onClick={() => sheetHandler ()}>
          Hapus Semua
        </IonButton>
      </IonButtons>
      { <IonActionSheet 
            cssClass = 'IASBackground'
            isOpen={actionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            header="Hapus barang?"
            buttons={[{
                icon: checkmarkOutline,
                text: "Iya, Hapus",
                handler: () => deleteAll(),
              },
              {
                icon: closeOutline,
                text: "Tidak",
              }
            ]}
            />
          }

    </IonToolbar>
    );
};

export default HapusSemua;
