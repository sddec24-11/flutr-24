import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import Footer from "../components/footer";
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Checkbox from "../components/Checkbox";
import { useLocation } from "react-router-dom";

export default function EditSupplier(){
    const location = useLocation();
    const toEdit = location.state;
    useEffect(() => {
        if(window.sessionStorage.getItem("authorizationLevel") !== "ADMIN"){
            alert("Sorry You Can't View This Page");
            document.location.href = "/login";
        }
    }, []);
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState(false);
    const [abbreviation, setAbbreviation] = useState("");
    const [fullName, setFullName] = useState("");
    
    useEffect(() => {
        console.log(toEdit.active);
        setActive(toEdit.active);
        setAbbreviation(toEdit.abbreviation);
        setFullName(toEdit.fullName);
        setLoaded(true);
    }, []);

    const handleName = (e) => {
        setFullName(e.target.value);
    }
    const handleAbrev =(e) => {
        setAbbreviation(e.target.value);
    }

    const handleSubmit = async () => {
        try{
            console.log("Reporting it is : " + active);
            const response = await fetch('http://206.81.3.155/api/suppliers/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: JSON.stringify({
                    fullName: fullName,
                    active: active,
                    newAbbreviation: abbreviation,
                    oldAbbreviation: toEdit.abbreviation
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
    if(loaded){
    return(
        <div>
            <Navbar/>

            <h1>Edit a supplier.</h1>
            <h4>Full Name:</h4>
            <input value={fullName} onChange={handleName}></input>
            <h4>Abbreviation:</h4>
            <input value={abbreviation} onChange={handleAbrev}></input>
            <h4>Active:</h4>
            <Checkbox state={active} setState={setActive}/>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
            <Footer/>
        </div>
    )}
}