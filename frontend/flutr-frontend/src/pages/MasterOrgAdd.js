import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ImageUploader from "../components/ImageUploader"
import { useState } from "react"


export default function MasterOrgAdd(){
    const [orgName, setOrgName] = useState("");
    const [orgAddress, setOrgAddress] = useState("");
    const [orgEmail, setOrgEmail] = useState("");

    const handleName = (e) => {
        setOrgName(e.target.value);
    }
    const handleAddress = (e) => {
        setOrgAddress(e.target.value);
    }
    const handleEmail = (e) => {
        setOrgEmail(e.target.value);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.back();
    }

    const handleSubmit = (e) => {
        if(orgName !== "" && orgAddress !== "" && orgEmail !== ""){

        }
    }


    return(
        <div>
            <Navbar/>
            <h3>Add Organization</h3>
            <div>
                <Container>
                    <Row><Col><strong>Organization Information:</strong></Col></Row>
                    <Row>
                        <Col>Organization name:</Col>
                        <Col><input onChange={handleName} value={orgName}></input></Col>
                    </Row>
                    <Row>
                        <Col>Organization address:</Col>
                        <Col><input onChange={handleAddress} value={orgAddress}></input></Col>
                    </Row>
                    <Row>
                        <Col>Organization e-mail:</Col>
                        <Col><input onChange={handleEmail} value={orgEmail}></input></Col>
                    </Row>
                    <Row>
                        <Col>Facility Image:</Col>
                        <Col></Col>
                    </Row>
                </Container>
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}