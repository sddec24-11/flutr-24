import Navbar from "../components/navbar";
import ButterflyEditCard from "../components/ButterflyEditCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/esm/Button";
import Footer from "../components/footer";


export default function EditButterflies() {
  const [searchInput, setSearchInput] = useState("");
  const [butterflies, setButterflies] = useState([]);
  const [showExtras, setExtras] = useState(false);


  const debounceTimer = useRef(null);
  const pendingUpdates = useRef({});

  const toggleTools = () => {
    setExtras(!showExtras);
}
useEffect(() => {
  const fetchButterflies = async () => {
    try{
      const response = await fetch(`http://206.81.3.155:8282/api/butterflies/details/${window.sessionStorage.getItem("houseID")}`, {
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
      console.error(error);
    }
  };
  fetchButterflies();
}, []);

  // Updates the change list with new values when a butterfly is edited
 const handleUpdate = (buttId, updatedValues) => {
  setButterflies((prevButterflies) => 
    prevButterflies.map((butterfly) =>
      butterfly.buttId === buttId ? {...butterfly, ...updatedValues} : butterfly
      )
      );

  
    // Store pending updates to apply when debounce ends
    pendingUpdates.current[buttId] = updatedValues;
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      // Perform the PUT request with the latest updates
      Object.keys(pendingUpdates.current).forEach(id => {
        updateButterflyServer(id, pendingUpdates.current[id]);
      });
      pendingUpdates.current = {};
    }, 1000); // 1 second delay
 };

 const updateButterflyServer = async (buttId, updatedValues) => {
  try {
    const body = JSON.stringify({buttId: buttId,...updatedValues});
    console.log(body);
    await fetch(`http://206.81.3.155:8282/api/butterflies/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": window.sessionStorage.getItem("accessKey")
      },
      body: body,
    });
    console.log(`Butterfly with ID ${buttId} updated successfully.`);
  } catch (error) {
    console.error("Error updating butterfly:", error);
  }
};

  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ensure any pending updates are made
      Object.keys(pendingUpdates.current).forEach(id => {
        updateButterflyServer(id, pendingUpdates.current[id]);
      });
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  

  return (
    <div  class="main-container">
      <Navbar />
      <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#8ABCD7'}}><strong>Edit Butterflies</strong></h2>
            </div>
            <div style={{borderRadius: '15px', backgroundColor: '#FFFFFF', width: '86%', margin: 'auto', paddingTop: '16px', marginBottom: '16px', marginTop: '16px', border: '4px solid #8ABCD7', borderRadius: '15px'}}>
                <Container>
                    <Row xs={1}>
                        <Col style={{width: '33%', margin: 'auto'}}><input style={{width: '85%', borderRadius: '20px'}} onChange={handleChangeSearch}></input><Button id="extrasButton" variant='outline-primary' style={{borderRadius: '228px'}} onClick={toggleTools}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                    <Row xs={1} sm={2} md={2} lg={3}>
                      {butterflies
                        .filter((r) => r.buttId.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((r) => {
                            return (
                              <div key={r.buttId}>
                                <ButterflyEditCard
                                  butterfly={r}
                                  handleUpdate={handleUpdate}
                                />
                              </div>
                            );
                          return null;
                          
})}
                    </Row>
                </Container>
                
            </div>
            <Footer/>
    </div>
  );
}