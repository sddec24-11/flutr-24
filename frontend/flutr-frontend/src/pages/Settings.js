import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";


export default function Settings(){
    const [activeTab, setActiveTab] = useState(1);

    const handleInfo = (e) => {
        e.preventDefault();
        setActiveTab(1)
    }
    const handleStyles = (e) => {
        e.preventDefault();
        setActiveTab(2)
    }
    const handleHome = (e) => {
        e.preventDefault();
        setActiveTab(3)
    }

    const [navBarColor, setNavBarColor] = useState("#aabbcc");

    return (
        <div>
            <Navbar />
            <h1>Organization Settings</h1>
            <div className="tabs">
                <div onClick={handleInfo}>Info</div>
                <div onClick={handleStyles}>Styles</div>
                <div onClick={handleHome}>Home</div>
            </div>
            <div className="content">
                {activeTab === 1 && 
                <div id="info">
                    <div>Organization Information</div>
                    <div>Organization name: <input></input></div>
                    <div>Organization website: <input></input></div>
                    <div>Organization address: <input></input></div>
                    <div>
                        <div id="label"></div>
                        <div id="buttons"></div>
                        <div id="viewer"></div>
                    </div>
                    <div>Social Media Links</div>
                    <div><div className="checkbox"></div>Instagram: <input></input></div>
                    <div><div className="checkbox"></div>Facebook: <input></input></div>
                    <div><div className="checkbox"></div>X: <input></input></div>
                    <div><div className="checkbox"></div>YouTube: <input></input></div>
                </div>}
                {activeTab === 2 && <div id="styles">
                    <div><HexColorPicker color={navBarColor} onChange={setNavBarColor} /> <div style={{backgroundColor: navBarColor, width: "30px"}}></div></div>
                    <div></div>
                </div>}
                {activeTab === 3 && <div id="home">Home Tab</div>}
                <div>
                    <button>Cancel</button>
                    <button>Preview</button>
                    <button>Save and Submit</button>
                </div>
                
                
            </div>
        </div>
    )
}