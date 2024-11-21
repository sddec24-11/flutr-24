import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import About from "./pages/About.js";
import NotFound from "./pages/404.js";
import LocationHome from "./pages/LocationHome.js";
import Stats from "./pages/Stats.js";
import Gallery from "./pages/Gallery.js";
import Login from "./pages/Login.js";
import Settings from "./pages/Settings.js";

import Shipments from './pages/Shipments.js';
import AddShipment from './pages/AddShipment.js';
import EditShipment from './pages/EditShipment.js'
import AddRelease from './pages/AddRelease.js';
import MasterButterflyCreate from "./pages/MasterButterflyCreate.js";
import EditButterflies from "./pages/EditButterflies.js";
import AddOrg from "./pages/AddOrg.js";
import ChangePassword from "./pages/ChangePassword.js";

import { RotatingLines } from "react-loader-spinner";

import React, {useState, useEffect, useRef, useMemo} from "react";
import Logout from "./pages/Logout.js";
import MasterButterflyEdit from "./pages/MasterButterflyEdit.js";
import MasterButterflyList from "./pages/MasterButterflyList.js";
import ButterflyGuestView from "./pages/ButterflyGuestView.js";
import EditSupplier from "./pages/EditSuppliers.js";
import AddSupplier from "./pages/AddSuppliers.js";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiFetched = useRef(false);

  const filterData = (responseData) => {
    responseData.payload.filter(item => {
      return item.name !== null && item.subdomain !== null;
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log("Trying fetch");
      try{
        const response = await fetch("http://206.81.3.155:8282/api/orgs/all", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
        },
        });
        response.json().then(json => {
          console.log("Its here: " + JSON.stringify(json.payload));
          window.sessionStorage.setItem("locations", JSON.stringify(json.payload));
          window.location.reload();
          // window.sessionStorage.setItem("locations", JSON.stringify(json.payload));
          // setLocations(filterData(json));
          // window.sessionStorage.setItem("locations", JSON.stringify(filterData(json)));
        });
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
      }
      
    };
    if (window.sessionStorage.getItem("locations") === null){
      fetchData();
      // apiFetched.current = true;  // Mark the API as called
    } else{
      setLocations(JSON.parse(window.sessionStorage.getItem("locations")));
      setLoading(false);
    }

}, []);

const AppRouter = ({locations}) => {
  return(
    <BrowserRouter basename=''>
            <Routes>
                <Route index element={<Landing data={locations} />} />
                <Route path="/about" element={<About />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/changePassword" element={<ChangePassword/>} />

                <Route path="/shipments" element={<Shipments />} />
                <Route path="/addshipment" element={<AddShipment />} />
                <Route path="/editshipment" element={<EditShipment />} />
                <Route path="/addrelease" element={<AddRelease/>} />

              
                {locations.map((r, index) => (
                    <Route path={"/" + r.subdomain} element={<LocationHome data={r.houseId}/>} key={index}/>
                ))}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.subdomain + "/stats"} element={<Stats data={r.houseId} />} key={`${index} stat`}/>
                })}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.subdomain + "/gallery"} element={<Gallery data={r.houseId} />} key={`${index} gallery`}/>
                })}
                <Route path="/kiosk/reiman-gardens" element={<LocationHome data={locations[0].houseId} kioskMode={true}/>} />
                <Route path="/kiosk/reiman-gardens/stats" element={<Stats data={locations[0].houseId} kioskMode={true}/>} />
                <Route path="/kiosk/reiman-gardens/gallery" element={<Gallery data={locations[0].houseId} kioskMode={true}/>} />
                <Route path="/butterfly/view" element={<ButterflyGuestView/>}/>
                <Route path="settings" element={<Settings />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/masterbutterfly/create" element={<MasterButterflyCreate/>}/>
                <Route path="/masterbutterfly/edit" element={<MasterButterflyEdit/>}/>
                <Route path="/masterbutterfly/list" element={<MasterButterflyList/>}/>
                <Route path="/edit/butterfly" element={<EditButterflies/>}/>
                <Route path="/addOrg" element={<AddOrg/>}/>
                <Route path="/edit/suppliers" element={<EditSupplier/>}/>
                <Route path="/add/suppliers" element={<AddSupplier/>}/>
            </Routes>
        </BrowserRouter>
  );
};

  // if (locations === null) {
  //   return <div>Loading...</div>;  // Or use a fancier loader
  // }
  if (loading) {
    return <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />;
  }
  return (
    <div>
        <AppRouter locations={locations} />
    </div>
  );
}
