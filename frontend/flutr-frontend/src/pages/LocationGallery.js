import Navbar from "../components/navbar";
import ButterflyCard from "../components/ButterflyCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState, useEffect } from "react";

// const butterflies = [
//     {
//       id: 1,
//       sci_name: "Firsticus Oneth",
//       common_name: "The first one",
//       lifespan: 1,
//       image: "reiman-logo.png",
//     },
//     {
//       id: 3,
//       sci_name: "Triterfly",
//       common_name: "The third one",
//       lifespan: 3,
//       image: "reiman-logo.png",
//     },
//     {
//       id: 2,
//       sci_name: "Biterfly",
//       common_name: "The second one",
//       lifespan: 2,
//       image: "reiman-logo.png",
//     },
//   ];
export default function Gallery({data}){
    const [searchInput, setSearchInput] = useState("");
    const [locationData, setLocationData] = useState({});
    const [butterflies, setButterflies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await fetch(`/api/orgs/${data}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
          },
          });
          response.json().then(json => {
            setLocationData(json.payload);
          });
        } catch (error) {
          console.error("Failed to fetch location:", error);
        } finally {
          setLoading(false);
        }
        
      };
      const fetchButterflies = async () => {
        try{
          const response = await fetch("/api/butterflies/all", {
            method: 'GET',
            headers: {
              'Content-Type': 'applocation/json',
            },
          });
          response.json().then(json => {
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
    if(loaded){
    return(
        <div>
            <Navbar location={locationData} authenticated={window.sessionStorage.getItem("authorizationLevel")}/>
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: locationData.colors[0]}}><strong>Gallery</strong></h2>
            </div>
            <div >
                <Container>
                    <Row>
                        <Col><input onChange={handleChangeSearch}></input></Col>
                    </Row>
                    <Row>
                        {butterflies
                        .filter((r) => r.sci_name.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((r, index) => {
                            <ButterflyCard index={index} butterfly={r} />
                        })}
                    </Row>
                </Container>
            </div>
            <Footer location={locationData} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>

        </div>
    )
                      }
}