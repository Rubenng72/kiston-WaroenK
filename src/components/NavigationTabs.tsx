import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {homeOutline, enterOutline} from "ionicons/icons";
import Home from '../pages/Home';
import ItemList from '../pages/ItemList';

const NavigationTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/Home" />
        <Route exact path="/tabs/Home" component={Home} />
        <Route exact path="/tabs/ItemList" component={ItemList} />
      </IonRouterOutlet>
      <IonTabBar color="primary" slot="bottom">
        <IonTabButton tab="Home" href="/tabs/Home">
          <IonIcon icon={homeOutline}/>
          {/*<IonLabel>Home</IonLabel>*/}
        </IonTabButton>
        <IonTabButton tab="ItemList" href="/tabs/ItemList">
          <IonIcon icon={enterOutline}/>
          {/*<IonLabel>Item List</IonLabel>*/}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default NavigationTabs;
