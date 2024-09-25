import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/shipmentsStyles.css";
import countButtons from "../components/countButtons";

export default function AddShipment(){

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
                        <tr>
                            <td>Heliconius melpomene</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td style={{background:'#E4976C',color:'#E1EFFE'}}>remove</td>
                        </tr>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td style={{background:'#E4976C',color:'#E1EFFE'}}>remove</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}