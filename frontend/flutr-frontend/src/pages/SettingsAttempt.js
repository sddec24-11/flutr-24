import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "../styles/settingsStyles.css";
import Checkbox from "../components/Checkbox";
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom"
import axios from 'axios';

export default function SettingsAttempt(){
    const [logo, setLogo] = useState();
    const handleLogoUpload = (e) => {
        console.log(e.target.files);
        setLogo(URL.createObjectURL(e.target.files[0]));
    }
    const [facilityImage, setFacilityImage] = useState();
    const handleFacilityImageUpload = (e) => {
        console.log(e.target.files);
        setFacilityImage(URL.createObjectURL(e.target.files[0]));
    }
    const [suppliers, setSuppliers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const { updateInfo, handleFormSubmit} = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("orgInfo", {});
        formData.append("logoFile");
        formData.append("facilityImageFile",);
    }


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
            // const body = {
            //     houseId: window.sessionStorage.getItem('houseID'),
            //     name: orgName,
            //     address: orgAddress,
            //     website: orgWebsite,
            //     socials: {
            //         "instagramActive":instaState,
            //         "instagramLink": orgInsta,
            //         "facebookActive": faceState,
            //         "facebookLink": orgFaceBook,
            //         "twitterActive": xState,
            //         "twitterLink": orgX,
            //         "youtubeActive": ytState,
            //         "youtubeLink": orgYouTube,
            //     },
            //     colors: [primaryColor, secondaryColor, backgroundColor],
            //     otd: {
            //         active: botdState
            //     },
            //     news: {
            //         active: newsState,
            //         newsContent: newsContent
            //     },
            //     timezone: "CST",
            //     statsActive: statsState
            // }
            const body = {
                houseId: "reiman-gardens",
                name: "Reiman Gardens",
                address: "1407 University Blvd. Ames, IA 50011",
                website: "reiman-gardens",
                socials: {
                    "instagramActive":true,
                    "instagramLink": "https://www.instagram.com/reimangardens/?hl=en",
                    "facebookActive": true,
                    "facebookLink": "https://www.facebook.com/ReimanGardens/",
                    "twitterActive": false,
                    "twitterLink": "",
                    "youtubeActive": false,
                    "youtubeLink": "",
                },
                colors: ["#087648", "#D9E5DC", "#96C09F"],
                otd: {
                    active: true
                },
                news: {
                    active: true,
                    newsContent: "newsContent"
                },
                timezone: "CST",
                statsActive: true
            }
            const formdata = new FormData();
            formdata.append("orgInfo", JSON.stringify(body));
            // formdata.append("logoFile", logo);
            // formdata.append("facilityImageFile", facilityImage);
            
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
                setAccounts(json.payload);}
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
                    <div className="tabButtons" onClick={handleInfo}>Info</div>
                    <div className="tabButtons" onClick={handleStyles}>Styles</div>
                    <div className="tabButtons" onClick={handleHome}>Home</div>
                    <div className="tabButtons" onClick={handleEmployees}>Employees</div>
                    <div className="tabButtons" onClick={handleSuppliers}>Suppliers</div>
                </div>
            </div>
            
            <div className="content">
                {activeTab === 1 && 
                <div id="info" style={{width: '62%', margin: 'auto'}}>
                    <Container>
                        <Row>
                            <div>Organization Information</div>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization name:</Col>
                            <Col xs={9}><input value={orgName} onChange={handleNameChange} style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization website: </Col>
                            <Col xs={9}><input value={orgWebsite} onChange={handleWebsiteChange} style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={3}>Organization address: </Col>
                            <Col xs={9}><input value={orgAddress} onChange={handleAddressChange} style={{width: '100%'}}></input></Col>
                        </Row>
                        <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}>Facility image:</Col>
                                <Col xs={4}><div><input type="file" onChange={handleFacilityImageUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                                <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={facilityImage}/></Col>
                        </Row>
                        <Row style={{width: '100%', paddingTop: '10px'}}>
                                <Col xs={3} style={{color: '#469FCE'}}><div id="label">Logo: <p>Please upload a PNG with a transparent background no greater than 250 x 150 pixels.</p></div></Col>
                                <Col xs={4}><div><input type="file" onChange={handleLogoUpload} style={{width: '100%' ,color: '#469FCE'}}></input></div></Col>
                                <Col xs={4}><img style={{width: '240px', height: '123px', border: '4px solid #8ABCD7', borderRadius: '10px'}} src={logo}/></Col>
                        </Row>
                        <Row>
                            <Col>Social Media Links</Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={instaState} setState={setInsta}/></Col>
                            <Col xs={2}>Instagram: </Col>
                            <Col xs={9}><input style={{width: '100%'}} value={orgInsta} onChange={handleInstaChange}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={faceState} setState={setFace}/></Col>
                            <Col xs={2}>Facebook: </Col>
                            <Col xs={9}><input style={{width: '100%'}} value={orgFaceBook} onChange={handleFacebookChange}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={xState} setState={setX}/></Col>
                            <Col xs={2}>X: </Col>
                            <Col xs={9}><input style={{width: '100%'}} value={orgX} onChange={handleXChange}></input></Col>
                        </Row>
                        <Row>
                            <Col xs={1}><Checkbox state={ytState} setState={setYT}/></Col>
                            <Col xs={2}>YouTube: </Col>
                            <Col xs={9}><input style={{width: '100%'}} value={orgYouTube} onChange={handleYTChange}></input></Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 2 && <div id="styles">
                    <Container>
                        <Row>
                            <Col>Primary Color</Col>
                            <Col>Secondary Color</Col>
                            <Col>Background Color</Col>

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
                    <Container>
                        <Row><Col><h4>Panels</h4></Col></Row>
                        <Row><Col><Checkbox state={botdState} setState={setBOTD}/> </Col><Col>Butterfly of the Day </Col></Row>
                        <Row><Col><Checkbox state={statsState} setState={setStats}/></Col><Col>Statistics</Col></Row>
                        <Row><Col><Checkbox state={newsState} setState={setNews}/></Col><Col>News</Col></Row>
                        <Row>
                            <Col xs={5}><input value={newsContent} onChange={handleNewsContentChange} placeholder="news..."></input></Col>
                            <Col><div>Upload Image (Optional)</div></Col>
                        </Row>
                    </Container>
                </div>}
                {activeTab === 4 &&
                    <div id="employeeList">
                    <Container style={{width: '100%'}}>
                        <Row xs={6}>
                            <Col xs={4}><strong>Username</strong></Col>
                            <Col xs={3}><strong>Role</strong></Col>
                            <Col xs={2}><strong>Active?</strong></Col>
                            <Col xs={2}><strong>Organization</strong></Col>
                            <Col xs={1}></Col>
                        </Row>
                        {accounts.map((r) => {
                            return(
                                <Row style={{border: '1px solid #000000'}}>
                                    <Col xs={4}><h4>{r.username}</h4></Col>
                                    <Col xs={3}><h4>{r.role}</h4></Col>
                                    <Col xs={2}><h4>{(r.active) ? "Yes" : "No"}</h4></Col>
                                    <Col xs={2}><h4>{r.houseId}</h4></Col>
                                    {/* <Col xs={1} style={{backgroundColor: '#E4976C'}}><button onClick={() => {handlePassword(r.username)}} style={{width: '100%'}}>Reset Password</button></Col> */}
                                    <Col xs={1} style={{backgroundColor: '#E4976C'}}><div onClick={() => {handleDeactivate(r.username)}} style={{width: '100%'}}>Deactivate</div></Col>
                                </Row>
                            )
                        })}
                    </Container>
                    <input value={username} onChange={handleUsername}></input>
                    <button onClick={handleEmployeeAdd}>Add New Employee</button>
            </div>}
                {activeTab === 5 &&
                <div id="supplierList">
                    <Container style={{width: '100%'}}>
                        <Row xs={6}>
                            <Col xs={6}><strong>Full Name</strong></Col>
                            <Col xs={3}><strong>Abbreviation</strong></Col>
                            <Col xs={2}><strong>Active?</strong></Col>
                            <Col xs={1}></Col>
                        </Row>
                        {suppliers.map((r) => {
                            return(
                                <Row style={{border: '1px solid #000000'}}>
                                    <Col xs={6}><h4>{r.fullName}</h4></Col>
                                    <Col xs={3}><h4>{r.abbreviation}</h4></Col>
                                    <Col xs={2}><h4>{(r.active) ? "Yes" : "No"}</h4></Col>
                                    <Col xs={1} style={{backgroundColor: '#E4976C'}}><Link to="/edit/suppliers" state={r}><div style={{width: '100%'}}>edit</div></Link></Col>
                                </Row>
                            )
                        })}
                    </Container>
                    <button onClick={handleNewSupplier}>Add New Supplier</button>
            </div>}
                {outerTab === 1 &&
                <div className="bottomButtons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handlePreview}>Preview</button>
                    <button onClick={handleSubmit}>Save and Submit</button>
                </div>}
                
                
            </div>
            
        </div>
    )
}