import Container from "react-bootstrap/esm/Container";
import Navbar from "../components/navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import ImageUploader from "../components/ImageUploader";
import Checkbox from "../components/Checkbox";

export default function MasterButterflyCreate(){
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])

      const handleSubmit = async () => {
        try{
            const response = await fetch("http://206.81.3.155:8282/api/master/addButterfly",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: JSON.stringify({
                    buttId: scientific,
                    commonName: common,
                    family: family,
                    subFamily: subFam,
                    lifespan: longevity,
                    range: [("North America" && naState),("Europe" && euState),("South America" && saState), ("Australia" && ausState),("Asia" && asiaState), ("Africa" && afState)],
                    plant: hostPlant,
                    habitat: habitat,
                    funFacts: funFacts,
                }),
            });
        } catch (error){
            console.log('Failed to fetch', error);
        }
      }
    
      const [naState, setNAState] = useState(false);
      const [euState, setEUState] = useState(false);
      const [saState, setSAState] = useState(false);
      const [ausState, setAUSState] = useState(false);
      const [asiaState, setAsiaState] = useState(false);
      const [afState, setAFState] = useState(false);

      const [scientific, setScientific] = useState("");
      const [common, setCommon] = useState("");
      const [family, setFamily] = useState("");
      const [subFam, setSubFam] = useState("");
      const [longevity, setLongevity] = useState(1);
      const [hostPlant, setHostPlant] = useState("");
      const [habitat, setHabitat] = useState("");
      const [funFacts, setFacts] = useState("");

      const handleScientific = (e) => {
        setScientific(e.target.value);
      }
      const handleCommon = (e) => {
        setCommon(e.target.value);
      }
      const handleFamily = (e) => {
        setFamily(e.target.value);
      }
      const handleSubFam = (e) => {
        setSubFam(e.target.value);
      }
      const handleLongevity = (e) => {
        setLongevity(e.target.value);
      }
      const handleHostPlant = (e) => {
        setHostPlant(e.target.value);
      }
      const handleHabitat = (e) => {
        setHabitat(e.target.value);
      }
      const handleFacts = (e) => {
        setFacts(e.target.value);
      }

      const handleCancel = (e) => {
        e.preventDefault();
        window.history.back();
      }
      useEffect(() => {
        if(window.sessionStorage.getItem("authorizationLevel") !== "SUPERUSER"){
            alert("Sorry You Can't View This Page");
            document.location.href = "/login";
        }
    });
    return(
        <div>
            <Navbar/>
            <h3>Add Butterfly</h3>
            <div>
                <Container>
                    <Row>
                        <Col>Scientific name: </Col>
                        <Col><input value={scientific} onChange={handleScientific}></input></Col>
                        <Col>Common name: </Col>
                        <Col><input value={common} onChange={handleCommon}></input></Col>
                    </Row>
                    <Row>
                        <Col>Family: </Col>
                        <Col><input value={family} onChange={handleFamily}></input></Col>
                        <Col>Sub-family: </Col>
                        <Col><input value={subFam} onChange={handleSubFam}></input></Col>
                    </Row>
                    <Row>
                        <Col>Longevity: </Col>
                        <Col><input type="number" min={1} value={longevity} onChange={handleLongevity}></input></Col>
                        <Col>Host plant: </Col>
                        <Col><input value={hostPlant} onChange={handleHostPlant}></input></Col>
                    </Row>
                    <Row>
                        <Col>Habitat: </Col>
                        <Col><input value={habitat} onChange={handleHabitat}></input></Col>
                        <Col>Fun facts:</Col>
                        <Col><input value={funFacts} onChange={handleFacts}></input></Col>
                    </Row>
                    <Row>
                        <Col>Species range:</Col>
                        <Col><Checkbox state={naState} setState={setNAState}/></Col>
                        <Col>North America</Col>
                        <Col><Checkbox state={euState} setState={setEUState}/></Col>
                        <Col>Europe</Col>
                        <Col><Checkbox state={saState} setState={setSAState}/></Col>
                        <Col>South/Central America</Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><Checkbox state={ausState} setState={setAUSState}/></Col>
                        <Col>Australia</Col>
                        <Col><Checkbox state={asiaState} setState={setAsiaState}/></Col>
                        <Col>Asia</Col>
                        <Col><Checkbox state={afState} setState={setAFState}/></Col>
                        <Col>Africa</Col>
                    </Row>
                    <Row>
                        <Col>Wings Open</Col>
                        <Col>Wings Closed</Col>
                    </Row>
                    <Row>
                        <Col><ImageUploader/></Col>
                        <Col><ImageUploader/></Col>
                    </Row>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                    
                </Container>
            </div>
        </div>
    )
}