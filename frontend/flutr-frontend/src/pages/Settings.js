import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState } from 'react';
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "../styles/settingsStyles.css";
import Checkbox from "../components/Checkbox";

export default function Settings(){
    const [activeTab, setActiveTab] = useState(1);

    const handleInfo = (e) => {
        e.preventDefault();
        setActiveTab(1);
    }
    const handleStyles = (e) => {
        e.preventDefault();
        setActiveTab(2);
    }
    const handleHome = (e) => {
        e.preventDefault();
        setActiveTab(3);
    }
    const handleEmployees = (e) => {
        e.preventDefault();
        setActiveTab(4);
    }
    const handleSuppliers = (e) => {
        e.preventDefault();
        setActiveTab(5);
    }

    const [primaryColor, setPrimaryColor] = useState("#E89623");
    const [secondaryColor, setSecondaryColor] = useState("#6e4306");
    const [backgroundColor, setBackgroundColor] = useState("#E89623");

    //Checkboxes
    const [instaState, setInsta] = useState(false);
    const [faceState, setFace] = useState(false);
    const [xState, setX] = useState(false);
    const [ytState, setYT] = useState(false);
    const [botdState, setBOTD] = useState(false);
    const [statsState, setStats] = useState(false);
    const [newsState, setNews] = useState(false);



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
            <Navbar authenticated={true}/>
            <div style={{width: "100%", margin: 'auto', height: '50px', height: 'auto', textAlign: 'center'}}>
                <h3 style={{paddingTop: '50px', paddingBottom: '50px', color:'#469FCE'}}>Organization Settings</h3>
            </div>
            <div className="tab-holder">
                <div className="tabs">
                    <div className="tabButtons" onClick={handleInfo}>Info</div>
                    <div className="tabButtons" onClick={handleStyles}>Styles</div>
                    <div className="tabButtons" onClick={handleHome}>Home</div>
                    <div className="tabButtons" onClick={handleEmployees}>Employees</div>
                    <div className="tabButtons" onClick={handleSuppliers}>Suppliers</div>
                </div>
            </div>
            
            <div className="content">
                {activeTab === 1 && 
                <div id="info" style={{width: '62%', margin: 'auto'}}>
                    <Container>
                        <Row>
                            <div>Organization Information</div>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization name:</Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization website: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization address: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}><div id="label">Logo: <p>Please upload a PNG with a transparent background no greater than 250 x 150 pixels.</p></div></Col>
                            <Col xs={2}><div id="buttons" style={{margin: 'auto', textAlign: 'center'}}><button style={{borderRadius: '10px', backgroundColor: '#469FCE'}}>Upload File</button><button style={{borderRadius: '10px', backgroundColor: '#E4976C'}}>Remove File</button></div></Col>
                            <Col xs={7}><div id="viewer" style={{width: '250px', height: '150px', borderRadius: '10px', border: '4px solid #8ABCD7', margin: 'auto'}}></div></Col>
                        </Row>
                        <Row>
                            <Col>Social Media Links</Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={instaState} setState={setInsta}/></Col>
                            <Col xs={2}>Instagram: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={faceState} setState={setFace}/></Col>
                            <Col xs={2}>Facebook: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={xState} setState={setX}/></Col>
                            <Col xs={2}>X: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={ytState} setState={setYT}/></Col>
                            <Col xs={2}>YouTube: </Col>
                            <Col xs={9}><input style={{width: '100%'}}></input></Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 2 && <div id="styles">
                    <Container>
                        <Row>
                            <Col>Primary Color</Col>
                            <Col>Secondary Color</Col>
                            <Col>Background Color</Col>

                        </Row>
                        <Row>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px'}} value={primaryColor} onChange={(e) => {setPrimaryColor(e.target.value)}}></input></Col>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px'}} value={secondaryColor} onChange={(e) => {setSecondaryColor(e.target.value)}}></input></Col>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px' }} value={backgroundColor} onChange={(e) => {setBackgroundColor(e.target.value)}}></input></Col>
                            {/* <Col><ColorPicker currentColor={primaryColor} setColor={setPrimaryColor}/></Col>
                            <Col><ColorPicker currentColor={secondaryColor} setColor={setSecondaryColor}/></Col>
                            <Col><ColorPicker currentColor={backgroundColor} setColor={setBackgroundColor}/></Col> */}
                        </Row>
                    </Container>
                </div>}
                {activeTab === 3 && <div id="home">
                    <Container>
                        <Row><Col><h4>Panels</h4></Col></Row>
                        <Row><Col><Checkbox state={botdState} setState={setBOTD}/> </Col><Col>Butterfly of the Day </Col></Row>
                        <Row><Col><Checkbox state={statsState} setState={setStats}/></Col><Col>Statistics</Col></Row>
                        <Row><Col><Checkbox state={newsState} setState={setNews}/></Col><Col>News</Col></Row>
                        <Row>
                            <Col xs={5}><input placeholder="news..."></input></Col>
                            <Col><div>Upload Image (Optional)</div></Col>
                        </Row>
                    </Container>
                </div>}
                <div className="bottomButtons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handlePreview}>Preview</button>
                    <button onClick={handleSubmit}>Save and Submit</button>
                </div>
                
                
            </div>
        </div>
    )
}