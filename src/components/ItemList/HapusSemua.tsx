import React from "react";
import { useContext} from "react";
import { IonButtons, IonButton} from '@ionic/react';
import BarangContext from '../../data/barang-context';

const HapusSemua: React.FC = () => {
    const barangctx = useContext(BarangContext);

    const deleteAll = () => {
      console.log("delete all function");
      barangctx.deleteAllItems();
    }

    return (
      <IonButtons slot="end" >
        <IonButton style={{marginTop:"10px", marginRight:"5px"}} fill="solid" color="danger" onClick={() => deleteAll()}>
          Hapus Semua
        </IonButton>
      </IonButtons>
    );
};

export default HapusSemua;
