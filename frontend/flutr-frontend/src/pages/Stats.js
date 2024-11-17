import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import SocialModal from "../components/SocialModal";
import PageTitle from "../components/PageTitle";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


export default function Stats({data, kioskMode}){
    const [locationData, setLocationData] = useState({});
    const [statData, setStats] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [least, setLeast] = useState({});
    const [most, setMost] = useState({});
    const [families, setFamilies] = useState({});
    const [continents, setContinents] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/orgs/view/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                setLocationData(json.payload);
                setLoaded(true);
              });
            } catch (error) {
              console.error("Failed to fetch location:", error);
            } finally {
              
            }
            
          };
          const fetchStats = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/releases/inflight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setStats(json.payload);
                }
              });
            } catch (error) {
              console.error("Failed to fetch stats:", error);
            } finally {
              
            }
            
          };
          const fetchMost = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/stats/mostInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setMost(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch most stats:", error);
            } finally {
            }
            
          };
          const fetchLeast = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/stats/leastInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setLeast(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch least stats:", error);
            } finally {
            }
            
          };
          const fetchFamilies = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/stats/familyInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setFamilies(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch family stats:", error);
            } finally {
            }
            
          };
          const fetchContinents = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/stats/continentInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setContinents(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch continent stats:", error);
            } finally {
            }
            
          };
        fetchData();
        fetchStats();
        fetchMost();
        fetchLeast();
        // fetchFamilies();
        // fetchContinents();
    }, []);
    const [insta, setInsta] = useState(false);
    const [fb, setFB] = useState(false);
    const [x, setX] = useState(false);
    const [yt, setYT] = useState(false);


  const handleClose = () => {
    setInsta(false);
    setFB(false);
    setX(false);
    setYT(false);
  }
  const handleInsta = () => setInsta(true);
  const handleFB = () => setFB(true);
  const handleX = () => setX(true);
  const handleYT = () => setYT(true);
    const stats = {butterflyCount: 123, speciesCount: 45, highCount: 100, lowCount: 2, highSpecies: "Blue Morpho", lowSpecies: "Dan"}

    if(loaded){
    return(
        <div style={{backgroundColor: locationData.colors[0]}}>
            <Navbar location={locationData} kioskMode={kioskMode}/>
            <PageTitle title={locationData.name + "'s Statistics"}/>
            <SocialModal show={insta} handleClose={handleClose} type={"Instagram"} link={locationData.socials.instagramLink}/>
            <SocialModal show={fb} handleClose={handleClose} type={"Facebook"} link={locationData.socials.facebookLink}/>
            <SocialModal show={x} handleClose={handleClose} type={"X"} link={locationData.socials.twitterLink}/>
            <SocialModal show={yt} handleClose={handleClose} type={"YouTube"} link={locationData.socials.youtubeLink}/>
                <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: locationData.colors[0]}}><strong>Statistics</strong></h2>
                </div>
                <div style={{backgroundColor: "#FFFFFF", borderRadius: "15px", width: "86.45%", margin: 'auto', marginTop: '16px'}}>
                    <Container>
                        <Row>
                            <Col>
                                <div style={{width: '100%', margin: 'auto', textAlign: "center"}}>
                                    <h1 style={{color: locationData.colors[0]}}>{statData.totalInFlight}</h1>
                                    <h4 style={{color: locationData.colors[0]}}>butterflies in flight</h4>
                                </div>
                            </Col>
                            <Col>
                                <div style={{width: '100%', margin:'auto', textAlign: "center"}}>
                                    <h1 style={{color: locationData.colors[0]}}>{statData.speciesInFlight}</h1>
                                    <h4 style={{color: locationData.colors[0]}}>species in flight</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                        <Row>

                        </Row>
                        <Row>
                            <Col><div style={{width: "100%", margin: 'auto', textAlign: 'center'}}><h4>Current Populations</h4></div></Col>
                        </Row>
                        <Row>
                            <Col style={{}}>
                              <div style={{width: '100%',textAlign: "center", margin: 'auto'}}><div style={{width: '61.78%'}}><img></img><p>There are currently {most.buttId} of the {most.noInFlight} currently in flight, making them the most represented species in flight.</p></div></div>
                              {most.imgWingsOpen !== null && <img src={most.imgWingsOpen}/>}
                            </Col>
                            <Col style={{}}>
                              <div style={{width: '100%',textAlign: "center", margin: 'auto'}}><div style={{width: '61.78%'}}><img></img><p>There are only {least.buttId} of the {least.noInFlight} currently in flight. See if you can spot one!</p></div></div>
                              {least.imgWingsOpen !== null && <img src={most.imgWingsOpen}/>}
                            </Col>
                        </Row>
                    </Container>
                    <div style={{width: '100%', margin: 'auto'}}>
                        
                        
                    </div>
                </div>
                <Footer location={locationData} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>
        </div>
    )}
}