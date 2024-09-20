import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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

    const [navBarColor, setNavBarColor] = useState("#E89623");
    const [backgroundColor, setBackgroundColor] = useState("#E89623");
    const [rNavVal, setNavR] = useState(Number("0x"+navBarColor[1]+navBarColor[2]));
    const [gNavVal, setNavG] = useState(Number("0x"+navBarColor[3]+navBarColor[4]));
    const [bNavVal, setNavB] = useState(Number("0x"+navBarColor[5]+navBarColor[6]));

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
                    <Container>
                        <Row>
                            <Col>Navigation bar color</Col>
                            <Col>Background color</Col>
                        </Row>
                        <Row>
                            <Col><ColorPicker currentColor={navBarColor} setColor={setNavBarColor}/></Col>
                            <Col><ColorPicker currentColor={backgroundColor} setColor={setBackgroundColor}/></Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 3 && <div id="home">
                    <h4>Panels</h4>
                    <div><div></div> Butterfly of the Day </div>
                    <div><div></div> Statistics </div>
                    <div><div></div> News </div>
                    <Container>
                        <Row>
                            <Col xs={5}><input placeholder="news..."></input></Col>
                            <Col><div>Upload Image (Optional)</div></Col>
                        </Row>
                    </Container>
                </div>}
                <div>
                    <button>Cancel</button>
                    <button>Preview</button>
                    <button>Save and Submit</button>
                </div>
                
                
            </div>
        </div>
    )
}