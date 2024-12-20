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

    const [extraOne, setExtraOne] = useState();
    const [extraOneFile, setExtraOneFile] = useState();
    const handleExtraOneUpload = (e) => {
      const file = e.target.files[0];
      setExtraOne(URL.createObjectURL(file));
      setExtraOneFile(file);
    }
    const [extraTwo, setExtraTwo] = useState();
    const [extraTwoFile, setExtraTwoFile] = useState();
    const handleExtraTwoUpload = (e) => {
      const file = e.target.files[0];
      setExtraTwo(URL.createObjectURL(file));
      setExtraTwoFile(file);
    }

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
            funFacts: funFacts
          }
          const formdata = new FormData();
          formdata.append('butterfly', new Blob([JSON.stringify(body)], {type: "application/json"}));
          formdata.append('imgWingsOpen', openFile);
          formdata.append('imgWingsClosed', closedFile);
          if(extraOneFile !== undefined){
            formdata.append('extraImg1', extraOneFile);
          }
          if(extraTwoFile !== undefined){
            formdata.append('extraImg2', extraTwoFile);
          }
            const response = await fetch("https://flutr.org:8282/api/master/checkAndAddButterfly",{
                method: 'POST',
                headers: {
                        'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: formdata
            });
            response.json().then(json => {
              if(json.success !== null && json.success){
                window.history.back();
              }
            })
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
      const [longevity, setLongevity] = useState(14);
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
        <div  class="main-container">
            <Navbar/>
            <Row><Col><h3 style={{color: '#469FCE', marginTop:"2%", marginLeft:"6%", marginBottom:"2%"}}>Add Butterfly</h3></Col></Row>
            <div>
                <Container>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Row style={{display: "flex", width: "30%", marginRight: "10%", marginBottom:"2%"}}>
                        <Col style={{ width: '100%', color: '#469FCE'}}>Scientific name: </Col>
                        <Col><input value={scientific} onChange={handleScientific}></input></Col>
                        </Row>
                        <Row style={{display: "flex", width: "30%", marginLeft: "10%", marginBottom:"2%"}}>
                          <Col style={{ width: '100%', color: '#469FCE'}}>Common name: </Col>
                          <Col><input value={common} onChange={handleCommon}></input></Col>
                        </Row>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Row style={{display: "flex", width: "30%", marginRight: "10%", marginBottom:"2%"}}>
                        <Col style={{ width: '100%', color: '#469FCE'}}>Family: </Col>
                        <Col><input value={family} onChange={handleFamily}></input></Col>
                        </Row>
                        <Row style={{display: "flex", width: "30%", marginLeft: "10%", marginBottom:"2%"}}>
                          <Col style={{ width: '100%', color: '#469FCE'}}>Sub-family: </Col>
                          <Col><input value={subFam} onChange={handleSubFam}></input></Col>
                          </Row>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Row style={{display: "flex", width: "30%", marginRight: "10%", marginBottom:"2%"}}>
                        <Col style={{ width: '100%', color: '#469FCE'}}>Longevity: </Col>
                        <Col><input value={longevity} onChange={handleLongevity}></input></Col>
                        </Row>
                        <Row style={{display: "flex", width: "30%", marginLeft: "10%", marginBottom:"2%"}}>
                          <Col style={{ width: '100%', color: '#469FCE'}}>Host plant: </Col>
                          <Col><input value={hostPlant} onChange={handleHostPlant}></input></Col>
                        </Row>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Row style={{display: "flex", width: "30%", marginRight: "10%", marginBottom:"2%"}}>
                        <Col style={{ width: '100%', color: '#469FCE'}}>Habitat: </Col>
                        <Col><input value={habitat} onChange={handleHabitat}></input></Col>
                        </Row>
                        <Row style={{display: "flex", width: "30%", marginLeft: "10%", marginBottom:"2%"}}>
                          <Col style={{ width: '100%', color: '#469FCE'}}>Fun facts: </Col>
                          <Col><input value={funFacts} onChange={handleFacts}></input></Col>
                        </Row>
                    </div>

                    <Row style={{marginBottom:"2%"}}>
                    <Col><h4 style={{color: '#469FCE', marginTop:"2%"}}>Species Range</h4></Col>
                    </Row>
                    <Row style={{marginBottom:"2%"}}>
                        <Col><Checkbox state={naState} setState={setNAState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"18%"}}>North America</Col>
                        <Col><Checkbox state={euState} setState={setEUState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"18%"}}>Europe</Col>
                        <Col><Checkbox state={saState} setState={setSAState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"18%"}}>South/Central America</Col>
                    </Row>
                    <Row style={{marginBottom:"2%"}}>
                        <Col><Checkbox state={ausState} setState={setAUSState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"17%"}}>Australia</Col>
                        <Col><Checkbox state={asiaState} setState={setAsiaState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"17%"}}>Asia</Col>
                        <Col><Checkbox state={afState} setState={setAFState}/></Col>
                        <Col style={{width: '100%' ,color: '#469FCE', marginRight:"19%"}}>Africa</Col>
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
                    <button style={{backgroundColor:"#E1EFFE", border: "2px", borderRadius:"3px", color: "#469FCE", padding: "6px 6px", cursor: "pointer", marginTop:"12px", marginBottom:"8px", marginRight:"8px"}} onClick={handleCancel}>Cancel</button>
                    <button style={{backgroundColor:"#E1EFFE", border: "2px", borderRadius:"3px", color: "#469FCE", padding: "6px 6px", cursor: "pointer", marginTop:"12px", marginBottom:"8px"}} onClick={handleSubmit}>Submit</button>
                    
                </Container>
            </div>
        </div>
    )
}
