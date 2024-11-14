import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import styles from '../styles/formLookStyles.css';
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ChangePassword(){
    const [repeatPassword, setRepeatPassword] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setError] = useState("");
    const [oldPassword, setOld] = useState("");

    
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }
    const handleOldPassword = (e) => {
        setOld(e.target.value);   
    }

    const handleSubmit = async () => {
        if(password === repeatPassword){
            try{
                const response = await fetch("http://206.81.3.155:8282/api/users/change-password", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem('accessKey')
                    },
                    body: JSON.stringify({
                        oldPassword: oldPassword,
                        newPassword: password
                    }),
                });
                const message = await response.json();
                if(message.error == null){
                    console.log("Password Changed")
                    document.location.href = '/login';
                }
                else{
                    setError(message.error);
                }
    
            } catch (error) {
                console.log('Failed to fetch', error);
            }
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
                    <h3 style={{margin: 'auto', paddingLeft:'20%', paddingTop: '7%', color:'#469FCE'}}>Change Your Password</h3>
                    <div className={styles.formLook} style={{padding:'1%'}}>
                        <Container>
                            <Row><input style={{width: '85%', margin: 'auto', borderRadius: '15px', marginTop: '10px'}} type="password" value={oldPassword} onChange={handleOldPassword} placeholder="old password"></input></Row>
                            <Row><input style={{width: '85%', margin: 'auto', borderRadius: '15px', marginTop: '10px'}} type="password" value={password} onChange={handlePassword} placeholder="new password"></input></Row>
                            <Row><input style={{width: '85%', margin: 'auto', borderRadius: '15px', marginTop: '10px', marginBottom: '10px'}} type="password" value={repeatPassword} onChange={handleRepeatPassword} placeholder="repeat new password"></input></Row>
                            {/* <Row><p>{errorMessage}</p></Row> */}
                            <Row style={{marginTop: '10px', width: '85%', margin: 'auto'}}>
                                <Col ><button onClick={handleCancel} style={{backgroundColor: '#469FCE', padding: '10px 20px'}} className="btn btn-secondary">Cancel</button></Col>
                                <Col ><button onClick={handleSubmit} type="submit" style={{backgroundColor: "#E4976C", padding: '10px 20px'}} className="btn btn-primary">Confirm</button></Col>
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