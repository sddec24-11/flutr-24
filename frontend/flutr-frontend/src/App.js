import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Contact from "./pages/Contact.js";
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
import MasterEdit from "./pages/MasterEdit.js";
import MasterButterfly from "./pages/MasterButterfly.js";
import EditButterflies from "./pages/EditButterflies.js";
import AddOrg from "./pages/AddOrg.js";
import ChangePassword from "./pages/ChangePassword.js";

import { RotatingLines } from "react-loader-spinner";

import React, {useState, useEffect, useRef, useMemo} from "react";
import Logout from "./pages/Logout.js";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiFetched = useRef(false);
  // "http://206.81.3.155:8282/api/orgs/list"
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("https://3600aebd-7e20-4f96-ad57-ee19fbe31342.mock.pstmn.io/api/orgs/list", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
        },
        });
        response.json().then(json => {
          setLocations(json);
          window.sessionStorage.setItem("locations", JSON.stringify(json));
          console.log(json);
        });
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
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
                <Route path="/contact" element={<Contact />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/changePassword" element={<ChangePassword/>} />

                <Route path="/shipments" element={<Shipments />} />
                <Route path="/addshipment" element={<AddShipment />} />
                <Route path="/editshipment" element={<EditShipment />} />
                <Route path="/masteredit" element={<MasterEdit />} />

                {locations.map((r, index) => (
                    <Route path={"/" + r.path} element={<LocationHome data={r}/>} key={index}/>
                ))}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.path + "/stats"} element={<Stats data={r} />} key={`${index} stat`}/>
                })}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.path + "/gallery"} element={<Gallery data={r} />} key={`${index} gallery`}/>
                })}
                <Route path="/kiosk/reiman-gardens" element={<LocationHome data={locations[0]} kioskMode={true}/>} />
                <Route path="/kiosk/reiman-gardens/stats" element={<Stats data={locations[0]} kioskMode={true}/>} />
                <Route path="/kiosk/reiman-gardens/gallery" element={<Gallery data={locations[0]} kioskMode={true}/>} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
                <Route path="masterbutterfly" element={<MasterButterfly/>}/>
                <Route path="/edit/butterfly" element={<EditButterflies/>}/>
                <Route path="/addOrg" element={<AddOrg/>}/>
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
