import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";

export default function AddShipment() {
    useEffect(() => {
        const authorizationLevel = window.sessionStorage.getItem("authorizationLevel");
        if (authorizationLevel !== "SUPERUSER" && authorizationLevel !== "ADMIN" && authorizationLevel !== "EMPLOYEE") {
            alert("Sorry, you can't view this page");
            document.location.href = "/login";
        }
    }, []);

    const isUserAuthorized = () => {
        const accessKey = window.sessionStorage.getItem("accessKey");
        return accessKey && accessKey.trim() !== "";
    };

    const NotificationModal = ({ isVisible, onClose }) => {
        if (!isVisible) return null;
    
        const handleAddShipment = () => {
            if (isUserAuthorized()) {
                onClose();
                window.location.href = "/addshipment";
            } else {
                alert("Unauthorized access. Please log in.");
                window.location.href = "/login";
            }
        };
    
        const handleReturnHome = () => {
            if (isUserAuthorized()) {
                onClose();
                window.location.href = `/${window.sessionStorage.getItem("subdomain")}`;
            } else {
                alert("Unauthorized access. Please log in.");
                window.location.href = "/login";
            }
        };
    
        return (
            <div className='notification-modal'>
                <div className='modal-content'>
                    <h2>Successfully submitted!</h2>
                    <p>Would you like to add another shipment or return home?</p>
                    <button onClick={handleAddShipment}>Add Another Shipment</button>
                    <button onClick={handleReturnHome}>Return Home</button>
                </div>
            </div>
        );
    };

    const CancelConfirmationModal = ({ isVisible, onClose }) => {
        if (!isVisible) return null;
    
        const handleConfirmCancel = () => {
            if (isUserAuthorized()) {
                onClose();
                window.location.href = `/${window.sessionStorage.getItem("subdomain")}`;
            } else {
                alert("Unauthorized access. Please log in.");
                window.location.href = "/login";
            }
        };
    
        return (
            <div className='notification-modal'>
                <div className='modal-content'>
                    <h2>Are you sure you want to cancel?</h2>
                    <p>All unsaved changes will be lost.</p>
                    <button onClick={onClose}>Go Back</button>
                    <button onClick={handleConfirmCancel}>Confirm Cancel</button>
                </div>
            </div>
        );
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setIsCancelModalVisible(false);
    };
    
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [butterflyOptions, setButterflyOptions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    
    const shipDateInputRef = useRef(null);
    const arriveDateInputRef = useRef(null);
    const supplierInputRef = useRef(null);

    //set supplier dropdown
    useEffect(() => {
        const maxRetries = 3;
    
        const fetchOptions = async (retries = maxRetries) => {
            try {
                const response = await fetch("http://206.81.3.155:8282/api/suppliers/view/active", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey")
                    }
                });
    
                const message = await response.json();
    
                if (message.error == null) {
                    setSuppliers(message.payload);
                } else {
                    console.error("Error from API response:", message.error);
                    setError("Failed to load suppliers.");
                }
            } catch (error) {
                console.error("Fetch attempt failed with error:", error.message);
    
                if (retries > 0) {
                    console.log(`Retrying... Attempts left: ${retries - 1}`);
                    setTimeout(() => fetchOptions(retries - 1), 1000); // Retry with delay
                } else {
                    setError("Failed to load suppliers after multiple attempts.");
                    console.error("Failed to load suppliers after retries:", error);
                }
            }
        };
    
        fetchOptions();
    }, []);
    
    //set butterfly dropdown
    useEffect(() => {
        const maxRetries = 3;
    
        const fetchOptions = async (retries = maxRetries) => {
            try {
                const response = await fetch(`http://206.81.3.155:8282/api/butterflies/details/${window.sessionStorage.getItem("subdomain")}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                const message = await response.json();
    
                if (message.error == null) {
                    setButterflyOptions(message.payload);
                } else {
                    console.error("API Error:", message.error);
                    setError("Failed to load butterfly options.");
                }
            } catch (error) {
                console.error("Fetch attempt failed with error:", error.message);
    
                if (retries > 0) {
                    console.log(`Retrying... Attempts left: ${retries - 1}`);
                    setTimeout(() => fetchOptions(retries - 1), 1000); // Retry with delay
                } else {
                    setError("Failed to load butterflies after multiple attempts.");
                    console.error("Failed to load butterflies after retries:", error);
                }
            }
        };
    
        fetchOptions();
    }, []);
       
    //create new empty butterfly obj and add to list of butterflies in shipment
    const addButterfly = (speciesIn) => {
        const exists = data.some(butterfly => butterfly.buttId === speciesIn);
        if (exists) {
            console.log(`Butterfly with species '${speciesIn}' already exists.`);
            return;
        }

        const newButterfly = {
            buttId: speciesIn,
            numberReceived: 0,
            numberReleased: 0,
            poorEmergence: 0,
            noEmergence: 0,
            emergedInTransit: 0,
            damaged: 0,
            diseased: 0,
            parasite: 0,
            totalRemaining: 0
        };

        setData(prev => [...prev, newButterfly]);
    };
    
    //remove butterfly from list of butterflies in shipment
    const removeButterfly = (speciesOut) => {
        setData(data.filter(item => item.buttId !== speciesOut));
    }

    //increase key attribute of butterfly
    //total remaining based on which attribute is being increased
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

    //decrease key attribute of butterfly
    //total remaining based on which attribute is being decreased
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

    //create json obj of current shipment and submit to backend
    const handleSubmit = async () => {
        const shipDate = shipDateInputRef.current?.value;
        const arrivalDate = arriveDateInputRef.current?.value;
        const supplier = supplierInputRef.current?.value;
    
        if (!shipDate || !arrivalDate || supplier === 'true' || data.length === 0) {
            alert("Please fill in all required fields: shipment date, arrival date, supplier, and at least one butterfly");
            return;
        }
    
        const maxRetries = 3;
        let attempts = 0;
    
        const submitData = async () => {
            try {
                const response = await fetch("http://206.81.3.155:8282/api/shipments/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey")
                    },
                    body: JSON.stringify({
                        shipmentDate: shipDate,
                        arrivalDate: arrivalDate,
                        abbreviation: supplier,
                        butterflyDetails: data
                    })
                });
    
                const message = await response.json();
    
                if (!message.error) {
                    console.log("Submission successful:", message);
                    setIsModalVisible(true);
                } else {
                    console.error("API Error:", message.error);
                    setError(message.error);
                }
            } catch (error) {
                attempts++;
                console.error(`Attempt ${attempts} failed:`, error.message);
    
                if (attempts < maxRetries) {
                    console.log(`Retrying submission... Attempts left: ${maxRetries - attempts}`);
                    setTimeout(submitData, 1000); // Retry with a delay
                } else {
                    alert("Failed to submit after multiple attempts. Please try again later.");
                    setError("Submission failed after multiple attempts.");
                }
            }
        };
    
        submitData();
    };
    
    //return user to home page?
    const handleCancel = () => {
        setIsCancelModalVisible(true);
    }

    const handleBlur = (event, buttIdIn, keyIn) => {
        const input = Math.max(0, parseInt(event.target.value, 10) || 0);
    
        setData(data.map(butterfly => {
            if (butterfly.buttId !== buttIdIn) return butterfly;
    
            let newVal = input;
            let newTotal = butterfly.totalRemaining;
    
            if (keyIn === 'numberReceived') {
                const difference = newVal - butterfly[keyIn];
                newTotal += difference;
    
                if (newTotal < 0) {
                    newVal = butterfly[keyIn] + butterfly.totalRemaining;
                    newTotal = 0;
                }
            } else {
                const maxAvailable = butterfly[keyIn] + butterfly.totalRemaining;
                newVal = Math.min(input, maxAvailable);
                newTotal -= (newVal - butterfly[keyIn]);
            }
    
            event.target.value = newVal;
    
            return {
                ...butterfly,
                [keyIn]: newVal,
                totalRemaining: newTotal
            };
        }));
    };

    const handleInputChange = (event, buttIdIn, key) => {
        const input = Math.max(0, parseInt(event.target.value, 10) || 0);
    
        setData(data.map(butterfly => {
            if (butterfly.buttId === buttIdIn) {
                let newVal = input;
                let newTotal = butterfly.totalRemaining;
    
                if (key === 'numberReceived') {
                    const difference = newVal - butterfly[key];
                    newTotal += difference;
                } else {
                    const maxAvailable = butterfly[key] + butterfly.totalRemaining;
                    newVal = Math.min(newVal, maxAvailable);
                    newTotal -= (newVal - butterfly[key]);
                }
    
                return {
                    ...butterfly,
                    [key]: newVal,
                    totalRemaining: newTotal,
                };
            }
            return butterfly;
        }));
    };
    

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
                                {butterflyOptions.map((butterfly) => (
                                    <option key={butterfly.buttId} value={butterfly.buttId}>
                                        {butterfly.buttId}
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
                                {['numberReceived', 'emergedInTransit', 'damaged', 'diseased', 'parasite'].map(key => (
                                    <td key={key}>
                                        <button tabIndex={-1} onClick={() => incrementVal(item.buttId, key)}>+</button>
                                        <input tabIndex={-1} type="numeric" className="value-box" value={item[key]} onChange={(e) => handleInputChange(e, item.buttId, key)} onBlur = {(e) => handleBlur(e, item.buttId, key)}></input>
                                        <button tabIndex={-1} onClick={() => decrementVal(item.buttId, key)}>-</button>     
                                    </td>
                                ))}
                                <td style={{ background: '#469FCE', color: '#E1EFFE' }}>{item.totalRemaining}</td>
                                <td style={{ background: '#E4976C' }}>
                                    <p style={{ color: '#E1EFFE', margin: "0" }} onClick={() => removeButterfly(item.buttId)}>remove</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="submit-cancel-buttons">
                <button tabIndex={-1} type="button" class="btn cancel-btn"
                        onClick={() => handleCancel()}>
                            Cancel
                </button>
                <button tabIndex={-1} type="submit" class="btn submit-btn" 
                        onClick={() => handleSubmit()}>
                            Submit
                </button>
            </div>

            <NotificationModal isVisible={isModalVisible} onClose={closeModal} />
            <CancelConfirmationModal 
                isVisible={isCancelModalVisible} onClose={closeModal} />
            < Footer />
        </div>
    );
}