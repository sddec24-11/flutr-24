import { Button } from "bootstrap"
import Navbar from "../components/navbar"
import React, { useState, useEffect } from 'react';
import ColorPicker from "../components/ColorPick";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Checkbox from "../components/Checkbox";
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";

export default function EditSupplier(){
    const location = useLocation();
    const toEdit = location.state;
    useEffect(() => {
        if(window.sessionStorage.getItem("authorizationLevel") !== "ADMIN"){
            alert("Sorry You Can't View This Page");
            document.location.href = "/login";
        }
    });
    const [abbreviation, setAbbreviation] = useState(toEdit.abbreviation);
    const [fullName, setFullName] = useState(toEdit.fullName);
    const [active, setActive] = useState(toEdit.active);

    const handleName = (e) => {
        setFullName(e.target.value);
    }
    const handleAbrev =(e) => {
        setAbbreviation(e.target.value);
    }

    const handleSubmit = async () => {
        try{
            const response = await fetch('http://206.81.3.155:8282/api/suppliers/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey"),
                },
                body: JSON.stringify({
                    fullName: fullName,
                    isActive: active,
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
    return(
        <div>
            <h1>Edit a supplier.</h1>
            <h4>Full Name:</h4>
            <input value={fullName} onChange={handleName}></input>
            <h4>Abbreviation:</h4>
            <input value={abbreviation} onChange={handleAbrev}></input>
            <h4>Active:</h4>
            <Checkbox state={active} setState={setActive}/>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}