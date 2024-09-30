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
    const rowsPerPage = 9;
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
        <div class="main-container">
            <Navbar />

            <h1 className="shipments-header">Shipments</h1>
            
            <div className="shipments-table-container">
                <table className="paging-table">
                    <thead>
                        <tr>
                            <th>Shipment Date</th>
                            <th>Arrival Date</th>
                            <th>Supplier</th>
                            <th style={{width:"100px"}}></th>
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

            <div className="paging-row">
                <div className="paging-column">
                    <button onClick={prevPage} disabled={currentPage === 1}
                        style={{marginLeft:"70%"}}>
                        Previous
                    </button>
                </div>
                <div className="paging-column" style={{width:"14%"}}>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
               <div className="paging-column">
                    <button onClick={nextPage} disabled={currentPage === totalPages}
                    style={{marginRight:"70%"}}>
                        Next
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}