import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useContext, useEffect } from 'react';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import TambahBarang from './pages/TambahBarang';
import EditBarang from './pages/EditBarang';
import NavTabs from './components/NavigationTabs';
import BarangContextProvider from './data/BarangContextProvider';
import BarangContext from './data/barang-context';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => {
  const barangCtx = useContext(BarangContext);
  const {initContext} = barangCtx;
  localStorage.clear();
  indexedDB.deleteDatabase("Disc");
  useEffect(() => {
    initContext();
  }, [initContext]);
  
  return(
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <BarangContextProvider>
            <IonRouterOutlet id="main">
            <Route path="/tabs" component={NavTabs}/>
            <Route path="/Home" component={Home}/>
            <Route path="/ItemList" component={ItemList}/>
            <Route path="/TambahBarang" component={TambahBarang}/>
            <Route path="/EditBarang/:itemId" component={EditBarang}/>
            <Redirect exact from="/" to="/tabs" />
            </IonRouterOutlet>
          </BarangContextProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
