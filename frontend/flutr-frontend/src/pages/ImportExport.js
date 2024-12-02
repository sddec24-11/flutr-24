import { CSVLink, CSVDownload } from "react-csv";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, { useState, useEffect } from 'react';

const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

export default function ImportExport(){
    const [csvData, setCSVData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://flutr.org:8282/api/reports/export",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey")
                }
            });
            response.json().then(json => {
                if(json.success){
                    setCSVData(json.payload);
                }

            })
        }
        fetchData();
        
    }, []);
    return(
        <div>
            <Navbar/>
            <div>
                <CSVLink data={csvData} filename={`${window.sessionStorage.getItem("houseID")}'s Report.csv`}>Download me</CSVLink>
            </div>
            <Footer/>
        </div>
    )
}