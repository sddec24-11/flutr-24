import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState, useEffect} from "react";
import CustomSlider from "../components/custom.slider";
import { useLocation } from "react-router-dom";


export default function ButterflyGuestView(){
    const location = useLocation();
    const butterflyToLookUp = location.state;
    const [loaded, setLoaded] = useState(false);

    const [butterfly, setButterfly] = useState({});

    useEffect(() => {
        const fetchButterfly = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/butterflies/fullDetails/${butterflyToLookUp.houseId}/${butterflyToLookUp.buttId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              response.json().then(json => {
                console.log(json.payload);
                setButterfly(json.payload);
                setLoaded(true);
                if (json.payload.firstFlownOn === null) {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      firstFlownOn: 'Never flown at this house!',
                      lastFlownOn: 'Never flown at this house!',
                    }));
                  }
                  if (json.payload.plant === null || json.payload.plant === "") {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      plant: 'No current host plants',
                    }));
                  }
                  if (json.payload.range === null || json.payload.range === "") {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      range: 'No set continent range',
                    }));
                  }
                  if (json.payload.funFacts === null || json.payload.funFacts === "") {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      funFacts: 'No current fun facts',
                    }));
                  }
                  if (json.payload.family === null || json.payload.family === "") {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      family: 'Family unknown',
                    }));
                  }
                  if (json.payload.subFamily === null || json.payload.subFamily === "") {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      subFamily: 'Sub-family unknown',
                    }));
                  }
                  if (json.payload.lifespan === 1) {
                    setButterfly((prevButterfly) => ({
                      ...prevButterfly,
                      lifespan: prevButterfly.lifespan + " day",
                    }));
                  }
                  else{
                    setButterfly((prevButterfly) => ({
                        ...prevButterfly,
                        lifespan: prevButterfly.lifespan + " days",
                      }));
                  }
              })
            } catch (error) {
            }
          };
          fetchButterfly();
    },[])

    const images = [
        butterfly.imgWingsOpen,
        butterfly.imgWingsClosed,
        butterfly.extraImg1,
        butterfly.extraImg2,
      ].filter(Boolean); // Filter out null or empty strings

    if(loaded){
    return(
        <div  class="main-container">
            <Navbar/>
            <div>
                <div style={{width:'50%', margin: 'auto', textAlign: 'center'}}>
                    <h2>{butterfly.buttId}</h2>
                    <h2>{butterfly.commonName}</h2>
                </div>
                <div style={{width:'50%', margin: 'auto'}}>
                    <CustomSlider style={{margin: 'auto'}}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Butterfly Image ${index + 1}`} />
                    ))}
                    </CustomSlider>
                </div>
                <Container style={{width: '75%', margin: 'auto', textAlign: 'left', alignContent: 'center'}}>
                    <Row>
                        <Col>
                            <p>{`Family: ${butterfly.family}`}</p>
                        </Col>
                        <Col>
                            <p>{`Estimated Number in Flight: ${butterfly.noInFlight}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{`Sub-family: ${butterfly.subFamily}`}</p>
                        </Col>
                        <Col>
                            <p>{`Total Pupae Recieved: ${butterfly.totalReceived}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{`Estimated Lifespan: ${butterfly.lifespan}`}</p>
                        </Col>
                        <Col>
                            <p>{`First Flown On: ${butterfly.firstFlownOn}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{`Species Range: ${butterfly.range}`}</p>
                        </Col>
                        <Col>
                            <p>{`Last Flown On: ${butterfly.lastFlownOn}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{`Host plants: ${butterfly.plant}`}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{`Fun Facts: ${butterfly.funFacts}`}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </div>
    )
    }
}