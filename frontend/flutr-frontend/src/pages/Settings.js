import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState, useEffect } from 'react';
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "../styles/settingsStyles.css";
import Checkbox from "../components/Checkbox";
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom"
import axios from 'axios';

export default function Settings(){
    const [logo, setLogo] = useState();
    const [logoFile, setLogoFile] = useState();
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        setLogo(URL.createObjectURL(file));
        setLogoFile(file);
    }
    const [facilityImage, setFacilityImage] = useState();
    const [facilityImageFile, setFacilityImageFile] = useState();
    const handleFacilityImageUpload = (e) => {
        const file = e.target.files[0];
        setFacilityImage(URL.createObjectURL(file));
        setFacilityImageFile(file);
    }
    const [newsImage, setNewsImage] = useState();
    const [newsImageFile, setNewsImageFile] = useState();
    const handleNewsImageUpload = (e) => {
        const file = e.target.files[0];
        setNewsImage(URL.createObjectURL(file));
        setNewsImageFile(file);
    }
    const handleNewsImageClear = (e) => {
        e.preventDefault();
        setNewsImage("");
        setNewsImageFile(undefined);
    }
    const [suppliers, setSuppliers] = useState([]);
    const [accounts, setAccounts] = useState([]);



    useEffect(() => {
        const authorizationLevel = window.sessionStorage.getItem("authorizationLevel");
        if (authorizationLevel !== "SUPERUSER" && authorizationLevel !== "ADMIN") {
            alert("Sorry, you can't view this page");
            document.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://206.81.3.155:8282/api/suppliers/view/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey")
                }
            });
            response.json().then(json => {
                console.log(json.payload);
                setSuppliers(json.payload);
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://206.81.3.155:8282/api/users/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey")
                }
            });
            response.json().then(json => {
                console.log(json.payload);
                setAccounts(json.payload);
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://206.81.3.155:8282/api/orgs/view/" + window.sessionStorage.getItem("houseID"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey")
                }
            });
            response.json().then(json => {
                console.log(json);
                setOrgName(json.payload.name);
                setOrgWebsite(json.payload.website);
                setOrgAddress(json.payload.address);
                setLogo(json.payload.logoUrl);
                setFacilityImage(json.payload.facilityImgUrl);
                setInsta(json.payload.socials.instagramActive);
                setOrgInsta(json.payload.socials.instagramLink);
                setFace(json.payload.socials.facebookActive);
                setOrgFacebook(json.payload.socials.facebookLink);
                setX(json.payload.socials.twitterActive);
                setOrgX(json.payload.socials.twitterLink);
                setYT(json.payload.socials.youtubeActive);
                setOrgYouTube(json.payload.socials.youtubeLink);
           
                setPrimaryColor(json.payload.colors[0]);
                setSecondaryColor(json.payload.colors[1]);
                setBackgroundColor(json.payload.colors[2]);

                setBOTD(json.payload.otd.active);
                setStats(json.payload.statsActive);
                setNews(json.payload.news.active);
                setNewsContent(json.payload.news.newsContent);
                setNewsImage(json.payload.news.newsImageUrl);

            })
        }
        fetchData();
        
    }, []);
    const [orgName, setOrgName] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [orgAddress, setOrgAddress] = useState("");

    const [orgInsta, setOrgInsta] = useState("");
    const [orgFaceBook, setOrgFacebook] = useState("");
    const [orgX, setOrgX] = useState("");
    const [orgYouTube, setOrgYouTube] = useState("");

    const [activeTab, setActiveTab] = useState(1);
    const [outerTab, setOuter] = useState(1);

    const handleInfo = (e) => {
        e.preventDefault();
        setActiveTab(1);
        setOuter(1);
    }
    const handleStyles = (e) => {
        e.preventDefault();
        setActiveTab(2);
        setOuter(1);
    }
    const handleHome = (e) => {
        e.preventDefault();
        setActiveTab(3);
        setOuter(1);
    }
    const handleEmployees = (e) => {
        e.preventDefault();
        setActiveTab(4);
        setOuter(2);
    }
    const handleSuppliers = (e) => {
        e.preventDefault();
        setActiveTab(5);
        setOuter(2);
    }

    const [primaryColor, setPrimaryColor] = useState("#E89623");
    const [secondaryColor, setSecondaryColor] = useState("#6e4306");
    const [backgroundColor, setBackgroundColor] = useState("#E89623");

    //Checkboxes
    const [instaState, setInsta] = useState(false);
    const [faceState, setFace] = useState(false);
    const [xState, setX] = useState(false);
    const [ytState, setYT] = useState(false);
    const [botdState, setBOTD] = useState(false);
    const [statsState, setStats] = useState(false);
    const [newsState, setNews] = useState(false);
    const [newsContent, setNewsContent] = useState("");



    const handleSubmit = async () => {
        console.log("Attempting PUT");
        try{
            const formdata = new FormData();
            if(newsImageFile !== undefined){
                formdata.append("newsImageFile", newsImageFile);
            }
            const body = {
                houseId: window.sessionStorage.getItem('houseID'),
                name: orgName,
                address: orgAddress,
                website: orgWebsite,
                logoUrl: logo,
                facilityImgUrl: facilityImage,
                socials: {
                    "instagramActive":instaState,
                    "instagramLink": orgInsta,
                    "facebookActive": faceState,
                    "facebookLink": orgFaceBook,
                    "twitterActive": xState,
                    "twitterLink": orgX,
                    "youtubeActive": ytState,
                    "youtubeLink": orgYouTube,
                },
                colors: [primaryColor, secondaryColor, backgroundColor],
                otd: {
                    active: botdState
                },
                news: {
                    active: newsState,
                    newsContent: newsContent,
                    newsImageUrl: newsImage
                },
                timezone: "CST",
                statsActive: statsState
            }
            console.log(body);
            formdata.append('orgInfo', new Blob([JSON.stringify(body)], {type: "application/json"}));
            if(logoFile !== undefined){
                formdata.append("logoFile", logoFile);
            }
            if(facilityImageFile !== undefined){
                formdata.append("facilityImageFile", facilityImageFile);
            }

            
            for (const [key, value] of formdata.entries()) {
                console.log(key,value);
            }
            // http://206.81.3.155:8282
            const response = await fetch("http://206.81.3.155:8282/api/orgs/edit", {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlformencoded',
                    'Authorization': window.sessionStorage.getItem('accessKey')
                },
                body: formdata,
            });
            response.json().then(json => {
                if(json.payload !== null){
                console.log(json.payload);
                alert("Successfully updated organization!");
                window.location.reload();
            }
            });

        } catch (error) {
            console.log('Failed to fetch', error);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        window.history.back();
    }

    const handlePreview = (e) => {
        e.preventDefault();
        console.log("Preview");
    }

    const handleNameChange = (e) => {
        setOrgName(e.target.value);
    }
    const handleAddressChange = (e) => {
        setOrgAddress(e.taget.value);
    }
    const handleWebsiteChange = (e) => {
        setOrgWebsite(e.target.value);
    }
    const handleInstaChange = (e) => {
        setOrgInsta(e.target.value);
    }
    const handleFacebookChange = (e) => {
        setOrgFacebook(e.target.value);
    }
    const handleXChange = (e) => {
        setOrgX(e.target.value);
    }
    const handleYTChange = (e) => {
        setOrgYouTube(e.target.value);
    }

    const handleNewsContentChange = (e) => {
        setNewsContent(e.target.value);
    }

    const handleNewSupplier = (e) => {
        e.preventDefault();
        window.location.href = "/add/suppliers";
    }
    const handleNewEmployee = (e) => {
        e.preventDefault();
        window.location.href = "/add/employee";
    }

    const [username, setUsername] = useState("");
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = async (username) => {
        try{
            console.log(username);

        } catch(error){
            console.log('Failed to fetch', error);
        }
    }
    const handleDeactivate = async (username) => {
        try{
            const response = await fetch(`http://206.81.3.155:8282/api/users/deactivate/${username}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                }
            })
            response.json().then(json => {
                if(json.success){
                    // console.log(json.payload);
                    window.location.reload();
                }
            })

        } catch(error){
            console.log('Failed to fetch', error);
        }
    }

    const handleReactivate = async (username) => {
        try{
            const response = await fetch(`http://206.81.3.155:8282/api/users/reactivate/${username}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                }
            })
            response.json().then(json => {
                if(json.success){
                    // console.log(json.payload);
                    window.location.reload();
                }
            })

        } catch(error){
            console.log('Failed to fetch', error);
        }
    }

    const handleEmployeeAdd = async () => {
        try{
            const response = await fetch('http://206.81.3.155:8282/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: JSON.stringify({
                    username: username,
                    role: "EMPLOYEE"
                })
            })
            response.json().then(json => {
                if(json.success){
                    window.location.reload();
                }
            });
        } catch(error){
            console.log('Failed to fetch', error);
        }
    }

    return (
        <div class="main-container">
            <Navbar authenticated={window.sessionStorage.getItem("authorizationLevel")}/>
            <div style={{width: "100%", margin: 'auto', height: '50px', height: 'auto', textAlign: 'center'}}>
                <h3 style={{paddingTop: '50px', paddingBottom: '50px', color:'#469FCE'}}>Organization Settings</h3>
            </div>
            <div className="tab-holder">
                <div className="tabs">
                    <div className="tabButtons" onClick={handleInfo} style={{backgroundColor: activeTab === 1? '#469FCE': "#8ABCD7", border: activeTab === 1? '4px solid #469FCE': "4px solid #8ABCD7"}}>Info</div>
                    <div className="tabButtons" onClick={handleStyles} style={{backgroundColor: activeTab === 2? '#469FCE': "#8ABCD7", border: activeTab === 2? '4px solid #469FCE': "4px solid #8ABCD7"}}>Styles</div>
                    <div className="tabButtons" onClick={handleHome} style={{backgroundColor: activeTab === 3? '#469FCE': "#8ABCD7", border: activeTab === 3? '4px solid #469FCE': "4px solid #8ABCD7"}}>Home</div>
                    <div className="tabButtons" onClick={handleEmployees} style={{backgroundColor: activeTab === 4? '#469FCE': "#8ABCD7", border: activeTab === 4? '4px solid #469FCE': "4px solid #8ABCD7"}}>Employees</div>
                    <div className="tabButtons" onClick={handleSuppliers} style={{backgroundColor: activeTab === 5? '#469FCE': "#8ABCD7", border: activeTab === 5? '4px solid #469FCE': "4px solid #8ABCD7"}}>Suppliers</div>
                </div>
            </div>
            
            <div className="content">
                {activeTab === 1 && 
                <div id="info" style={{width: '62%', margin: 'auto'}}>
                    <Container>
                        <Row>
                            <div style={{color: '#469FCE', marginTop: '59px'}}><strong>Organization Information</strong></div>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col xs={3} style={{color: '#469FCE'}}>Organization name:</Col>
                            <Col xs={9}><input value={orgName} onChange={handleNameChange} style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}}></input></Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col xs={3} style={{color: '#469FCE'}}>Organization website: </Col>
                            <Col xs={9}><input value={orgWebsite} onChange={handleWebsiteChange} style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}}></input></Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col xs={3} style={{color: '#469FCE'}}>Organization address: </Col>
                            <Col xs={9}><input value={orgAddress} onChange={handleAddressChange} style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}}></input></Col>
                        </Row>
                        <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Facility image:</Col>
                                <Col xs={4}><div><input type="file" onChange={handleFacilityImageUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                                <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={facilityImage}/></Col>
                        </Row>
                        <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}><div id="label">Logo: <p style={{fontSize: '15px'}}>Please upload a PNG with a transparent background no greater than 250 x 150 pixels.</p></div></Col>
                                <Col xs={4}><div><input type="file" onChange={handleLogoUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                                <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px', backgroundColor: primaryColor}} src={logo}/></Col>
                        </Row>
                        <Row style={{paddingTop: '10px'}}>
                            <Col style={{color: '#469FCE'}}><strong>Social Media Links</strong></Col>
                        </Row>
                        <Row style={{paddingTop: '10px'}}>
                            <Col xs={1}><Checkbox state={instaState} setState={setInsta}/></Col>
                            <Col xs={2} style={{color: '#469FCE'}}>Instagram: </Col>
                            <Col xs={9}><input style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgInsta} onChange={handleInstaChange}></input></Col>
                        </Row>
                        <Row style={{paddingTop: '10px'}}>
                            <Col xs={1}><Checkbox state={faceState} setState={setFace}/></Col>
                            <Col xs={2} style={{color: '#469FCE'}}>Facebook: </Col>
                            <Col xs={9}><input style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgFaceBook} onChange={handleFacebookChange}></input></Col>
                        </Row>
                        <Row style={{paddingTop: '10px'}}>
                            <Col xs={1}><Checkbox state={xState} setState={setX}/></Col>
                            <Col xs={2} style={{color: '#469FCE'}}>X: </Col>
                            <Col xs={9}><input style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgX} onChange={handleXChange}></input></Col>
                        </Row>
                        <Row style={{paddingTop: '10px'}}>
                            <Col xs={1}><Checkbox state={ytState} setState={setYT}/></Col>
                            <Col xs={2} style={{color: '#469FCE'}}>YouTube: </Col>
                            <Col xs={9}><input style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={orgYouTube} onChange={handleYTChange}></input></Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 2 && <div id="styles">
                    <Container>
                    <Row>
                            <Col><h4 style={{color: '#469FCE', marginTop:"8px", marginTop:"2%"}}>Styles</h4></Col>
                        </Row>
                        <Row>
                            <Col style={{color: '#469FCE', marginTop:"1%"}}>Primary Color</Col>
                            <Col style={{color: '#469FCE', marginTop:"1%"}}>Secondary Color</Col>
                            <Col style={{color: '#469FCE', marginTop:"1%"}}>Background Color</Col>

                        </Row>
                        <Row>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px'}} value={primaryColor} onChange={(e) => {setPrimaryColor(e.target.value)}}></input></Col>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px'}} value={secondaryColor} onChange={(e) => {setSecondaryColor(e.target.value)}}></input></Col>
                            <Col><input type="color" style={{width: '100%', height: '200px', borderRadius: '10px' }} value={backgroundColor} onChange={(e) => {setBackgroundColor(e.target.value)}}></input></Col>
                            {/* <Col><ColorPicker currentColor={primaryColor} setColor={setPrimaryColor}/></Col>
                            <Col><ColorPicker currentColor={secondaryColor} setColor={setSecondaryColor}/></Col>
                            <Col><ColorPicker currentColor={backgroundColor} setColor={setBackgroundColor}/></Col> */}
                        </Row>
                    </Container>
                </div>}
                {activeTab === 3 && <div id="home">
                    <Container style={{width: '75%', margin: 'auto', marginTop: '15px'}}>
                        <Row><Col><h4>Panels</h4></Col></Row>
                        <Row style={{marginTop: '10px'}}><Col xs={1}><Checkbox state={botdState} setState={setBOTD}/> </Col><Col>Butterfly of the Day </Col></Row>
                        <Row style={{marginTop: '10px'}}><Col xs={1}><Checkbox state={statsState} setState={setStats}/></Col><Col>Statistics</Col></Row>
                        <Row style={{marginTop: '10px'}}><Col xs={1}><Checkbox state={newsState} setState={setNews}/></Col><Col>News</Col></Row>
                        <Row style={{width: '100%', marginTop: '10px'}}>
                            <Col xs={3} style={{width: '75%'}}><textarea style={{width: '100%', height: '300px', backgroundColor: '#F5F5F5', border: '4px solid #8ABCD7', borderRadius: '10px'}} value={newsContent} onChange={handleNewsContentChange} placeholder="news..."></textarea></Col>
                            <Col xs={3}><div style={{width: '100%', height: '150px'}}><input type="file" onChange={handleNewsImageUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div>
                                <button onClick={handleNewsImageClear}>Remove Image</button>
                                <img style={{width: '100%', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={newsImage}/>
                            </Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 4 &&
                    <div id="shipments-table-container">
                        <table className="paging-table" style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <th style={{width:"20%"}}>Username</th>
                                    <th style={{width:"12%"}}>Role</th>
                                    <th style={{width:"8%"}}>Active?</th>
                                    <th style={{width:"15%"}}>Organization</th>
                                    <th style={{width:"15%"}}></th>
                                    <th style={{width:"10%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((r, index) => (
                                    <tr key={index}>
                                        <td>{r.username}</td>
                                        <td>{r.role}</td>
                                        <td>{(r.active) ? "Yes" : "No"}</td>
                                        <td>{r.houseId}</td>
                                        <td style={{backgroundColor: '#E4976C'}}><div style={{width: '100%', color: "#E1EFFE", textAlign: 'center'}} onClick={() => handlePassword(r.username)}>Reset Password</div></td>
                                        {r.active && <td style={{backgroundColor: '#469FCE'}}><div onClick={() => {handleDeactivate(r.username)}} style={{width: '100%', color: "#E1EFFE", textAlign: 'center'}}>Deactivate</div></td>}
                                        {!(r.active) && <td style={{backgroundColor: '#469FCE'}}><div onClick={() => {handleReactivate(r.username)}} style={{width: '100%', color: "#E1EFFE", textAlign: 'center'}}>Activate</div></td>}

                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}><input style={{width: '100%'}} placeholder="New Employee Username" value={username} onChange={handleUsername}></input></td>
                                    <td colSpan={2}><div style={{width: '100%',backgroundColor: '#469FCE', color: "#E1EFFE", textAlign: 'center'}} onClick={handleEmployeeAdd}>Add New Employee</div></td>
                                </tr>
                            </tbody>
                        </table>
                    
            </div>}
                {activeTab === 5 &&
                <div id="shipments-table-container">
                    <table className="paging-table" style={{width: '100%', borderRadius: "0px 10px 10px 10px"}}>
                        <thead>
                            <tr>
                                <th style={{width:"40%"}}>Full Name</th>
                                <th style={{width:"25%"}}>Abbreviation</th>
                                <th style={{width:"25%"}}>Active?</th>
                                <th style={{width:"15%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((r, index) => (
                                <tr key={index}>
                                    <td>{r.fullName}</td>
                                    <td>{r.abbreviation}</td>
                                    <td>{(r.active) ? "Yes" : "No"}</td>
                                    <td style={{backgroundColor: '#469FCE'}}><Link to="/edit/suppliers" state={r}><div style={{width: '100%', color: "#E1EFFE", textAlign:'center'}}>Edit</div></Link></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4}><div style={{width: '100%', textAlign: 'center', backgroundColor:'#469FCE', color:"#E1EFFE"}} onClick={handleNewSupplier}>Add New Supplier</div></td>
                            </tr>
                        </tbody>
                    </table>
            </div>}
                {outerTab === 1 &&
                <div className="bottomButtons" style={{margin: 'auto', width: '70%', marginTop: '50px', marginBottom: '50px'}}>
                    <button onClick={handleCancel} style={{backgroundColor: '#8ABCD7', color: '#FFFFFF', fontSize: '20px', width: '30%', borderRadius: '15px', height: '50px', border: '0px', marginRight: '5%'}}>Cancel</button>
                    <button onClick={handlePreview} style={{backgroundColor: '#469FCE', color: '#FFFFFF', fontSize: '20px', width: '30%', borderRadius: '15px', height: '50px', border: '0px', marginRight: '5%'}}>Preview</button>
                    <button onClick={handleSubmit} style={{backgroundColor: '#E4976C', color: '#FFFFFF', fontSize: '20px', width: '30%', borderRadius: '15px', height: '50px', border: '0px'}}>Save and Submit</button>
                </div>}
                
                
            </div>
            
        </div>
    )
}