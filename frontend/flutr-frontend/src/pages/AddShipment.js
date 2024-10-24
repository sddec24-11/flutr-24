import { useState, useEffect} from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";

const NotificationModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const handleAnotherShipment = () => {
        onClose();
        console.log('new shipment');
        window.location.href = "/addshipment";
    };

    const handleReturnHome = () => {
        onClose();
        console.log('return home');
        window.location.href = '/';
    };

    return (
        <div className='notification-modal'>
            <div className='modal-content'>
                <h2>Successfully submitted!</h2>
                <p>Would you like to do another shipment or return home?</p>
                <button onClick={handleAnotherShipment}>Another Shipment</button>
                <button onClick={handleReturnHome}>Return Home</button>
            </div>
        </div>
    );
};

export default function AddShipment() {
    
    useEffect(() => {
        if(!window.sessionStorage.getItem("authenticated")){
            alert("Sorry, you cant view this page.");
            document.location.href = '/login';
        }
    });


    
    useEffect(() => {
        if(!window.sessionStorage.getItem("authenticated")){
            alert("Sorry, you cant view this page.");
            document.location.href = '/login';
        }
    });


    
    const [data, setData] = useState([]);
    
    const shipDateInputRef = useRef(null);
    const arriveDateInputRef = useRef(null);
    const supplierDateInputRef = useRef(null);

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
    
    //TEMP
    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
      }

    const addButterfly = (speciesIn) => {
        const exists = data.some(butterfly => butterfly.species === speciesIn);
        if (exists) {
            console.log(`Butterfly with species '${speciesIn}' already exists.`);
            return;
        }

        const newButterfly = {
            butterflyId: generateRandomId(),
            species: speciesIn,
            numberReceived: 0,
            numberReleased: 0,
            emergedInTransit: 0,
            damaged: 0,
            diseased: 0,
            parasites: 0,
            poorEmergence: 0,
            totalRemaining: 0,
        };

        setData(prev => [...prev, newButterfly]);
    };
    
    const removeButterfly = (speciesOut) => {
        setData(data.filter(item => item.species !== speciesOut));
    }

    const incrementVal = (butterflyId, key) => {
        setData(data.map(item => {
            if (item.butterflyId === butterflyId) {
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

    const decrementVal = (butterflyId, key) => {
        setData(data.map(item => {
            if (item.butterflyId === butterflyId) {
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

    //post to shipmentList
    const submit = () => {
        const newShipment = {
            id: 40,
            shipmentDate: shipDateInputRef.current.value,
            arrivalDate: arriveDateInputRef.current.value,
            supplier: supplierDateInputRef.current.value,
            butterflyDetail: data,
        };
        console.log(newShipment);
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
                        <select id="suppliers" name="suppliers" ref={supplierDateInputRef}>
                            <option disabled selected value></option>
                            <option value="ship1">ship1</option>
                            <option value="ship2">ship2</option>
                            <option value="ship3">ship3</option>
                            <option value="ship4">ship4</option>
                            <option value="ship5">ship5</option>
                            <option value="ship6">ship6</option>
                            <option value="ship7">ship7</option>
                            <option value="ship8">ship8</option>
                            <option value="ship9">ship9</option>
                            <option value="ship10">ship10</option>
                            <option value="ship11">ship11</option>
                            <option value="ship12">ship12</option>
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
                            <th style={{width:"350px"}}>Species</th>
                            <th>Received</th>
                            <th>Emerged in Transit</th>
                            <th>Damaged in Transit</th>
                            <th>Diseased</th>
                            <th>Parasites</th>
                            <th style={{width:"94px"}}>Total</th>
                            <th style={{width:'94px', background:'#E4976C', border:'none'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                        <tr key={item.butterflyId}>
                            <td>{item.species}</td>
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'numberReceived')}>+</button>
                                <div className="value-box">{item.numberReceived}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'numberReceived')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'emergedInTransit')}>+</button>
                                <div className="value-box">{item.emergedInTransit}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'emergedInTransit')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'damaged')}>+</button>
                                <div className="value-box">{item.damaged}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'damaged')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'diseased')}>+</button>
                                <div className="value-box">{item.diseased}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'diseased')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'parasites')}>+</button>
                                <div className="value-box">{item.parasites}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'parasites')}>-</button>
                            </td>
                            <td id="total-remaining" style={{background:'#469FCE',color:'#E1EFFE'}}>
                                {item.totalRemaining}
                            </td>
                            <td style={{background:'#E4976C'}}>
                                <p style={{color:'#E1EFFE', margin:"0"}}
                                    onClick={() => removeButterfly(item.species)}>
                                    remove
                                </p>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="submit-cancel-buttons">
                <button type="button" class="btn cancel-btn">Cancel</button>
                <button type="submit" class="btn submit-btn" 
                        onClick={() => submit()}>
                            Submit
                </button>
            </div>

            <Footer />
        </div>
    );
}