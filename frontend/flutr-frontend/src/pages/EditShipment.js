import { useState } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";
import { useLocation } from "react-router-dom";

export default function EditShipment() {

    const butterflyOptions = [
        {value: "Butterfly 1" },
        {value: "Butterfly 2" },
        {value: "Butterfly 3" },
        {value: "Butterfly 4" },
        {value: "Butterfly 5" },
    ];

    const location = useLocation();
    const shipment = location.state;
    const {butterflyDetail} = shipment || {};

    const [data, setData] = useState(butterflyDetail);

    const incrementVal = (butterflyId, key) => {
        setData(data.map(item =>
            item.butterflyId === butterflyId ? { ...item, [key]: item[key] + 1 } : item
        ));
    };

    const decrementVal = (butterflyId, key) => {
        setData(data.map(item =>
            item.butterflyId === butterflyId && (item[key] > 0) ? { ...item, [key]: item[key] - 1 } : item
        ));
    };

    const shipDateInputRef = useRef(null);
    const arriveDateInputRef = useRef(null);
    const supplierDateInputRef = useRef(null);


    const addButterfly = (speciesIn) => {
        const exists = data.some(butterfly => butterfly.species === speciesIn);
        if (exists) {
            console.log(`Butterfly with species '${speciesIn}' already exists.`);
            return;
        }

        const newButterfly = {
            butterflyId: data.length + 1,
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
        console.log(data);
    };

    const submit = () => {
        const newShipment = {
            id: 40,
            shipmentDate: shipDateInputRef.current.value,
            arrivalDate: arriveDateInputRef.current.value,
            supplier: supplierDateInputRef.current.value,
            butterflyDetail: data
        };

        console.log(newShipment);
    };

return (
        <div class="main-container">
            <Navbar />
            <h1 className="add-shipments-header">Edit Shipment</h1>
                <div class="border-all">
                    <div className="ship-info-input">
                        <div class="input-group">
                            <label for="shipdate">Shipment Date: </label>
                            <input type="date" id="shipdate" name="shipment-date" defaultValue={shipment.shipmentDate} ref={shipDateInputRef}/>
                        </div>
                        <div class="input-group">
                            <label for="arrivedate">Arrival Date: </label>
                            <input type="date" id="arrivedate" name="arrival-date" defaultValue={shipment.arrivalDate} ref={arriveDateInputRef}/>
                        </div>
                        <div class="input-group">
                            <label for="suppliers">Supplier: </label>
                            <select id="suppliers" name="suppliers" defaultValue={shipment.supplier} ref={supplierDateInputRef}>
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
                            <td style={{background:'#469FCE',color:'#E1EFFE'}}>
                                {item.numberReceived - (item.emergedInTransit+item.damaged+item.diseased+item.parasites)}
                            </td>
                            <td style={{background:'#E4976C',color:'#E1EFFE'}}>
                                remove
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