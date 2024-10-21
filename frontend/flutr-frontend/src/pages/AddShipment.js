import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";


export default function AddShipment() {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [suppliers, setSuppliers] = useState([])
    
    const shipDateInputRef = useRef(null);
    const arriveDateInputRef = useRef(null);
    const supplierInputRef = useRef(null);

//     try{
//         const response = await fetch("/api/users/all", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization' : window.sessionStorage.getItem("accessKey")
//                 //window.sessionStorage.setItem("accessKey", "Bearer " + message.payload)
//             }
//         });
//         const message = await response.json();
//         if(message.error == null){
//             console.log(message);
//         }
//         else{
//             console.log(message.error);
//         }

//     } catch (error) {
//         console.log('Failed to fetch', error);
//     }
// }

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch("/api/suppliers/view/active", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : window.sessionStorage.getItem("accessKey")
                    }
                });
                const message = await response.json();
                if (message.error == null)
                {
                    setSuppliers(message.payload);
                }
                else {
                    console.log(message.error);
                }
            } catch (error) {
                setError('Failed to load suppliers: ', error);
            }
        };
    fetchOptions();
}, []);

    const butterflyOptions = [
        {value: "Butterfly 1" },
        {value: "Butterfly 2" },
        {value: "Butterfly 3" },
        {value: "Butterfly 4" },
        {value: "Butterfly 5" },
        {value: "Butterfly 6" },
        {value: "Butterfly 7" },
        {value: "Butterfly 8" },
        {value: "Butterfly 9" },
    ];





    const addButterfly = (speciesIn) => {
        const exists = data.some(butterfly => butterfly.species === speciesIn);
        if (exists) {
            console.log(`Butterfly with species '${speciesIn}' already exists.`);
            return;
        }

        const newButterfly = {
            buttId: speciesIn,
            numberReceived: 0,
            numberReleased: 0,
            emergedInTransit: 0,
            damaged: 0,
            diseased: 0,
            parasite: 0,
            poorEmergence: 0,
            totalRemaining: 0,
        };

        setData(prev => [...prev, newButterfly]);
    };
    
    const removeButterfly = (speciesOut) => {
        setData(data.filter(item => item.buttId !== speciesOut));
    }

    const incrementVal = (buttIdIn, key) => {
        setData(data.map(item => {
            if (item.buttId === buttIdIn) {
                if (key !== 'numberReceived') {
                    if (item.totalRemaining <= 0) {return item;}
                    else {
                        return {
                            ...item,
                            [key]: item[key] + 1,
                            totalRemaining: item.totalRemaining - 1
                        }
                    }
                }
                else {
                    return {
                        ...item,
                        [key]: item[key] + 1,
                        totalRemaining: item.totalRemaining + 1
                    };
                }
            }
            return item;
        }));
    };

    const decrementVal = (buttIdIn, key) => {
        setData(data.map(item => {
            if (item.buttId === buttIdIn) {
                if (item[key] <= 0) {
                    return item;
                }

                if (key === 'numberReceived') {
                    if (item.totalRemaining <= 0) {
                        return item;
                    }

                    return {
                        ...item,
                        [key]: item[key] - 1,
                        totalRemaining: item.totalRemaining - 1
                    };
                }
                else 
                {
                    return {
                        ...item,
                        [key]: item[key] - 1,
                        totalRemaining: item.totalRemaining + 1
                    }
                }
            }
            return item;
        }));
    };

    const handleSubmit = async () => {
        try{
            console.log(window.sessionStorage.getItem("accessKey"));
            const response = await fetch("/api/shipments/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : window.sessionStorage.getItem("accessKey")
                },
                body: JSON.stringify({
                    shipmentDate: shipDateInputRef.current.value,
                    arrivalDate: arriveDateInputRef.current.value,
                    abbreviation: supplierInputRef.current.value,
                    butterflyDetails: data
                })
            });
            const message = await response.json();
            if(message.error == null){
                console.log(message);
            }
            else{
                setError(message.error);
            }
        } catch (error) {
            console.log('Failed to fetch', error);
        }
    }

    const handleCancel = () => {

    }

    return (
        <div class="main-container">
            <Navbar />
            <h1 className="add-shipments-header">Add Shipment</h1>
            
            <div class="border-all">
                <div className="ship-info-input">
                    <div class="input-group">
                        <label for="shipdate">Shipment Date: </label>
                        <input type="date" id="shipdate" name="shipment-date" ref={shipDateInputRef}/>
                    </div>
                    <div class="input-group">
                        <label for="arrivedate">Arrival Date: </label>
                        <input type="date" id="arrivedate" name="arrival-date" ref={arriveDateInputRef}/>
                    </div>
                    <div class="input-group">
                        <label for="suppliers">Supplier: </label>
                        <select id="suppliers" name="suppliers" ref={supplierInputRef}>
                                <option disabled selected value></option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.abbreviation} value={supplier.abbreviation}>
                                        {supplier.abbreviation}
                                    </option>
                                ))}
                    </select>
                    </div>
                </div>

                <div class="butterfly">
                    <select id="butterfly" name="add-butterfly" style={{ background: '#E4976C', color: '#E1EFFE', width: "18%", textAlign: "center", outlineColor: "#E4976C", borderColor: "#E4976C" }}
                            onChange={(e) => addButterfly(e.target.value)}>
                        <option disabled selected value>Add Butterfly</option>
                            {butterflyOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.value}
                                 </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="add-shipments-table-container">
                <table className="add-table">
                    <thead>
                        <tr>
                            <th style={{width:"25%"}}>Species</th>
                            <th>Received</th>
                            <th>Emerged in Transit</th>
                            <th>Damaged in Transit</th>
                            <th>Diseased</th>
                            <th>Parasites</th>
                            <th style={{width:'6%'}}>Total</th>
                            <th style={{width:'6%', background:'#E4976C', border:'none'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                        <tr key={item.buttId}>
                            <td>{item.buttId}</td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'numberReceived')}>+</button>
                                <div className="value-box">{item.numberReceived}</div>
                                <button onClick={() => decrementVal(item.buttId, 'numberReceived')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'emergedInTransit')}>+</button>
                                <div className="value-box">{item.emergedInTransit}</div>
                                <button onClick={() => decrementVal(item.buttId, 'emergedInTransit')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'damaged')}>+</button>
                                <div className="value-box">{item.damaged}</div>
                                <button onClick={() => decrementVal(item.buttId, 'damaged')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'diseased')}>+</button>
                                <div className="value-box">{item.diseased}</div>
                                <button onClick={() => decrementVal(item.buttId, 'diseased')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'parasite')}>+</button>
                                <div className="value-box">{item.parasite}</div>
                                <button onClick={() => decrementVal(item.buttId, 'parasite')}>-</button>
                            </td>
                            <td id="total-remaining" style={{background:'#469FCE',color:'#E1EFFE'}}>
                                {item.totalRemaining}
                            </td>
                            <td style={{background:'#E4976C'}}>
                                <p style={{color:'#E1EFFE', margin:"0"}}
                                    onClick={() => removeButterfly(item.buttId)}>
                                    remove
                                </p>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="submit-cancel-buttons">
                <button type="button" class="btn cancel-btn"
                        onClick={() => handleCancel()}>
                            Cancel
                </button>
                <button type="submit" class="btn submit-btn" 
                        onClick={() => handleSubmit()}>
                            Submit
                </button>
            </div>

            <Footer />
        </div>
    );
}