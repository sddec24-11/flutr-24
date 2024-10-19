import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {useState} from "react";
import {Link} from "react-router-dom"
import "../styles/shipmentsStyles.css";


export default function Shipments(){

    const shipmentList = [
        { id: 1, shipmentDate: "2024-06-15", arrivalDate: "2024-06-19", supplier: "ship1",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship1_but1",
                    "numberReceived": 10,
                    "numberReleased": 3,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 1
                },
                {
                    "butterflyId": 2,
                    "species": "ship1_but2",
                    "numberReceived": 12,
                    "numberReleased": 4,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 1
                },
                {
                    "butterflyId": 3,
                    "species": "ship1_but3",
                    "numberReceived": 15,
                    "numberReleased": 5,
                    "emergedInTransit": 2,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 2
                },
                {
                    "butterflyId": 4,
                    "species": "ship1_but4",
                    "numberReceived": 14,
                    "numberReleased": 4,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 3
                },
                {
                    "butterflyId": 5,
                    "species": "ship1_but5",
                    "numberReceived": 13,
                    "numberReleased": 4,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 1
                },
                {
                    "butterflyId": 6,
                    "species": "ship1_but6",
                    "numberReceived": 12,
                    "numberReleased": 3,
                    "emergedInTransit": 3,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 2
                },
                {
                    "butterflyId": 7,
                    "species": "ship1_but7",
                    "numberReceived": 11,
                    "numberReleased": 2,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 3
                },
                {
                    "butterflyId": 8,
                    "species": "ship1_but8",
                    "numberReceived": 10,
                    "numberReleased": 1,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 3
                },
                {
                    "butterflyId": 9,
                    "species": "ship1_but9",
                    "numberReceived": 9,
                    "numberReleased": 1,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 3
                },
                {
                    "butterflyId": 10,
                    "species": "ship1_but10",
                    "numberReceived": 8,
                    "numberReleased": 1,
                    "emergedInTransit": 2,
                    "damaged": 1,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 3
                }
            ]
        },
        { id: 2, shipmentDate: "2024-06-20", arrivalDate: "2024-06-23", supplier: "ship2",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship2_but1",
                    "numberReceived": 19,
                    "numberReleased": 4,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 7
                },
                {
                    "butterflyId": 2,
                    "species": "ship2_but2",
                    "numberReceived": 17,
                    "numberReleased": 5,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 4
                },
                {
                    "butterflyId": 3,
                    "species": "ship2_but3",
                    "numberReceived": 21,
                    "numberReleased": 8,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 2
                },
                {
                    "butterflyId": 4,
                    "species": "ship2_but4",
                    "numberReceived": 18,
                    "numberReleased": 7,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 2,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 2
                },
            ]
        },
        { id: 3, shipmentDate: "2024-06-25", arrivalDate: "2024-06-28", supplier: "ship3",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship3_but1",
                    "numberReceived": 24,
                    "numberReleased": 6,
                    "emergedInTransit": 5,
                    "damaged": 3,
                    "diseased": 2,
                    "parasites": 2,
                    "poorEmergence": 2,
                    "totalRemaining": 4
                },
                {
                    "butterflyId": 2,
                    "species": "ship3_but2",
                    "numberReceived": 21,
                    "numberReleased": 5,
                    "emergedInTransit": 4,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 6
                },
                {
                    "butterflyId": 3,
                    "species": "ship3_but3",
                    "numberReceived": 22,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 3,
                    "diseased": 2,
                    "parasites": 1,
                    "poorEmergence": 2,
                    "totalRemaining": 2
                },
                {
                    "butterflyId": 4,
                    "species": "ship3_but4",
                    "numberReceived": 20,
                    "numberReleased": 7,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 2,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 2
                },
            ]
        },
        { id: 4, shipmentDate: "2024-06-29", arrivalDate: "2024-07-03", supplier: "ship4",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship4_but1",
                    "numberReceived": 25,
                    "numberReleased": 6,
                    "emergedInTransit": 4,
                    "damaged": 3,
                    "diseased": 2,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 7
                },
                {
                    "butterflyId": 2,
                    "species": "ship4_but2",
                    "numberReceived": 23,
                    "numberReleased": 8,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 2,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 5
                },
                {
                    "butterflyId": 3,
                    "species": "ship4_but3",
                    "numberReceived": 22,
                    "numberReleased": 7,
                    "emergedInTransit": 4,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 5
                },
                {
                    "butterflyId": 4,
                    "species": "ship4_but4",
                    "numberReceived": 20,
                    "numberReleased": 5,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 7
                },
            ]
        },
        { id: 5, shipmentDate: "2024-07-05", arrivalDate: "2024-07-09", supplier: "ship5",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship5_but1",
                    "numberReceived": 26,
                    "numberReleased": 7,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 2,
                    "parasites": 2,
                    "poorEmergence": 2,
                    "totalRemaining": 6
                },
                {
                    "butterflyId": 2,
                    "species": "ship5_but2",
                    "numberReceived": 24,
                    "numberReleased": 8,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 6
                },
                {
                    "butterflyId": 3,
                    "species": "ship5_but3",
                    "numberReceived": 25,
                    "numberReleased": 6,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 2,
                    "totalRemaining": 6
                },
                {
                    "butterflyId": 4,
                    "species": "ship5_but4",
                    "numberReceived": 23,
                    "numberReleased": 7,
                    "emergedInTransit": 3,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 5
                },
            ]
        },
        { id: 6, shipmentDate: "2024-07-10", arrivalDate: "2024-07-13", supplier: "ship6",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship6_but1",
                    "numberReceived": 30,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 2,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 2,
                    "species": "ship6_but2",
                    "numberReceived": 28,
                    "numberReleased": 6,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 2,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 11
                },
                {
                    "butterflyId": 3,
                    "species": "ship6_but3",
                    "numberReceived": 29,
                    "numberReleased": 7,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
                {
                    "butterflyId": 4,
                    "species": "ship6_but4",
                    "numberReceived": 27,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
            ]
        },
        { id: 7, shipmentDate: "2024-07-15", arrivalDate: "2024-07-18", supplier: "ship7",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship7_but1",
                    "numberReceived": 26,
                    "numberReleased": 7,
                    "emergedInTransit": 5,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 8
                },
                {
                    "butterflyId": 2,
                    "species": "ship7_but2",
                    "numberReceived": 28,
                    "numberReleased": 6,
                    "emergedInTransit": 5,
                    "damaged": 3,
                    "diseased": 2,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 3,
                    "species": "ship7_but3",
                    "numberReceived": 27,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 2,
                    "totalRemaining": 11
                },
                {
                    "butterflyId": 4,
                    "species": "ship7_but4",
                    "numberReceived": 29,
                    "numberReleased": 9,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
            ]
        },
        { id: 8, shipmentDate: "2024-07-20", arrivalDate: "2024-07-23", supplier: "ship8",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship8_but1",
                    "numberReceived": 30,
                    "numberReleased": 10,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 2,
                    "species": "ship8_but2",
                    "numberReceived": 28,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 11
                },
                {
                    "butterflyId": 3,
                    "species": "ship8_but3",
                    "numberReceived": 26,
                    "numberReleased": 7,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 11
                },
                {
                    "butterflyId": 4,
                    "species": "ship8_but4",
                    "numberReceived": 29,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 11
                },
            ]
        },
        { id: 9, shipmentDate: "2024-07-25", arrivalDate: "2024-07-29", supplier: "ship9",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship9_but1",
                    "numberReceived": 32,
                    "numberReleased": 12,
                    "emergedInTransit": 6,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 2,
                    "species": "ship9_but2",
                    "numberReceived": 30,
                    "numberReleased": 10,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
                {
                    "butterflyId": 3,
                    "species": "ship9_but3",
                    "numberReceived": 28,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
                {
                    "butterflyId": 4,
                    "species": "ship9_but4",
                    "numberReceived": 26,
                    "numberReleased": 8,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 11
                },
            ]
        },
        { id: 10, shipmentDate: "2024-08-01", arrivalDate: "2024-08-05", supplier: "ship10",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship10_but1",
                    "numberReceived": 33,
                    "numberReleased": 12,
                    "emergedInTransit": 6,
                    "damaged": 3,
                    "diseased": 1,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 2,
                    "species": "ship10_but2",
                    "numberReceived": 31,
                    "numberReleased": 10,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
                {
                    "butterflyId": 3,
                    "species": "ship10_but3",
                    "numberReceived": 29,
                    "numberReleased": 8,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
                {
                    "butterflyId": 4,
                    "species": "ship10_but4",
                    "numberReceived": 27,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
            ]
        },
        { id: 11, shipmentDate: "2024-08-10", arrivalDate: "2024-08-13", supplier: "ship11",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship11_but1",
                    "numberReceived": 30,
                    "numberReleased": 11,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
                {
                    "butterflyId": 2,
                    "species": "ship11_but2",
                    "numberReceived": 29,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 13
                },
                {
                    "butterflyId": 3,
                    "species": "ship11_but3",
                    "numberReceived": 28,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 13
                },
                {
                    "butterflyId": 4,
                    "species": "ship11_but4",
                    "numberReceived": 27,
                    "numberReleased": 10,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 10
                },
            ]
        },
        { id: 12, shipmentDate: "2024-08-20", arrivalDate: "2024-08-23", supplier: "ship12",
            "butterflyDetail": [
                {
                    "butterflyId": 1,
                    "species": "ship12_but1",
                    "numberReceived": 35,
                    "numberReleased": 12,
                    "emergedInTransit": 6,
                    "damaged": 3,
                    "diseased": 2,
                    "parasites": 2,
                    "poorEmergence": 1,
                    "totalRemaining": 9
                },
                {
                    "butterflyId": 2,
                    "species": "ship12_but2",
                    "numberReceived": 33,
                    "numberReleased": 10,
                    "emergedInTransit": 5,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 13
                },
                {
                    "butterflyId": 3,
                    "species": "ship12_but3",
                    "numberReceived": 31,
                    "numberReleased": 9,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 15
                },
                {
                    "butterflyId": 4,
                    "species": "ship12_but4",
                    "numberReceived": 29,
                    "numberReleased": 8,
                    "emergedInTransit": 4,
                    "damaged": 2,
                    "diseased": 1,
                    "parasites": 1,
                    "poorEmergence": 1,
                    "totalRemaining": 12
                },
            ]
        },
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div class="main-container">
            <Navbar authenticated={window.sessionStorage.getItem("authorizationLevel")}/>
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
                                <td>{formatDate(shipmentList.shipmentDate)}</td>
                                <td>{formatDate(shipmentList.arrivalDate)}</td>
                                <td>{shipmentList.supplier}</td>
                                <td>
                                    <Link to="/editshipment" state={currentShipments[index]}>
                                        <p style={{backgroundColor:"#469FCE", color:"#E1EFFE", margin:"0"}}>edit</p>
                                    </Link>
                                </td> 
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