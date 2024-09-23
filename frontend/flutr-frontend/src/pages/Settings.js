import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "../styles/settingsStyles.css";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Form");
    }

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("Redirecting (from cancel)...");
    }

    const handlePreview = (e) => {
        e.preventDefault();
        console.log("Preview");
    }

    return (
        <div>
            <Navbar />
            <div style={{width: "100%", margin: 'auto', height: '50px', height: 'auto'}}>
                <h3 style={{paddingTop: '50px', paddingBottom: '50px', color:'#469FCE'}}>Organization Settings</h3>
            </div>
            <div className="tab-holder">
                <div className="tabs">
                    <div className="tabButtons" onClick={handleInfo}>Info</div>
                    <div className="tabButtons" onClick={handleStyles}>Styles</div>
                    <div className="tabButtons" onClick={handleHome}>Home</div>
                </div>
            </div>
            
            <div className="content">
                {activeTab === 1 && 
                <div id="info">
                    <Container>
                        <Row>
                            <div>Organization Information</div>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization name:</Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization website: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization address: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}><div id="label">Logo: <p>Please upload a PNG with a transparent background no greater than 250 x 150 pixels.</p></div></Col>
                            <Col xs={2}><div id="buttons"><button>Upload File</button><button>Remove File</button></div></Col>
                            <Col xs={7}><div id="viewer"></div></Col>
                        </Row>
                        <Row>
                            <Col>Social Media Links</Col>
                        </Row>
                        <Row>
                            <Col xs={1}><div className="checkbox"></div></Col>
                            <Col xs={2}>Instagram: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><div className="checkbox"></div></Col>
                            <Col xs={2}>Facebook: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><div className="checkbox"></div></Col>
                            <Col xs={2}>X: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><div className="checkbox"></div></Col>
                            <Col xs={2}>YouTube: </Col>
                            <Col xs={9}><input></input></Col>
                        </Row>
                    </Container>
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
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handlePreview}>Preview</button>
                    <button onClick={handleSubmit}>Save and Submit</button>
                </div>
                
                
            </div>
        </div>
    )
}