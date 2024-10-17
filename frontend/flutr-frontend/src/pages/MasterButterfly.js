import Container from "react-bootstrap/esm/Container";
import Navbar from "../components/navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import ImageUploader from "../components/ImageUploader";
import Checkbox from "../components/Checkbox";

export default function MasterButterfly(){
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      const [naState, setNAState] = useState(false);
      const [euState, setEUState] = useState(false);
      const [saState, setSAState] = useState(false);
      const [ausState, setAUSState] = useState(false);
      const [asiaState, setAsiaState] = useState(false);
      const [afState, setAFState] = useState(false);

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
                        <Col><Checkbox state={naState} setState={setNAState}/></Col>
                        <Col>North America</Col>
                        <Col><Checkbox state={euState} setState={setEUState}/></Col>
                        <Col>Europe</Col>
                        <Col><Checkbox state={saState} setState={setSAState}/></Col>
                        <Col>South/Central America</Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col><Checkbox state={ausState} setState={setAUSState}/></Col>
                        <Col>Australia</Col>
                        <Col><Checkbox state={asiaState} setState={setAsiaState}/></Col>
                        <Col>Asia</Col>
                        <Col><Checkbox state={afState} setState={setAFState}/></Col>
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