import React, {useState, useEffect} from 'react';
import Navbar from "../components/navbar";
import Location_card from "../components/locationCard";
import Row from 'react-bootstrap/Row';
import Containter from 'react-bootstrap/Container';
import Footer from "../components/footer";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/landingStyles.css";

export default function Landing({data}){

    const [searchInput, setSearchInput] = useState("");
    const [zipInput, setZip] = useState("");
    const [stateInput, setState] = useState("")
    const [showExtras, setExtras] = useState(false);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const handleZip = (e) => {
        e.preventDefault();
        setZip(e.target.value);
    }
    const handleState = (e) => {
        e.preventDefault();
        setState(e.target.value);
    }
    const toggleTools = () => {
        setExtras(!showExtras);
    }

    return(
        <div class="main-container">
                <Navbar />
                <div id='all-tools'>
                     <div id="landing-header" style={{width: '100%', height: '206px',margin: 'auto', marginTop: '24px'}}>
                        <h1 class="directory-header">Flutr Directory</h1>
                        <h4 class="directory-header">Find butterfly houses from around the world.</h4>
                        <div id='filter-tools' style={{margin: 'auto'}}>
                            <input 
                            style={{width: '90%'}}
                            type="text"
                            placeholder="    Search for organization..."
                            onChange={handleChangeSearch}
                            value={searchInput}
                            id='location-search'
                            className='searches'/>
                            
                        </div>
                    </div>
                </div>
               
                <div style={{width: '85.72%', margin: 'auto'}}>
                    <Containter>
                        {/* <div class="mx-auto" style={{margin: 'auto'}}> */}
                            <Row xs={1} sm={2} md={2} lg={3} >
                                {data.map((r, index) => {
                                    console.log(`${r.name}`)
                                    if(r.name !== null){
                                        if(r.name.toLowerCase().includes(searchInput.toLowerCase())){
                                        return(
                                            <Location_card location={r} index={index}/>
                                        )
                                    }
                                    }
                                    
                                })}
                            </Row>
                        {/* </div> */}
                    </Containter>
                    {/* <RowColLayoutColWidthBreakpointExample/> */}
                    
                </div>
                <Footer />
        </div>
    )
}