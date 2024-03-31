import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from "react";
import Landing from './pages/Landing.js';
import Contact from './pages/Contact.js';
import About from './pages/About.js';
import NotFound from './pages/404.js';
import LocationHome from './pages/LocationHome.js';
import Stats from './pages/Stats.js';
import Neato from './pages/neato.js';

const locations = [
    {
        name: 'Reiman Gardens',
        path: 'reiman-gardens',
        logo: 'reiman-logo.png',
        color: '#4ac23a'
    },
    {
        name: 'Butterfly Pavilion',
        path: 'butterfly-pavilion',
        logo: 'reiman-logo.png',
        color: 'rgb(219 234 254)'
    },
    {
        name: 'Thanksgiving Point',
        path: 'thanksgiving-point',
        logo: 'reiman-logo.png',
        color: 'rgb(219 234 254)'
    }
]

export default function App(){
    return (
    <div>
        <BrowserRouter basename=''>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {locations.map((r, index) => (
                    <Route path={"/" + r.path} element={<LocationHome data={r}/>} key={index}/>
                ))}
                {locations.map((r, index) => {
                    return<Route path={"/" + r.path + "/stats"} element={<Stats data={r} />} key={`${index} stat`}/>
                })}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        
    </div>
    )
}