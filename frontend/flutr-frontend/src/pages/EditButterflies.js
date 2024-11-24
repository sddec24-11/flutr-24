import Navbar from "../components/navbar";
import ButterflyEditCard from "../components/ButterflyEditCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState, useEffect, useRef} from "react";
import Footer from "../components/footer";

import Switch from "react-switch";


export default function EditButterflies() {
  const [searchInput, setSearchInput] = useState("");
  const [butterflies, setButterflies] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const [alphabetSwitch, setAlphabetSwitch] = useState(false); // false is buttId, true is common name
    const handleAlphabetSwitch = (e) => {
      setAlphabetSwitch(!alphabetSwitch);
    }


  const debounceTimer = useRef(null);
  const pendingUpdates = useRef({});

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

      setIsSaving(true);
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
    setIsSaving(false);
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <input style={{ flex: 1, borderRadius: '20px', margin: '10px 30%'}} type="text" placeholder=" Search" onChange={handleChangeSearch}/>
                      <span style={{ color: 'red' }}>{isSaving && <p>Saving...</p>}</span>
                    </div>
                    </Row>
                    <Row>
                        <Container>
                            <Row>
                              <Col><p>Sort By Scientific Name</p></Col>
                              <Col><Switch onChange={handleAlphabetSwitch} checked={alphabetSwitch}/></Col>
                              <Col><p>Sort By Common Name</p></Col>
                            </Row>
                          </Container>
                    </Row>
                    <Row xs={1} sm={2} md={2} lg={3}>
                      {butterflies
                        .filter((r) => r.buttId.toLowerCase().includes(searchInput.toLowerCase()))
                        .sort((a, b) => (!alphabetSwitch? a.buttId.localeCompare(b.buttId) : a.commonName.localeCompare(b.commonName)))
                        .map((r) => {
                            return (
                              <div key={r.buttId}>
                                <ButterflyEditCard
                                  butterfly={r}
                                  handleUpdate={handleUpdate}
                                />
                              </div>
                            );
                        })}
                    </Row>
                </Container>
                
            </div>
            <Footer/>
    </div>
  );
}