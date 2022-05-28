import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {homeOutline, enterOutline, timeOutline} from "ionicons/icons";
import Home from '../pages/Home';
import ItemList from '../pages/ItemList';
import History from '../pages/History';

const NavigationTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/Home" />
        <Route exact path="/tabs/Home" component={Home} />
        <Route exact path="/tabs/ItemList" component={ItemList} />
        <Route exact path="/tabs/History" component={History} />
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

        <IonTabButton tab="History" href="/tabs/History">
          <IonIcon icon={timeOutline}/>
          {/*<IonLabel>Item List</IonLabel>*/}
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  );
};

export default NavigationTabs;
