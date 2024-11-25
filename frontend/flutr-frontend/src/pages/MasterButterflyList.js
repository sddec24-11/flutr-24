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
import {Link} from "react-router-dom";

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
export default function MasterButterflyList(){
    const [searchInput, setSearchInput] = useState("");
    const [showExtras, setExtras] = useState(false);

    const [locationData, setLocationData] = useState({});
    const [butterflies, setButterflies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      if(window.sessionStorage.getItem("authorizationLevel") !== "SUPERUSER"){
          alert("Sorry You Can't View This Page");
          document.location.href = "/login";
      }
  });
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await fetch(`https://flutr.org:8282/api/master/allButterflies`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem("accessKey"),
          },
          });
          response.json().then(json => {
            setButterflies(json.payload);
            setLoaded(true);
          });
        } catch (error) {
          console.error("Failed to fetch butterfly list:", error);
        } finally {
          
        }
        
      };
      fetchData();
  }, []);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const toggleTools = () => {
        setExtras(!showExtras);
    }

    const handleNew = (e) => {
        e.preventDefault();
        window.location.href = "/masterbutterfly/create";
    }

  if(loaded){
    return(
        <div  class="main-container" style={{backgroundColor: "#FFFFFF"}}>
            <PageTitle title={"All Butterflies"}/>
            <Navbar />
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#469FCE"}}><strong>Gallery</strong></h2>
            </div>
            <div style={{borderRadius: '15px', backgroundColor: '#FFFFFF', width: '86%', margin: 'auto', paddingTop: '16px', marginBottom: '16px', marginTop: '16px'}}>
                <Container>
                    <Row xs={1}>
                        <Col style={{width: '33%', margin: 'auto'}}><input style={{width: '100%', borderRadius: '20px'}} onChange={handleChangeSearch} /></Col>
                            <Col><button style={{backgroundColor:"#E1EFFE", border: "2px", borderRadius:"3px", color: "#469FCE", padding: "6px 6px", cursor: "pointer", marginTop:"12px", marginBottom:"8px"}} onClick={handleNew}>Add New Butterfly</button></Col>
                    </Row>
                    <Row xs={1} sm={2} md={3} lg={4}>
                        {butterflies
                        .filter((r) => r.buttId.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((r, index) => {
                            console.log(r);
                            return(
                                <Link to="/masterbutterfly/edit" state={r.buttId}><ButterflyCard index={index} butterfly={r} /></Link>
                            )
                        })}
                    </Row>
                </Container>
            </div>
            <Footer/>
        </div>
    )
                      }
}
