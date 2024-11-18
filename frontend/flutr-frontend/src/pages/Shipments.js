import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import "../styles/shipmentsStyles.css";


export default function Shipments() {
    const [shipmentList, setShipmentList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;

    useEffect(() => {
        if(!window.sessionStorage.getItem("authorized")){
            alert("Sorry, you cant view this page.");
            document.location.href = '/login';
        }
    }, []);

    // Function to fetch shipments
    useEffect(() => {
        const maxRetries = 3;

        const fetchShipments = async (retries = maxRetries) => {
            try {
                const response = await fetch("api/shipments/view/all", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem("accessKey")
                    }
                });

                const message = await response.json();

                if (message.error == null) {
                    setShipmentList(message.payload.reverse());
                    setLoading(false);
                } else {
                    console.error("Fetch attempt failed with error: ", error.message);
                    setError("Failed to load shipments.");
                }
            } catch (error) {
                console.error("Fetch attempt failed with error:", error.message);

                if (retries > 0) {
                    console.log(`Retrying... Attempts left: ${retries - 1}`);
                    setTimeout(() => fetchShipments(retries - 1), 1000);
                } else {
                    setError('Failed to load shipments after multiple attempts.');
                    console.error("Failed to load shipments after retries:", error);
                    setLoading(false);
                }
            }
        };

        fetchShipments();
    }, []);

    const totalPages = Math.ceil(shipmentList.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentShipments = shipmentList.slice(startIndex, startIndex + rowsPerPage);

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
    
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
    
        return `${month}/${day}/${year}`;
    };

    return (
        <div class="main-container">
            <Navbar />
            <h1 className="shipments-header">Shipments</h1>

            {loading ? (
                <p style = {{textAlign: 'center'}}>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="shipments-table-container">
                    <table className="paging-table">
                        <thead>
                            <tr>
                                <th>Shipment Date</th>
                                <th>Arrival Date</th>
                                <th>Supplier</th>
                                <th style={{ width: "100px" }}></th>
                                <th style={{ width: "100px" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentShipments.map((shipment) => (
                                <tr key={shipment.shipmentId}>
                                    <td>{formatDate(shipment.shipmentDate)}</td>
                                    <td>{formatDate(shipment.arrivalDate)}</td>
                                    <td>{shipment.abbreviation}</td>
                                    <td>
                                        <Link to="/addrelease" state={shipment}>
                                            <p style={{ backgroundColor: '#E4976C', color: "#E1EFFE", margin: "0" }}>release</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="/editshipment" state={shipment}>
                                            <p style={{ backgroundColor: "#469FCE", color: "#E1EFFE", margin: "0" }}>edit</p>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="paging-row">
                <div className="paging-column">
                    <button onClick={prevPage} disabled={currentPage === 1} style={{ marginLeft: "70%" }}>
                        Previous
                    </button>
                </div>
                <div className="paging-column" style={{ width: "14%" }}>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
                <div className="paging-column">
                    <button onClick={nextPage} disabled={currentPage === totalPages} style={{ marginRight: "70%" }}>
                        Next
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}