import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import styles from '../styles/formLookStyles.css';
import { Navigate } from "react-router-dom";


export default function Login(){
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const onSubmit = data => {
        console.log(data);
        console.log(data.email);
        let email = data.email;
        let password = data.password;

        fetch("https://f515af77-a75b-4d66-827f-e3c3c2a73793.mock.pstmn.io/auth", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ email, password}),
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
    return(
        <div class="main-container">
            <Navbar />
            <div style={{margin: '8%'}}>
                <div style={{width:'33%', margin: 'auto', border: '4px solid #469FCE', borderRadius: '15px'}}>
                    <h3 style={{margin: 'auto', paddingLeft:'30%', paddingTop: '7%'}}>Login to Flutr</h3>
                    <div className={styles.formLook} style={{padding:'5%'}}>
                        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                        <div className="form-group"><label for="email">Email:</label><input name="email" {...register("email", { required: true, pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message: 'Invalid email address'}})} placeholder="Email" className="form-control" />
                        {errors.email && <p className="text-danger">Email is required.</p>}</div>
                        
                        <div className="form-group"><label for="password">Password:</label><input name="password" {...register("password", { required: true})} placeholder="Password" className="form-control"/>
                        {errors.password && <p className="text-danger">Password is required.</p>}</div>
                        
                        <div className={styles.buttons}>
                            <button type="cancel" className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    
                </form>
            </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}