import Container from "react-bootstrap/esm/Container";
import Navbar from "../components/navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ImageUploader from "../components/ImageUploader";

export default function MasterButterfly(){
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    

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
                        <Col>Australia</Col>
                        <Col></Col>
                        <Col>Asia</Col>
                        <Col></Col>
                        <Col>Africa</Col>
                    </Row>
                    <Row>
                        <Col>Wings Open</Col>
                        <Col>Wings Closed</Col>
                    </Row>
                    <Row>
                        <Col><ImageUploader/></Col>
                        <Col><ImageUploader/></Col>
                    </Row>
                    <button>Cancel</button>
                    <button>Submit</button>
                    
                </Container>
            </div>
        </div>
    )
}