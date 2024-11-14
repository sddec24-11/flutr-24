import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import Footer from "../components/footer";
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Checkbox from "../components/Checkbox";
import { useLocation } from "react-router-dom";

export default function AddSupplier(){
    useEffect(() => {
        if(window.sessionStorage.getItem("authorizationLevel") !== "ADMIN"){
            alert("Sorry You Can't View This Page");
            document.location.href = "/login";
        }
    });
    const [abbreviation, setAbbreviation] = useState("");
    const [fullName, setFullName] = useState("");
    const [active, setActive] = useState(true);

    const handleName = (e) => {
        setFullName(e.target.value);
    }
    const handleAbrev =(e) => {
        setAbbreviation(e.target.value);
    }

    const handleSubmit = async () => {
        try{
            const response = await fetch('http://206.81.3.155206.81.3.155/api/suppliers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: JSON.stringify({
                    fullName: fullName,
                    active: active,
                    abbreviation: abbreviation
                })
            })
            response.json().then(json => {
                if(json.success){
                    window.location.href = "/settings";
                }
            });
        } catch(error){
            console.log('Failed to fetch', error);
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        window.history.back();
    }
    return(
        <div>
            <Navbar/>

            <h1 style={{color: '#469FCE', marginTop:"2%", marginLeft:"8%"}}>Add A Supplier</h1>
            <h4 style={{color: '#469FCE', marginTop:"2%", marginLeft:"8%"}}>Full Name:</h4>
            <input style={{marginLeft:"8%"}} value={fullName} onChange={handleName}></input>
            <h4 style={{color: '#469FCE', marginTop:"2%", marginLeft:"8%"}}>Abbreviation:</h4>
            <input style={{marginLeft:"8%"}} value={abbreviation} onChange={handleAbrev}></input>
            <h4 style={{color: '#469FCE', marginTop:"2%", marginLeft:"8%"}}>Active:</h4>
            <Col style={{marginLeft: "8%"}}><Checkbox state={active} setState={setActive}/></Col>
            <button style={{backgroundColor:"#E1EFFE", border: "2px", borderRadius:"3px", color: "#469FCE", padding: "6px 6px", cursor: "pointer", marginTop:"24px", marginBottom:"8px", marginRight:"8px", marginLeft:"8%"}} onClick={handleCancel}>Cancel</button>
            <button style={{backgroundColor:"#E1EFFE", border: "2px", borderRadius:"3px", color: "#469FCE", padding: "6px 6px", cursor: "pointer", marginTop:"24px", marginBottom:"8px"}} onClick={handleSubmit}>Submit</button>
            <Footer/>
        </div>
    )
}