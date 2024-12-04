import Container from "react-bootstrap/esm/Container";
import Navbar from "../components/navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import ImageUploader from "../components/ImageUploader";
import Checkbox from "../components/Checkbox";
import { useLocation } from "react-router-dom";

export default function MasterButterflyEdit(){
  const [naState, setNAState] = useState(false);
      const [euState, setEUState] = useState(false);
      const [saState, setSAState] = useState(false);
      const [ausState, setAUSState] = useState(false);
      const [asiaState, setAsiaState] = useState(false);
      const [afState, setAFState] = useState(false);

    const [open, setOpen] = useState();
    const [openFile, setOpenFile] = useState();
    const handleOpenUpload = (e) => {
        const file = e.target.files[0];
        setOpen(URL.createObjectURL(file));
        setOpenFile(file);
    }
    const [closed, setClosed] = useState();
    const [closedFile, setClosedFile] = useState();
    const handleClosedUpload = (e) => {
        const file = e.target.files[0];
        setClosed(URL.createObjectURL(file));
        setClosedFile(file);
    }
    const [extraOne, setExtraOne] = useState(null);
    const [extraOneFile, setExtraOneFile] = useState();
    const handleExtraOneUpload = (e) => {
      const file = e.target.files[0];
      setExtraOne(URL.createObjectURL(file));
      setExtraOneFile(file);
    }
    const [extraTwo, setExtraTwo] = useState(null);
    const [extraTwoFile, setExtraTwoFile] = useState();
    const handleExtraTwoUpload = (e) => {
      const file = e.target.files[0];
      setExtraTwo(URL.createObjectURL(file));
      setExtraTwoFile(file);
    }

      const location = useLocation();
      const butterflyToEdit = location.state;
      useEffect(() => {
        if(window.sessionStorage.getItem("authorizationLevel") !== "SUPERUSER"){
            alert("Sorry You Can't View This Page");
            document.location.href = "/login";
        }
    });
      useEffect(() => {
        const fetchData = async () => {
          try{
            const response = await fetch(`https://flutr.org:8282/api/butterflies/fullDetails/${window.sessionStorage.getItem("houseID")}/${butterflyToEdit}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem("accessKey"),
              }
            });
            response.json().then(json => {
              if(json.payload !== null){
                console.log(json.payload);
                setScientific(json.payload.buttId);
                setCommon(json.payload.commonName);
                setFamily(json.payload.family);
                setSubFam(json.payload.subFamily);
                setLongevity(json.payload.lifespan);
                setHostPlant(json.payload.plant);
                setHabitat(json.payload.habitat);
                setFacts(json.payload.funFacts);
                json.payload.range.map((r) => {
                    if(r === "North America"){
                      setNAState(true);
                      console.log("North America");
                    }
                    else if(r === "Europe"){
                      setEUState(true);
                      console.log("Europe");
                    }
                    else if(r === "South America" || r === "Central/South America"){
                      setSAState(true);
                      console.log("Central/South America");
                    }
                    else if(r === "Australia"){
                      setAUSState(true);
                      console.log("Australia");
                    }
                    else if(r === "Asia"){
                      setAsiaState(true);
                      console.log("Asia");
                    }
                    else if(r === "Africa"){
                      setAFState(true);
                      console.log("Africa");
                    }
                  });
                  setClosed(json.payload.imgWingsClosed);
                  setOpen(json.payload.imgWingsOpen);
                  setExtraOne(json.payload.extraImg1);
                  setExtraTwo(json.payload.extraImg2);
                  
              }
            });
            
        
              // response.range.map((r) => {
              //   if(r === "North America"){
              //     setNAState(true);
              //   }
              //   else if(r === "Europe"){
              //     setEUState(true);
              //   }
              //   else if(r === "South America"){
              //     setSAState(true);
              //   }
              //   else if(r === "Australia"){
              //     setAUSState(true);
              //   }
              //   else if(r === "Asia"){
              //     setAsiaState(true);
              //   }
              //   else if(r === "Africa"){
              //     setAFState(true);
              //   }
              // })
          } catch (error) {
            console.error("Failed to fetch butterfly: ", error);
          } finally {

          }
        };
        fetchData();
      }, []);

      const handleSubmit = async () => {
        try{
          const body = {
            buttId: scientific,
            commonName: common,
            family: family,
            subFamily: subFam,
            lifespan: longevity,
            range: [naState ? "North America" : null, euState ? "Europe" : null, saState ? "Central/South America" : null, ausState ? "Australia" : null, asiaState ? "Asia" : null, afState ? "Africa" : null].filter(Boolean),
            plant: hostPlant,
            habitat: habitat,
            funFacts: funFacts,
            imgWingsOpen: open,
            imgWingsClosed: closed,
            extraImg1: extraOne,
            extraImg2: extraTwo,
          }
          const formdata = new FormData();
          formdata.append('butterfly', new Blob([JSON.stringify(body)], {type: "application/json"}));
          if(openFile !== undefined){
            formdata.append('imgWingsOpen', openFile);
          }
          if(closedFile !== undefined){
            formdata.append('imgWingsClosed', closedFile);
          }
          if(extraOneFile !== undefined){
            formdata.append('extraImg1', extraOneFile);
          }
          if(extraTwoFile !== undefined){
            formdata.append('extraImg2', extraTwoFile);
          }
            const response = await fetch("https://flutr.org:8282/api/master/editButterfly",{
                method: 'PUT',
                headers: {
                  'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: formdata
            });
            response.json().then(json => {
              if(json.success !== null && json.success){
                // console.log(json.payload);
                window.history.back();
              }
            })
        } catch (error){
            console.log('Failed to fetch', error);
        }
      }
    
      

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
    return(
        <div class="main-container">
            <Navbar/>
            <h3>Edit Butterfly</h3>
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
                    <Row style={{width: '100%', paddingTop: '10px'}}>
                        <Col xs={3} style={{color: '#469FCE'}}>Wings Open:</Col>
                        <Col xs={4}><div><input type="file" onChange={handleOpenUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                        <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={open}/></Col>
                    </Row>
                    <Row style={{width: '100%', paddingTop: '10px'}}>
                        <Col xs={3} style={{color: '#469FCE'}}><div id="label">Wings Closed:</div></Col>
                        <Col xs={4}><div><input type="file" onChange={handleClosedUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                        <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={closed}/></Col>
                    </Row>
                    <Row style={{width: '100%', paddingTop: '10px'}}>
                        <Col xs={3} style={{color: '#469FCE'}}>Extra Image 1 (Optional):</Col>
                        <Col xs={4}><div><input type="file" onChange={handleExtraOneUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                        <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={extraOne}/></Col>
                    </Row>
                    <Row style={{width: '100%', paddingTop: '10px'}}>
                        <Col xs={3} style={{color: '#469FCE'}}><div id="label">Extra Image 2 (Optional):</div></Col>
                        <Col xs={4}><div><input type="file" onChange={handleExtraTwoUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                        <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={extraTwo}/></Col>
                    </Row>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                    
                </Container>
            </div>
        </div>
    )
}
