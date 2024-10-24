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

export default function ChangePassword({forced}){
    const onSubmit = data => {
        console.log(data);
        console.log(data.email);
        console.log(data.password);
        let email = data.email;
        let password = data.password;

        fetch("https://f515af77-a75b-4d66-827f-e3c3c2a73793.mock.pstmn.io/auth", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        })
        .then((r) => r.json())
        .then((r) => console.log(r))
        // .then((r) => {
        //     if('success' === r.message) {
        //         Navigate('/')
        //     } else {
        //         console.log("Fail")
        //     }
        // })
export default function ChangePassword({forced}){
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const onSubmit = data => {
        console.log(data);
        console.log(data.email);
        console.log(data.password);
        let email = data.email;
        let password = data.password;

        fetch("https://f515af77-a75b-4d66-827f-e3c3c2a73793.mock.pstmn.io/auth", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        })
        .then((r) => r.json())
        .then((r) => console.log(r))
        // .then((r) => {
        //     if('success' === r.message) {
        //         Navigate('/')
        //     } else {
        //         console.log("Fail")
        //     }
        // })
        
    }

    const handleCancel = (e) => {
        e.preventDefault();
        document.location.href = "/";
    }

    return(
        <div>
            <Navbar />
            <div style={{margin: '8%'}}>
                <div style={{width:'33%', margin: 'auto', border: '4px solid #469FCE', borderRadius: '15px'}}>
                    <h3 style={{margin: 'auto', paddingLeft:'30%', paddingTop: '7%', color:'#469FCE'}}>Login to Flutr</h3>
                    <div className={styles.formLook} style={{padding:'1%'}}>
                        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                        <div className="form-group"><input name="email" style={{border: '4px solid #8ABCD7'}} {...register("email", { required: true, pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message: 'Invalid email address'}})} placeholder="email" className="form-control" />
                        {errors.email && <p className="text-danger">Email is required.</p>}</div>
                        
                        <div className="form-group" style={{marginTop: '10px'}}><input type="password" style={{border: '4px solid #8ABCD7'}} name="password" {...register("password", { required: true})} placeholder="password" className="form-control"/>
                        {errors.password && <p className="text-danger">Password is required.</p>}</div>
                        
                        <div className={styles.buttons} style={{marginTop: '15px'}}>
                            <Container>
                                <Row style={{textAlign: 'center'}}>
                                    <Col><button onClick={handleCancel} style={{backgroundColor: '#469FCE'}} className="btn btn-secondary">Cancel</button></Col>
                                    <Col><button type="submit" style={{backgroundColor: "#E4976C"}} className="btn btn-primary">Login</button></Col>
                                </Row>
                            </Container>
                        </div>
                    
                </form>
            </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}