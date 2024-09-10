import React, {useState} from 'react'
import Navbar from "../components/navbar";
import Location_card from "../components/locationCard";
import Row from 'react-bootstrap/Row';
import Footer from "../components/footer";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/landingStyles.css";

export default function Landing({data}){

    const [searchInput, setSearchInput] = useState("");
    const [showExtras, setExtras] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const toggleTools = () => {
        setExtras(!showExtras);
    }

    return(
        <div style={{width: "100%"}}>
                <Navbar />
                <div id='all-tools'>
                     <div id="landing-header" style={{width: '100%', height: '206px',margin: 'auto', marginTop: '24px'}}>
                        <h1 class="directory-header">Flutr Directory</h1>
                        <h4 class="directory-header">Find butterfly houses from around the world.</h4>
                        <div id='filter-tools' style={{margin: 'auto'}}>
                            <input 
                            style={{width: '80%'}}
                            type="text"
                            placeholder="    Search for organization..."
                            onChange={handleChange}
                            value={searchInput}
                            id='location-search'
                            className='searches'/>

                            <Button variant='outline-primary' style={{borderRadius: '228px'}} onClick={toggleTools}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
                                </svg>
                            </Button>

                            
                        </div>
                    </div>
                    {showExtras == true && 
                    <div id='additional-tools'>
                        <h1>Test</h1>
                        <div id='box-holder'>
                            <input 
                                style={{width: '80%'}}
                                type="text"
                                placeholder="    zip code"
                                onChange={handleChange}
                                value={searchInput}
                                id='zip-search'
                                className='searches'/>
                            <input 
                                style={{width: '80%'}}
                                type="text"
                                placeholder="    state"
                                onChange={handleChange}
                                value={searchInput}
                                id='state-search'
                                className='searches'/>
                        </div>
                    </div>
                    }
                </div>
               
                <div style={{width: '80%', margin: 'auto'}}>
                    <div class="mx-auto" style={{margin: 'auto'}}>
                        <Row xs={1} md={3} className="g-4" style={{alignContent: 'center', justifyContent: 'center'}}>
                            {data.map((r, index) => {
                                console.log(`${r.name}`)
                                if(r.name.toLowerCase().includes(searchInput.toLowerCase())){
                                    return(
                                        <Location_card location={r} index={index}/>
                                    )
                                }
                            })}
                        </Row>
                    </div>
                </div>
                <Footer />
        </div>
    )
}