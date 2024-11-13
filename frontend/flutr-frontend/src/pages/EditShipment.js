import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";
import { useLocation } from "react-router-dom";


export default function EditShipment() {
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
                window.location.href = "/shipments";
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
                    <p>Would you like to edit another shipment or return home?</p>
                    <button onClick={handleAddShipment}>Edit Another Shipment</button>
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

    const location = useLocation();
    const shipment = location.state;

    const [shipmentData, setShipmentData] = useState({
        shipmentId: '',
        shipmentDate: '',
        arrivalDate: '',
        abbreviation: '',
        butterflyDetails: []
    });

    const [suppliers, setSuppliers] = useState([]);
    const [butterflyOptions, setButterflyOptions] = useState([]);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    const shipDateInputRef = useRef(null);
    const arriveDateInputRef = useRef(null);
    const supplierInputRef = useRef(null);

    //set shipments upon mount
    useEffect(() => {
        if (shipment) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };
    
            setShipmentData({
                shipmentId: shipment.shipmentId,
                shipmentDate: formatDate(shipment.shipmentDate),
                arrivalDate: formatDate(shipment.arrivalDate),
                abbreviation: shipment.abbreviation || '',
                butterflyDetails: shipment.butterflyDetails || []
            });
        }
    }, [shipment]);

    //set suppliers upon mount
    useEffect(() => {
        fetchSuppliers();
    }, []);

    //set butterfly dropdown
    useEffect(() => {
        let attempts = 0;
        const maxRetries = 3;

        const fetchOptions = async () => {
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
                    console.log(message.error);
                }
            } catch (error) {
                attempts++;
                if (attempts < maxRetries) {
                    console.log(`Retry attempt ${attempts}`);
                    fetchOptions();
                } else {
                    setError('Failed to load butterflies after multiple attempts.');
                    console.error('Failed to load butterflies:', error);
                }
            }
        };
    
        fetchOptions();
    }, []);  

    //fetch all active suppliers
    const fetchSuppliers = async (retries = 3) => {
        try {
            const response = await fetch("http://206.81.3.155:8282/api/suppliers/view/active", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem("accessKey")
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const message = await response.json();
            if (message.error) throw new Error(message.error);

            setSuppliers(message.payload);
        } catch (error) {
            if (retries > 0) {
                console.log(`Retrying... Attempts left: ${retries}`);
                fetchSuppliers(retries - 1); // Retry
            } else {
                setError('Failed to load suppliers: ' + error.message);
            }
        }
    };

    //add empty butterfly obj to butterfly details
    const addButterfly = (species) => {
        if (shipmentData.butterflyDetails.some(butterfly => butterfly.buttId === species)) {
            console.log(`Butterfly with species '${species}' already exists.`);
            return;
        }
        const newButterfly = createButterflyObject(species);
        setShipmentData(prev => ({
            ...prev,
            butterflyDetails: [...prev.butterflyDetails, newButterfly]
        }));
    };

    //create empty butterfly obj with species name
    const createButterflyObject = (species) => ({
        buttId: species,
        numberReceived: 0,
        numberReleased: 0,
        poorEmergence: 0,
        noEmergence: 0,
        emergedInTransit: 0,
        damaged: 0,
        diseased: 0,
        parasite: 0,
        totalRemaining: 0
    });
    
    //remove butterfly obj based on 
    const removeButterfly = (species) => {
        setShipmentData(prev => ({
            ...prev,
            butterflyDetails: prev.butterflyDetails.filter(item => item.buttId !== species)
        }));
    };
    
    const updateButterflyValue = (buttId, key, increment) => {
        setShipmentData(prev => ({
            ...prev,
            butterflyDetails: prev.butterflyDetails.map(item => {
                if (item.buttId === buttId) {
                    if (increment)
                    {
                        if (key !== 'numberReceived') {
                            if (item.totalRemaining <= 0) {return item;}
                            else {
                                return {
                                    ...item,
                                    [key]: item[key] + 1,
                                    totalRemaining: item.totalRemaining - 1
                                }
                            }
                        } else {
                            return {
                                ...item,
                                [key]: item[key] + 1,
                                totalRemaining: item.totalRemaining + 1
                            }
                        }
                    }
                    else {
                        if (item[key] <= 0) {return item;}
                        if (key === 'numberReceived') {
                            if (item.totalRemaining <= 0)
                            {
                                return item;
                            }

                            return {
                                ...item,
                                [key]: item[key] - 1,
                                totalRemaining: item.totalRemaining - 1
                            }
                        }
                        else {
                            return {
                                ...item,
                                [key]: item[key] - 1,
                                totalRemaining: item.totalRemaining + 1
                            }
                        }
                    }
                    
                }
                return item;
            })
        }))
    };

    //create json obj of current shipment and submit to backend
    const handleSubmit = async () => {
        const shipDate = shipDateInputRef.current?.value;
        const arrivalDate = arriveDateInputRef.current?.value;
        const supplier = supplierInputRef.current?.value;
    
        if (!shipDate || !arrivalDate || supplier === 'true' || shipmentData.butterflyDetails.length === 0) {
            alert("Please fill in all required fields: shipment date, arrival date, supplier, and at least one butterfly");
            return;
        }
    
        let retries = 3;
    
        while (retries > 0) {
            try {
                let id = shipmentData.shipmentId;
                const response = await fetch(`http://206.81.3.155:8282/api/shipments/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey")
                    },
                    body: JSON.stringify({
                        shipmentDate: shipDate,
                        arrivalDate: arrivalDate,
                        abbreviation: supplier,
                        butterflyDetails: shipmentData.butterflyDetails
                    })
                });
    
                const message = await response.json();
    
                if (message.error == null) {
                    console.log(message);
                    setIsModalVisible(true);
                    return; // Exit after successful submission
                } else {
                    setError(message.error);
                    return; // Exit on error message
                }
            } catch (error) {
                console.log('Failed to fetch', error);
                retries -= 1; // Decrease the retry count
                if (retries === 0) {
                    alert('Failed to submit after 3 attempts. Please try again later.');
                }
            }
        }
    };

    //TODO: return user to home page?
    const handleCancel = () => {
        setIsCancelModalVisible(true);
    }

return (
        <div class="main-container">
            <Navbar />
            <h1 className="add-shipments-header">Edit Database</h1>

            <div class="border-all">
                <div className="ship-info-input">
                    <div class="input-group">
                        <label for="shipdate">Shipment Date: </label>
                        <input type="date" id="shipdate" ref={shipDateInputRef} value={shipmentData.shipmentDate} onChange={(e) => setShipmentData({ ...shipmentData, shipmentDate: e.target.value })} />
                    </div>
                    <div class="input-group">
                        <label for="arrivedate">Arrival Date: </label>
                        <input type="date" id="arrivedate" name="arrival-date" ref={arriveDateInputRef} value={shipmentData.arrivalDate} onChange={(e) => setShipmentData({ ...shipmentData, arrivalDate: e.target.value })} />
                    </div>
                    <div class="input-group">
                        <label for="suppliers">Supplier: </label>
                        <select id="suppliers" name="suppliers" ref={supplierInputRef} value={shipmentData.abbreviation} onChange={(e) => setShipmentData({ ...shipmentData, abbreviation: e.target.value })}>
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
                            <th style={{width:'15%'}}>Species</th>
                            <th>Received</th>
                            <th>Released</th>
                            <th>Poor Emergence</th>
                            <th>No Emergence</th>
                            <th>Emerged in Transit</th>
                            <th>Damaged</th>
                            <th>Diseased</th>
                            <th>Parasite</th>
                            <th style={{width:'6%'}}>Remaining</th>
                            <th style={{width:'5%', background:'#E4976C', border:'none'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentData.butterflyDetails.map(item => (
                            <tr key={item.buttId}>
                                <td>{item.buttId}</td>
                                {['numberReceived', 'numberReleased', 'poorEmergence', 'noEmergence', 'emergedInTransit', 'damaged', 'diseased', 'parasite'].map(key => (
                                    <td key={key}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <div className="value-box">{item[key]}</div>
                                            <div style={{ display: "flex", flexDirection: "column", padding: "10px 0px"}}>
                                                <button style = {{marginBottom: "5px"}} onClick={() => updateButterflyValue(item.buttId, key, true)}>+</button>
                                                <button onClick={() => updateButterflyValue(item.buttId, key, false)}>-</button>
                                            </div>
                                        </div>
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

            <div className="submit-cancel-buttons">
                <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="button" className="btn submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <NotificationModal isVisible={isModalVisible} onClose={closeModal} />
            <CancelConfirmationModal isVisible={isCancelModalVisible} nClose={closeModal} />                     
            <Footer />
        </div>
    );
}