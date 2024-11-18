import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";
import { useLocation } from "react-router-dom";


export default function AddRelease(){
    useEffect(() => {
        if(!window.sessionStorage.getItem("authorized")){
            alert("Sorry, you cant view this page.");
            document.location.href = '/login';
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
                    <p>Would you like to add another release or return home?</p>
                    <button onClick={handleAddShipment}>Add Another Release</button>
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

    const today = new Date().toLocaleDateString();
    const location = useLocation();
    const shipment = location.state;

    const [shipmentData, setShipmentData] = useState({
        shipmentId: '',
        butterflyDetails: []
    });

    const [butterflyUpdates, setButterflyUpdates] = useState([]);

    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('table1');

    const releaseDateInputRef = useRef(null);   

    //set shipments upon mount
    useEffect(() => {
        if (shipment) {
            setShipmentData({
                shipmentId: shipment.shipmentId,
                butterflyDetails: shipment.butterflyDetails || []
            });

            const emptyButterflyUpdates = (shipment.butterflyDetails || []).map(butterfly => ({
                buttId: butterfly.buttId,
                numberReleased: 0,
                poorEmergence: 0,
                damagedDuringRelease: 0,
                diseasedDuringRelease: 0,
                parasiteDuringRelease: 0,
                noEmergence: 0,
                totalRemaining: butterfly.totalRemaining,
                runningRemaining: butterfly.totalRemaining
            }));

            setButterflyUpdates(emptyButterflyUpdates);
        }
    }, [shipment]);

    const selectShipment = (shipDateSelect) => {
        // const shipDate = shipDateSelect.target.value;
        // setShipDate(shipDate);

        // const foundShip = shipmentList.find(shipment => shipment.shipmentDate === shipDate);
        // console.log(foundShip);

        // if (foundShip != null)
        // {
        //     setCurShip(foundShip);
        //     const foundButterflies = foundShip.butterflyDetail;
        //     console.log(foundButterflies);
        //     setButterflyData(foundButterflies);
        // }
        // else
        // {
        //     setCurShip([]);
        //     setButterflyData([]);
        // }
        // // setCurShip(foundShip ? [foundShip] : []);

        
    }

    const incrementVal = (butterflyId, key) => {
        setButterflyUpdates(butterflyUpdates.map(item => {
            if (item.buttId === butterflyId) {
                if (item.runningRemaining <= 0) {return item;}
                else {
                    return {
                        ...item,
                        [key]: item[key] + 1,
                        runningRemaining: item.runningRemaining - 1
                    }
                }
            }
            return item;
        }));
    };

    const decrementVal = (butterflyId, key) => {
        setButterflyUpdates(butterflyUpdates.map(item => {
            if (item.buttId === butterflyId) {
                if (item[key] <= 0) {
                    return item;
                }

                return {
                    ...item,
                    [key]: item[key] - 1,
                    runningRemaining: item.runningRemaining + 1
                }
            }
            return item;
        }));
    };

    //create json obj of current shipment and submit to backend
    const handleSubmit = async () => {

        const toSend = butterflyUpdates.map(update => {
            const {totalRemaining, runningRemaining, ...filteredUpdate } = update;
            return filteredUpdate;
        });

        let retries = 3;
    
        while (retries > 0) {
            try {
                let id = shipmentData.shipmentId;
                const response = await fetch("api/releases/release", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey")
                    },
                    body: JSON.stringify({
                        shipmentId: shipmentData.shipmentId,
                        butterflyUpdates: toSend
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

    const handleCancel = () => {
        setIsCancelModalVisible(true);
    }

    const renderTable1 = () => (
        <table className="add-table" style={{borderTopLeftRadius: '0px'}}>
                    <thead>
                        <tr>
                            <th style={{width:"35%"}}>Species</th>
                            <th>Emerged</th>
                            <th>Poor Emergence</th>
                            <th style={{width:"15%"}}>Currently in Case</th>
                            <th style={{width:"15%"}}>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {butterflyUpdates.map(item => (
                        <tr key={item.buttId}>
                            <td style={{textAlign: 'left', paddingLeft: '4%'}}>
                                {item.buttId}
                            </td>
                            <td>{/* emerged */}
                                <button onClick={() => incrementVal(item.buttId, 'numberReleased')}>+</button>
                                <div className="value-box">{item.numberReleased}</div>
                                <button onClick={() => decrementVal(item.buttId, 'numberReleased')}>-</button>
                            </td>
                            <td>{/* poor emergence */}
                                <button onClick={() => incrementVal(item.buttId, 'poorEmergence')}>+</button>
                                <div className="value-box">{item.poorEmergence}</div>
                                <button onClick={() => decrementVal(item.buttId, 'poorEmergence')}>-</button>
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#469FCE'}}>
                                {item.totalRemaining}
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#E4976C'}}>
                                {item.runningRemaining}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
    );

    const renderTable2 = () => (
        <table className="add-table" style={{borderTopLeftRadius: '0px'}}>
                    <thead>
                        <tr>
                            <th style={{width:"35%"}}>Species</th>
                            <th>Diseased</th>
                            <th>Parasites</th>
                            <th>No Emergence</th>
                            <th style={{width:"15%"}}>Currently in Case</th>
                            <th style={{width:"15%"}}>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {butterflyUpdates.map(item => (
                        <tr key={item.buttId}>
                            <td style={{textAlign: 'left', paddingLeft: '4%'}}>
                                {item.buttId}
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'diseasedDuringRelease')}>+</button>
                                <div className="value-box">{item.diseasedDuringRelease}</div>
                                <button onClick={() => decrementVal(item.buttId, 'diseasedDuringRelease')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'parasiteDuringRelease')}>+</button>
                                <div className="value-box">{item.parasiteDuringRelease}</div>
                                <button onClick={() => decrementVal(item.buttId, 'parasiteDuringRelease')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.buttId, 'noEmergence')}>+</button>
                                <div className="value-box">{item.noEmergence}</div>
                                <button onClick={() => decrementVal(item.buttId, 'noEmergence')}>-</button>
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#469FCE'}}>
                                {item.totalRemaining}
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#E4976C'}}>
                                {item.runningRemaining}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
    );

    return (
        <div class="main-container">
            <Navbar />
            <h1 className="add-shipments-header">Add Release</h1>
            
            <div class="border-all">
                <div className="ship-info-input" style={{textAlign: "right"}}>
                    <div></div>
                    <div></div>
                    <div class="input-group">
                        <label for="releasedate">Release Date: </label>
                        <p>{today}</p>
                    </div>
                </div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '2.5%'}}>
                <button class="tab-btn" 
                    style={{backgroundColor: activeTab === 'table1' ? '#469FCE' : '#8ABCD7', border: activeTab === 'table1' ? '1px solid #469FCE' : '1px solid #8ABCD7'}} 
                    onClick={() => setActiveTab('table1')}>Good/Poor</button>
                <button class="tab-btn" 
                    style={{backgroundColor: activeTab === 'table2' ? '#469FCE' : '#8ABCD7', border: activeTab === 'table2' ? '1px solid #469FCE' : '1px solid #8ABCD7'}} 
                    onClick={() => setActiveTab('table2')}>Other</button>
            </div>
            <div className="add-shipments-table-container">
                {activeTab === 'table1' && renderTable1()}
                {activeTab === 'table2' && renderTable2()}  
            </div>

            <div class="submit-cancel-buttons">
                <button type="button" class="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" class="btn submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
            
            <NotificationModal isVisible={isModalVisible} onClose={closeModal} />
            <CancelConfirmationModal isVisible={isCancelModalVisible} onClose={closeModal} />
            <Footer />
        </div>
    );
}
