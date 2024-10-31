import Navbar from "../components/navbar";
import ButterflyCard from "../components/ButterflyCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import PageTitle from "../components/PageTitle";
import Footer from "../components/footer";
import SocialModal from "../components/SocialModal";
import {Link} from "react-router-dom"



const butterflies = [
    {
      id: 1,
      sci_name: "Firsticus Oneth",
      common_name: "The first one",
      lifespan: 1,
      image: "reiman-logo.png",
    },
    {
      id: 3,
      sci_name: "Triterfly",
      common_name: "The third one",
      lifespan: 3,
      image: "reiman-logo.png",
    },
    {
      id: 2,
      sci_name: "Biterfly",
      common_name: "The second one",
      lifespan: 2,
      image: "reiman-logo.png",
    },
  ];
export default function Gallery({data, kioskMode}){
    const [searchInput, setSearchInput] = useState("");
    const [showExtras, setExtras] = useState(false);

    const [locationData, setLocationData] = useState({});
    const [butterflies, setButterflies] = useState([]);
    const [loaded, setLoaded] = useState(false);
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
      fetchButterflies();
  }, []);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const toggleTools = () => {
        setExtras(!showExtras);
    }

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
  if(loaded){
    return(
        <div style={{backgroundColor: locationData.colors[2]}}>
            <PageTitle title={locationData.name + "'s Gallery"}/>
            <SocialModal show={insta} handleClose={handleClose} type={"Instagram"} link={locationData.socials.instagramLink}/>
            <SocialModal show={fb} handleClose={handleClose} type={"Facebook"} link={locationData.socials.facebookLink}/>
            <SocialModal show={x} handleClose={handleClose} type={"X"} link={locationData.socials.twitterLink}/>
            <SocialModal show={yt} handleClose={handleClose} type={"YouTube"} link={locationData.socials.youtubeLink}/>
            <Navbar location={locationData} authenticated={window.sessionStorage.getItem("authorizationLevel")} kioskMode={kioskMode}/>
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: locationData.colors[0]}}><strong>Gallery</strong></h2>
            </div>
            <div style={{borderRadius: '15px', backgroundColor: '#FFFFFF', width: '86%', margin: 'auto', paddingTop: '16px', marginBottom: '16px', marginTop: '16px'}}>
                <Container>
                    <Row xs={1}>
                        <Col style={{width: '33%', margin: 'auto'}}><input style={{width: '85%', borderRadius: '20px'}} onChange={handleChangeSearch}></input><Button id="extrasButton" variant='outline-primary' style={{borderRadius: '228px'}} onClick={toggleTools}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
                                </svg>
                            </Button></Col>
                    </Row>
                    <Row xs={1} sm={2} md={3} lg={4}>
                        {butterflies
                        .filter((r) => r.buttId.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((r, index) => {
                            return(
                                <Link to="/butterfly/view" state={{houseId: data, buttId: r.buttId}}><ButterflyCard index={index} butterfly={r} /></Link>
                            )
                        })}
                    </Row>
                </Container>
            </div>
            <Footer location={locationData} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>
        </div>
    )
                      }
}