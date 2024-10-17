import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ImageUploader from "../components/ImageUploader"


export default function MasterOrgAdd(){
    return(
        <div>
            <Navbar/>
            <h3>Add Organization</h3>
            <div>
                <Container>
                    <Row><Col><strong>Organization Information:</strong></Col></Row>
                    <Row>
                        <Col>Organization name:</Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Organization address:</Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Organization e-mail:</Col>
                        <Col><input></input></Col>
                    </Row>
                    <Row>
                        <Col>Facility Image:</Col>
                        <Col><ImageUploader/></Col>
                    </Row>
                </Container>
                <div>
                    <button>Cancel</button>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}