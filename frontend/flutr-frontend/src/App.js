import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import NotFound from "./pages/404.js";
import LocationHome from "./pages/LocationHome.js";
import Stats from "./pages/Stats.js";
import Gallery from "./pages/Gallery.js";
import Login from "./pages/Login.js";
import Shipment from "./pages/Shipment.js";
import OrganizationSettings from "./pages/OrganizationSettings.js";
import Settings from "./pages/Settings.js";

import Shipments from './pages/Shipments.js';

const locations = [
  {
    name: "Reiman Gardens",
    path: "reiman-gardens",
    logo: "reiman-logo.png",
    image: "reiman-thumb.avif",
    address: "1407 University Blvd. Ames, IA 50011",
    color: "#22c55e",
  },
  {
    name: "Butterfly Pavilion",
    path: "butterfly-pavilion",
    logo: "bp-logo.svg",
    image: "reiman-thumb.avif",
    address: "6525  W 104th Ave. Westminster, CO 80020",
    color: "#9F2A2A",
  },
  {
    name: "Thanksgiving Point",
    path: "thanksgiving-point",
    logo: "tp-logo.webp",
    image: "reiman-thumb.avif",
    address: "3003 N Thanksgiving Way Lehi, UT 84043",
    color: "#397fc2",
  },
  {
    name: "Ames, Iowa",
    path: "city-of-ames",
    logo: "isu_logo.png",
    image: "reiman-thumb.avif",
    address: "Ames, IA 50014",
    color: "#9F2A2A",
  },
  {
    name: "Demo",
    path: "demo1",
    logo: "isu_logo.png",
    image: "reiman-thumb.avif",
    address: "somehwer",
    color: "#9F2A00",
  },
];

export default function App() {
  return (
    <div>
        <BrowserRouter basename=''>
            <Routes>
                <Route index element={<Landing data={locations} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                <Route path="/shipments" element={<Shipments />} />

                {locations.map((r, index) => (
                    <Route path={"/" + r.path} element={<LocationHome data={r}/>} key={index}/>
                ))}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.path + "/stats"} element={<Stats data={r} />} key={`${index} stat`}/>
                })}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.path + "/gallery"} element={<Gallery data={r} />} key={`${index} gallery`}/>
                })}
                <Route path="settings" element={<OrganizationSettings />} />
                <Route path="settingss" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}
