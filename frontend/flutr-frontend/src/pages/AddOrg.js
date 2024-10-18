import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, {useState} from "react";

export default function AddOrg(){
    const [orgName, setOrgName] = useState();
    const [orgAddress, setOrgAddress] = useState();
    const [orgEmail, setOrgEmail] = useState();
    const [file, setFile] = useState();
    const handleUpload = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
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
        document.location.href = `/`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
        <div>
            <Navbar/>
            <div>
                <div style={{width: "100%", margin: 'auto', height: '50px', height: 'auto', textAlign: 'center'}}>
                    <h3 style={{paddingTop: '50px', paddingBottom: '50px', color:'#469FCE'}}>Organization Settings</h3>
                </div>
                <div style={{width: '80%', margin: 'auto', border: '4px solid #8ABCD7', borderRadius: '15px',marginBottom: '16px'}}>
                    <div style={{width: '70%', margin: 'auto', marginTop: '26px', marginBottom: '16px'}}>
                        <h4  style={{color: '#469FCE'}}><strong>Organization Information:</strong></h4>
                        <Container style={{width: '100%'}}>
                            <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Organization name:</Col>
                                <Col xs={8}><input style={{width: '100%', backgroundColor: '#F5F5F5', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgName} onChange={handleName}></input></Col>
                            </Row>
                            <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Organization address:</Col>
                                <Col xs={8}><input style={{width: '100%', backgroundColor: '#F5F5F5', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgAddress} onChange={handleAddress}></input></Col>
                            </Row>
                            <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Organization e-mail:</Col>
                                <Col xs={8}><input style={{width: '100%', backgroundColor: '#F5F5F5', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgEmail} onChange={handleEmail}></input></Col>
                            </Row>
                            <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Facility image:</Col>
                                <Col xs={4}><div><input type="file" onChange={handleUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                                <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={file}/></Col>
                            </Row>
                            <Row style={{paddingTop: '10px'}}>
                                <Col><button style={{width: '100%',height: '55px',color:"#FFFFFF", border: '0px', backgroundColor: '#469FCE', borderRadius: '15px'}} onClick={handleCancel}>Cancel</button></Col>
                                <Col><button style={{width: '100%',height: '55px',color:"#FFFFFF", border: '0px', backgroundColor: '#E4976C', borderRadius: '15px'}} onClick={handleSubmit}>Submit</button></Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}