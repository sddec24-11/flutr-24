import {useState} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/shipmentsStyles.css";

export default function AddShipment(){

    const [data, setData] = useState([
        { id: 1, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, parasites: 1 },
        { id: 2, species: 'Heliconius erato', received: 6, emerged: 2, damaged: 2, parasites: 1 },
        { id: 3, species: 'Heliconius ismenius', received: 7, emerged: 3, damaged: 2, parasites: 1 },
        { id: 4, species: 'Heliconius melpomene', received: 15, emerged: 5, damaged: 5, parasites: 5 },
        { id: 5, species: 'Heliconius numata', received: 20, emerged: 7, damaged: 7, parasites: 5 },
        { id: 6, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 7, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 8, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 9, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 10, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, parasites: 1 },
        { id: 11, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, parasites: 1 },
        { id: 12, species: 'Heliconius erato', received: 6, emerged: 2, damaged: 2, parasites: 1 },
        { id: 13, species: 'Heliconius ismenius', received: 7, emerged: 3, damaged: 2, parasites: 1 },
        { id: 14, species: 'Heliconius melpomene', received: 15, emerged: 5, damaged: 5, parasites: 5 },
        { id: 15, species: 'Heliconius numata', received: 20, emerged: 7, damaged: 7, parasites: 5 },
        { id: 16, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 17, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 18, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
        { id: 19, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, parasites: 3 },
    ]);
    
    const incrementVal = (id, key) => {
        setData(data.map(item =>
            item.id === id ? {...item, [key]: item[key] + 1} : item
        ));
    };

    const decrementVal = (id, key) => {
        setData(data.map(item =>
            item.id === id && (item[key]>0) ? {...item, [key]: item[key] - 1} : item
        ));
    };

return (
        <div style={{width: "100%"}}>
            <Navbar />
            <h1 className="shipments-header" style={{fontSize:"20px", paddingTop:"10px", paddingBottom:"10px"}}>Add Shipment</h1>
                <div class="border-all">
                <div className="ship-info-input">
                    <div class="input-group">
                        <label for="shipdate">Shipment Date: </label>
                        <input type="date" id="shipdate" name="shipment-date"/>
                    </div>
                    <div class="input-group">
                        <label for="arrivedate">Arrival Date: </label>
                        <input type="date" id="arrivedate" name="arrival-date"/>
                    </div>
                    <div class="input-group">
                        <label for="suppliers">Supplier: </label>
                        <select id="suppliers" name="suppliers">
                            <option disabled selected value></option>
                            <option value="ABC">ABC</option>
                            <option value="NBC">NBC</option>
                            <option value="QVC">QVC</option>
                        </select>
                    </div>
                </div>

                <div class="butterfly">
                    <select id="butterfly" name="add-butterfly" style={{background:'#E4976C',color:'#E1EFFE', width:"18%", textAlign:"center", outlineColor: "#E4976C", borderColor:"#E4976C"}}>
                        <option disabled selected value>Add Butterfly</option>
                        <option value="but1">but1</option>
                        <option value="but2">but2</option>
                        <option value="but3">but3</option>
                    </select>
                    </div>
                    </div>

            <div className="table-container">
                <table className="table" style={{width:'90%', borderTopRightRadius:'0px', borderTopLeftRadius:'0px'}}>
                    <thead>
                        <tr>
                            <th style={{width:'323px', fontSize:"18px"}}>Species</th>
                            <th style={{width:'218px', fontSize:"18px"}}>Received</th>
                            <th style={{width:'218px', fontSize:"18px"}}>Emerged in Transit</th>
                            <th style={{width:'218px', fontSize:"18px"}}>Damaged in Transit</th>
                            <th style={{width:'218px', fontSize:"18px"}}>Parasites</th>
                            <th style={{width:'145px', fontSize: '18px'}}>Total Remaining</th>
                            <th style={{width:'94px', background:'#E4976C', border:'none'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.species}</td>
                            <td>
                                <button onClick={() => incrementVal(item.id, 'received')}>+</button>
                                <div className="value-box">{item.received}</div>
                                <button onClick={() => decrementVal(item.id, 'received')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.id, 'emerged')}>+</button>
                                <div className="value-box">{item.emerged}</div>
                                <button onClick={() => decrementVal(item.id, 'emerged')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.id, 'damaged')}>+</button>
                                <div className="value-box">{item.damaged}</div>
                                <button onClick={() => decrementVal(item.id, 'damaged')}>-</button>
                            </td>
                            <td>
                                <button onClick={() => incrementVal(item.id, 'parasites')}>+</button>
                                <div className="value-box">{item.parasites}</div>
                                <button onClick={() => decrementVal(item.id, 'parasites')}>-</button>
                            </td>
                            <td style={{background:'#469FCE',color:'#E1EFFE'}}>
                                {item.received - (item.emerged+item.damaged+item.parasites)}
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
                <button type="submit" class="btn submit-btn">Submit</button>
            </div>

            <Footer />
        </div>
    );
}