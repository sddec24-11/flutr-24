import {useState} from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";

export default function MasterEdit(){

    // const [data, setData] = useState([
    //     { id: 1, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 2, species: 'Heliconius erato', received: 6, emerged: 2, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 3, species: 'Heliconius ismenius', received: 7, emerged: 3, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 4, species: 'Heliconius melpomene', received: 15, emerged: 5, damaged: 5, diseased: 0, parasites: 5 },
    //     { id: 5, species: 'Heliconius numata', received: 20, emerged: 7, damaged: 7, diseased: 0, parasites: 5 },
    //     { id: 6, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 7, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 8, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 9, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 10, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 11, species: 'Heliconius doris', received: 5, emerged: 1, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 12, species: 'Heliconius erato', received: 6, emerged: 2, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 13, species: 'Heliconius ismenius', received: 7, emerged: 3, damaged: 2, diseased: 0, parasites: 1 },
    //     { id: 14, species: 'Heliconius melpomene', received: 15, emerged: 5, damaged: 5, diseased: 0, parasites: 5 },
    //     { id: 15, species: 'Heliconius numata', received: 20, emerged: 7, damaged: 7, diseased: 0, parasites: 5 },
    //     { id: 16, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 17, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 18, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    //     { id: 19, species: 'Siproeta epaphus', received: 8, emerged: 2, damaged: 3, diseased: 0, parasites: 3 },
    // ]);

    return (
        <div class="main-container">
            <Navbar />

            {/* <div className="add-shipments-table-container">
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
                        <tr key={item.id}>
                            <td>{item.species}</td>
                            <td>
                                <div className="value-box">{item.received}</div>
                            </td>
                            <td>
                                <div className="value-box">{item.emerged}</div>
                            </td>
                            <td>
                                <div className="value-box">{item.damaged}</div>
                            </td>
                            <td>
                                <div className="value-box">{item.diseased}</div>
                            </td>
                            <td>
                                <div className="value-box">{item.parasites}</div>
                            </td>
                            <td style={{background:'#469FCE',color:'#E1EFFE'}}>
                                {item.received - (item.emerged+item.damaged+item.diseased+item.parasites)}
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
            </div> */}

            <Footer />
        </div>
    );
}
