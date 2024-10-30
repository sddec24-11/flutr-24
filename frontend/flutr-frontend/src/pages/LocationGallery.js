import Navbar from "../components/navbar";
import ButterflyCard from "../components/ButterflyCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState } from "react";

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
export default function Gallery({data}){
    const [searchInput, setSearchInput] = useState("");

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    return(
        <div>
            <Navbar location={data} authenticated={window.sessionStorage.getItem("authorizationLevel")}/>
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: colorScheme.primary}}><strong>Gallery</strong></h2>
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
        </div>
    )
}