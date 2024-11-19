import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BOTD from "../components/BOTD";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import News from "../components/News";
import PageTitle from "../components/PageTitle";
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import SocialModal from "../components/SocialModal";


const butterfly = {
    common_name: "Common Name",
    sci_name: "Scientific Name",
    fun_fact: "Something fun",
    coo: ["Bermuda","Jamaica"]
}


const stats = {butterflyCount: 123, speciesCount: 45}



export default function LocationHome({data, kioskMode}){
    const [insta, setInsta] = useState(false);
    const [fb, setFB] = useState(false);
    const [x, setX] = useState(false);
    const [yt, setYT] = useState(false);

    const [locationData, setLocationData] = useState({});
    const [botdData, setBotdData] = useState({});
    const [statData, setStats] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [butterflies, setButterflies] = useState({});
    const [successfulBOTD, setBOTDSuccess] = useState(false);
    
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
        const fetchBOTD = async () => {
          console.log("Trying BOTD Fetch");
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/releases/botd/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              console.log("Trying BOTD Fetch 2");
              response.json().then(json => {
                console.log("Trying BOTD Fetch 3");
                if(json.success){
                  console.log("Trying BOTD Fetch Success");
                    setBotdData(json.payload);
                    setBOTDSuccess(true);
                }
              });
            } catch (error) {
              console.error("Failed to fetch botd:", error);
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
          const fetchButterflies = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/butterflies/details/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              response.json().then(json => {
                console.log(json.payload);
                setButterflies(json.payload);
              })
            } catch (error) {
    
            }
          };
        fetchData();
        fetchBOTD();
        fetchStats();
        // fetchButterflies();
    }, []);

    const handleStats = (e) => {
        e.preventDefault();
        document.location.href = `/${locationData.website}/stats`;
    }

    const handleGallery = (e) => {
        e.preventDefault();
        document.location.href = `/${locationData.website}/gallery`;
    }


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
  if(loaded){
    return(
        <div style={{backgroundColor: locationData.colors[2]}}>
            <PageTitle title={locationData.name + "'s Home"}/>
            <SocialModal show={insta} handleClose={handleClose} type={"Instagram"} link={locationData.socials.instagramLink}/>
            <SocialModal show={fb} handleClose={handleClose} type={"Facebook"} link={locationData.socials.facebookLink}/>
            <SocialModal show={x} handleClose={handleClose} type={"X"} link={locationData.socials.twitterLink}/>
            <SocialModal show={yt} handleClose={handleClose} type={"YouTube"} link={locationData.socials.youtubeLink}/>
            <Navbar location={locationData} kioskMode={kioskMode} authenticated={window.sessionStorage.getItem("authorizationLevel")}/>
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: locationData.colors[0]}}><strong>{locationData.name}</strong></h2>
            </div>
            <div style={{width: "90%", margin: "auto"}}>
                <Container>
                    <Row xs={1} sm={2} md={2}>
                        {(locationData.otd.active && successfulBOTD) &&
                        <Col style={{paddingTop: '16px'}}><BOTD butterfly={botdData} colorScheme={locationData.colors} buttonFunction={handleGallery}/></Col>}
                        <Col style={{paddingTop: '16px'}}>
                            <div>
                                {locationData.news.active && <News colorScheme={locationData.colors} content={locationData.news.newsContent} image={locationData.news.newsImageUrl}/>}
                                {locationData.statsActive && 
                                <div style={{borderRadius: '10px', backgroundColor: '#FFFFFF', textAlign: 'center', marginBottom: '16px'}}>
                                    <h3 style={{color: locationData.colors[0], paddingTop: '16px', paddingBottom: '16px'}}>Statistics</h3>
                                    <div style={{backgroundColor: locationData.colors[1], width: '75%', margin: 'auto'}}>
                                        <h1 style={{color: locationData.colors[0], fontSize: '150px'}}>{statData.totalInFlight}</h1>
                                        <h4 style={{color: locationData.colors[0], fontSize: '28px'}}>butterflies in flight</h4>
                                        <h1 style={{color: locationData.colors[0], fontSize: '150px'}}>{statData.speciesInFlight}</h1>
                                        <h4 style={{color: locationData.colors[0], fontSize: '28px', paddingBottom: '10px'}}>species in flight</h4>
                                    </div>
                                    <div>
                                        <button onClick={handleStats} style={{backgroundColor: locationData.colors[0], color: "#FFFFFF", width: '25%', paddingTop:'15px', paddingBottom: '15px', borderRadius: '15px', marginTop: '15px', marginBottom: '15px'}}>See More</button>
                                    </div>
                                </div> }
                            </div>
                        </Col> 
                    </Row>
                </Container>
            </div>
            <Footer location={locationData} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>
        </div>
    )
                                }
                                else{
                                    return(<div>Loading location data...</div>)
                                }
}