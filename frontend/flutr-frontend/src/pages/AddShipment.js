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
            <h1 className="shipments-header">Add Shipment</h1>
            <div className="table-container">
                <table className="table" style={{width:'90%'}}>
                    <thead>
                        <tr>
                            <th style={{width:'323px'}}>Species</th>
                            <th style={{width:'218px'}}>Received</th>
                            <th style={{width:'218px'}}>Emerged in Transit</th>
                            <th style={{width:'218px'}}>Damaged in Transit</th>
                            <th style={{width:'218px'}}>Parasites</th>
                            <th style={{width:'145px', fontSize: '20px'}}>Total Remaining</th>
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
            <Footer />
        </div>
    );
}