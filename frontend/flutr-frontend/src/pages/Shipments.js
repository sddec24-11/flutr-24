import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {useState} from "react";
import "../styles/shipmentsStyles.css";

export default function Shipments(){

const shipmentList = [
    { id: 1, shipmentDate: "06/10/2024", arrivalDate: "06/13/2024", supplier: "HBW" },
    { id: 2, shipmentDate: "06/28/2024", arrivalDate: "06/30/2024", supplier: "TEH" },
    { id: 3, shipmentDate: "06/27/2024", arrivalDate: "06/30/2024", supplier: "EBN" },
    { id: 4, shipmentDate: "07/10/2024", arrivalDate: "07/13/2024", supplier: "ABC" },
    { id: 5, shipmentDate: "07/18/2024", arrivalDate: "07/21/2024", supplier: "XYZ" },
    { id: 6, shipmentDate: "07/22/2024", arrivalDate: "07/25/2024", supplier: "MNO" },
    { id: 7, shipmentDate: "07/26/2024", arrivalDate: "07/29/2024", supplier: "QRS" },
    { id: 8, shipmentDate: "06/10/2024", arrivalDate: "06/13/2024", supplier: "HBW" },
    { id: 9, shipmentDate: "06/28/2024", arrivalDate: "06/31/2024", supplier: "TEH" },
    { id: 10, shipmentDate: "06/27/2024", arrivalDate: "06/30/2024", supplier: "EBN" },
    { id: 11, shipmentDate: "07/10/2024", arrivalDate: "07/13/2024", supplier: "ABC" },
    { id: 12, shipmentDate: "07/18/2024", arrivalDate: "07/21/2024", supplier: "XYZ" },
    { id: 13, shipmentDate: "07/22/2024", arrivalDate: "07/25/2024", supplier: "MNO" },
    { id: 14, shipmentDate: "07/26/2024", arrivalDate: "07/29/2024", supplier: "QRS" },
    { id: 15, shipmentDate: "06/10/2024", arrivalDate: "06/13/2024", supplier: "HBW" },
    { id: 16, shipmentDate: "06/28/2024", arrivalDate: "06/31/2024", supplier: "TEH" },
    { id: 17, shipmentDate: "06/27/2024", arrivalDate: "06/30/2024", supplier: "EBN" },
    { id: 18, shipmentDate: "07/10/2024", arrivalDate: "07/13/2024", supplier: "ABC" },
    { id: 19, shipmentDate: "07/18/2024", arrivalDate: "07/21/2024", supplier: "XYZ" }
];

    const[currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;
    const totalPages = Math.ceil(shipmentList.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, shipmentList.length);
    const currentShipments = shipmentList.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={{width: "100%"}}>
            <Navbar />
            <h1 className="shipments-header">Shipments</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Shipment Date</th>
                            <th>Arrival Date</th>
                            <th>Supplier</th>
                            <th style={{width:'128px'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentShipments.map((shipmentList, index) => (
                            <tr key={index}>
                                <td>{shipmentList.shipmentDate}</td>
                                <td>{shipmentList.arrivalDate}</td>
                                <td>{shipmentList.supplier}</td>

                                {/* TODO: Edit button opens 'add shipment' page with shipment info auto-populated */}
                                <td style={{backgroundColor:"#469FCE", color:"#E1EFFE"}}>edit</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <div className="pagination" style={{marginTop:'10px', textAlign:'center', maxWidth:'fit-content', marginLeft:'auto', marginRight:'auto'}}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            <Footer />
        </div>
    );
}