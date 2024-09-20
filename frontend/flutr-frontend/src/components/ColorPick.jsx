import { HexColorPicker } from "react-colorful";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import React, {useState, useEffect} from 'react'

function ColorPicker({currentColor, setColor}){
    
    const [rVal, setR] = useState(Number("0x"+currentColor[1]+currentColor[2]));
    const [gVal, setG] = useState(Number("0x"+currentColor[3]+currentColor[4]));
    const [bVal, setB] = useState(Number("0x"+currentColor[5]+currentColor[6]));

    const setHexFromRGB = () => {
        let r = rVal.toString(16);
        let g = gVal.toString(16);
        let b = bVal.toString(16);
        if (r.length === 1)
            r = "0" + r;
        if (g.length === 1)
            g = "0" + g;
        if (b.length === 1)
            b = "0" + b;
        setColor("#" + r + g + b);
    }
    const handleHexChange = (e) => {
        e.preventDefault();
        setColor(e.target.value);
    }
    const handleRChange = (e) => {
        e.preventDefault();
        setR(e.target.value);
    }
    const handleGChange = (e) => {
        e.preventDefault();
        setG(e.target.value);
    }
    const handleBChange = (e) => {
        e.preventDefault();
        setB(e.target.value);
        setHexFromRGB();
    }
    

    return(
        <div>
            <HexColorPicker color={currentColor} onChange={setColor} style={{width: '100%'}}/>
            <Container style={{width:'100%'}}>
                <Row>
                    <Col xs={5}>Hex</Col>
                    <Col>R</Col>
                    <Col>G</Col>
                    <Col>B</Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <input
                        style={{width: '99%', borderRadius: '8px'}}
                        type="text"
                        value={currentColor}
                        onChange={handleHexChange}></input>
                    </Col>
                    <Col>
                        <input
                        style={{width: '99%', borderRadius: '8px'}}
                        type="text"
                        value={rVal}
                        onChange={handleRChange}></input>
                    </Col>
                    <Col>
                        <input
                        style={{width: '99%', borderRadius: '8px'}}
                        type="text"
                        value={gVal}
                        onChange={handleGChange}></input>
                    </Col>
                    <Col>
                        <input
                        style={{width: '99%', borderRadius: '8px'}}
                        type="text"
                        value={bVal}
                        onChange={handleBChange}></input>
                    </Col>
                </Row>
            </Container>
            <div style={{backgroundColor: currentColor, width: '100%', height: '30px', borderRadius: '10px'}}>
            </div>
        </div>
    )
}

export default ColorPicker;