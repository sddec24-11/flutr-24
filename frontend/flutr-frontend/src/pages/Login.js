import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import styles from '../styles/formLookStyles.css';
import { Navigate } from "react-router-dom";
import Contact from "./Contact";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import * as jose from 'jose'

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    

    const handleSubmit = async () => {
        try{
            const response = await fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const message = await response.json();
            if(message.error == null){
                window.sessionStorage.setItem("accessKey", "Bearer " + message.payload);
                window.sessionStorage.setItem("authorized", true);
                window.sessionStorage.setItem("houseID", jose.decodeJwt(message.payload).houseId);
                window.sessionStorage.setItem("authorizationLevel", jose.decodeJwt(message.payload).role);
                window.sessionStorage.setItem("subdomain", jose.decodeJwt(message.payload).subdomain);
                window.sessionStorage.setItem("test","test")
                document.location.href = `/${jose.decodeJwt(message.payload).subdomain}`;
            }
            else{
                setError(message.error);
            }

        } catch (error) {
            console.log('Failed to fetch', error);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        document.location.href = "/";
    }

    return(
        <div class="main-container">
            <Navbar />
            <div style={{margin: '8%'}}>
                <div style={{width:'33%', margin: 'auto', border: '4px solid #469FCE', borderRadius: '15px', backgroundColor: '#F5F5F5'}}>
                    <h3 style={{margin: 'auto', paddingLeft:'30%', paddingTop: '7%', color:'#469FCE'}}>Login to Flutr</h3>
                    <div className={styles.formLook} style={{padding:'1%'}}>
                        <Container>
                            <Row><input style={{width: '85%', margin: 'auto', borderRadius: '15px', marginTop: '10px'}} value={username} onChange={handleUsername} placeholder="username"></input></Row>
                            <Row><input style={{width: '85%', margin: 'auto', borderRadius: '15px', marginTop: '10px', marginBottom: '10px'}} type="password" value={password} onChange={handlePassword} placeholder="password"></input></Row>
                            {/* <Row><p>{errorMessage}</p></Row> */}
                            <Row style={{marginTop: '10px', width: '85%', margin: 'auto'}}>
                                <Col ><button onClick={handleCancel} style={{backgroundColor: '#469FCE', padding: '10px 20px'}} className="btn btn-secondary">Cancel</button></Col>
                                <Col ><button onClick={handleSubmit} type="submit" style={{backgroundColor: "#E4976C", padding: '10px 20px'}} className="btn btn-primary">Login</button></Col>
                            </Row>
                        </Container>


                        {/* <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                        <div className="form-group"><input name="username" style={{border: '4px solid #8ABCD7'}} {...register("email", { required: true})} placeholder="username" className="form-control" />
                        {errors.username && <p className="text-danger">Username is required.</p>}</div>
                        
                        <div className="form-group" style={{marginTop: '10px'}}><input type="password" style={{border: '4px solid #8ABCD7'}} name="password" {...register("password", { required: true})} placeholder="password" className="form-control"/>
                        {errors.password && <p className="text-danger">Password is required.</p>}</div>
                        
                        <div className={styles.buttons} style={{marginTop: '15px'}}>
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col ><button onClick={handleCancel} style={{backgroundColor: '#469FCE', padding: '10px 20px'}} className="btn btn-secondary">Cancel</button></Col>
                                    <Col ><button type="submit" style={{backgroundColor: "#E4976C", padding: '10px 20px'}} className="btn btn-primary">Login</button></Col>
                                </Row>
                            </Container>
                        </div>
                    
                </form> */}
            </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}