import { HexColorPicker } from "react-colorful";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import React, {useState, useEffect} from 'react'

function ColorPicker({currentColor, setColor}){
    
    const [rVal, setR] = useState(hexToRgb(currentColor).r);
    const [gVal, setG] = useState(hexToRgb(currentColor).g);
    const [bVal, setB] = useState(hexToRgb(currentColor).b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    const setHexFromRGB = () => {
        setColor(rgbToHex(rVal,gVal,bVal));
    }


    const setRBGFromHex = () => {
        setR(hexToRgb(currentColor.r));
        setG(hexToRgb(currentColor.g));
        setB(hexToRgb(currentColor.b));
    }


    const handleHexChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setColor(e.target.value);
        setRBGFromHex();
    }
    const handleRChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setR(e.target.value);
        setHexFromRGB();
    }
    const handleGChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setG(e.target.value);
        setHexFromRGB();
    }
    const handleBChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
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