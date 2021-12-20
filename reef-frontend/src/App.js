import logo from './logo.svg';
import './App.css';
import Web3Context, { Web3Provider } from './Context/Web3Context';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateCollection from './Pages/CreateCollection';
import { TRAlert } from 'tr-alerts';
import UserCollections from './Pages/UserCollections';
import CollectionDetail from './Pages/CollectionDetail';
import CreateNFT from './Pages/NFTs/CreateNFT';
import ExploreCollections from 'Pages/Collections/Explore';
import BuyNFTPage from './Pages/NFTs/BuyNFTPage';
import { ExplorePageProvider } from './Context/ExplorePageContext';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import YourCollections from 'Pages/Collections/Me/index';
import Footer from 'Components/Footer/index';
import Profile from 'Pages/Profile/index';
import AllCollections from 'Pages/Marketplace/All';
import ListedCollections from 'Pages/Marketplace/Listed';
import OwnedCollections from 'Pages/Marketplace/Owned';


function App() {
  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])
  return (
    <div className="relative background">
      <TRAlert />
      <Web3Provider>
        <ExplorePageProvider>

          <Router>
            <Navbar />

            <Switch>

              <Route path="/createCollection">
                <CreateCollection />
              </Route>
              <Route path="/myCollections">
                <UserCollections />
              </Route>
              <Route path="/:contractAddress/:metaDataHash/:ownerAddress/mint">
                <CreateNFT />
              </Route>
              <Route path="/:contractAddress/:metaDataHash/:ownerAddress">
                <CollectionDetail />
              </Route>
              <Route path="/explore/detail">
                <BuyNFTPage />
              </Route>
              <Route path="/nfts/marketplace">
                <AllCollections />
              </Route>
              <Route path="/nfts/listed">
                <ListedCollections />
              </Route>
              <Route path="/nfts/owned">
                <OwnedCollections />
              </Route>

              <Route path="/explore">
                <ExploreCollections />
              </Route>
              <Route path="/collections/me">
                <YourCollections />
              </Route>
              <Route path="/collections/explore">
                <ExploreCollections />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>

            <Footer />

          </Router>
        </ExplorePageProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
