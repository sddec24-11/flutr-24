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
    const [isModalVisible, setIsModalVisible] = useState(false);


    const NotificationModal = ({ isVisible, onClose }) => {
        if (!isVisible) return null;

        const handleSubmit = async () => {
            if(password === repeatPassword){
                try{
                    const response = await fetch("https://flutr.org:8282/api/users/change-password", {
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
                        window.confirm("Success!: Successfully changed password");
                        document.location.href = '/login';
                    }
                    else{
                        setError(message.error);
                        window.alert("Error: Old Password Incorrect");
                        document.location.href = '/changePassword';
                    }
        
                } catch (error) {
                    console.log('Failed to fetch', error);
                }
            }
            else{
                window.alert("Error: Passwords do not match");
            }
            
        }
    
        return (
            <div className='notification-modal'>
                <div className='modal-content'>
                    <h2>Change Password</h2>
                    <p>Are you sure you want to change your password?</p>
                    <button onClick={handleModalCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Confirm</button>
                </div>
            </div>
        );
    };
    
    
    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openModal = () => {
        if(password === repeatPassword){
            setIsModalVisible(true);
        }
        else{
            window.alert("Passwords do not match");
        }
    }


    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    }
    const handleOldPassword = (e) => {
        setOld(e.target.value);   
    }

    const handleModalCancel = (e) => {
        e.preventDefault();
        setIsModalVisible(false);
        //document.location.href = "/changePassword";
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
                                <Col ><button onClick={openModal} type="submit" style={{backgroundColor: "#E4976C", padding: '10px 20px'}} className="btn btn-primary">Confirm</button></Col>
                            </Row>
                        </Container>
            </div>
                </div>
            </div>
            <NotificationModal isVisible={isModalVisible} onClose={closeModal} />
            <Footer />
        </div>
    )
}
