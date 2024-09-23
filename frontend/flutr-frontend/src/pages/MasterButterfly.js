import Container from "react-bootstrap/esm/Container";
import Navbar from "../components/navbar";

export default function MasterButterfly(){
    return(
        <div>
            <Navbar/>
            <h3>Edit Butterfly</h3>
            <div>
                <Container>
                    <Row>
                        <Col>Scientific name: </Col>
                        <Col><input></input></Col>
                        <Col>Common name: </Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Family: </Col>
                        <Col><input></input></Col>
                        <Col>Sub-family: </Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Longevity: </Col>
                        <Col><input></input></Col>
                        <Col>Host plant: </Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Habitat: </Col>
                        <Col><input></input></Col>
                        <Col>Fun facts:</Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Species range:</Col>
                        <Col></Col>
                        <Col>North America</Col>
                        <Col></Col>
                        <Col>Europe</Col>
                        <Col></Col>
                        <Col>South/Central America</Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>Ausstralia</Col>
                        <Col></Col>
                        <Col>Asia</Col>
                        <Col></Col>
                        <Col>Africa</Col>
                    </Row>
                    
                </Container>
            </div>
        </div>
    )
}