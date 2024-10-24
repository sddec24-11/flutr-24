import { useState } from "react";
import React, { useRef } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/addShipmentStyles.css";

export default function MasterEdit(){

    // { id: 1, shipmentDate: "2024-06-15", arrivalDate: "2024-06-19", supplier: "ship1",
    //     "butterflyDetail": [
    //         {
    //             "butterflyId": 1,
    //             "species": "ship1_but1",
    //             "numberReceived": 10,
    //             "numberReleased": 3,
    //             "emergedInTransit": 2,
    //             "damaged": 1,
    //             "diseased": 1,
    //             "parasites": 1,
    //             "poorEmergence": 1,
    //             "totalRemaining": 1
    //         },

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

    const releaseDateInputRef = useRef(null);

    const [shipDate, setShipDate] = useState('');
    const [curShip, setCurShip] = useState([]);
    const [butterflyData, setButterflyData] = useState([]);
    const [activeTab, setActiveTab] = useState('table1');

    const selectShipment = (shipDateSelect) => {
        const shipDate = shipDateSelect.target.value;
        setShipDate(shipDate);

        const foundShip = shipmentList.find(shipment => shipment.shipmentDate === shipDate);
        console.log(foundShip);

        if (foundShip != null)
        {
            setCurShip(foundShip);
            const foundButterflies = foundShip.butterflyDetail;
            console.log(foundButterflies);
            setButterflyData(foundButterflies);
        }
        else
        {
            setCurShip([]);
            setButterflyData([]);
        }
        // setCurShip(foundShip ? [foundShip] : []);

        
    }

    const incrementVal = (butterflyId, key) => {
        setButterflyData(butterflyData.map(item => {
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
        setButterflyData(butterflyData.map(item => {
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

    // const submit = () => {
    //     const newShipment = {
    //         id: 40,
    //         numberReleased: releaseDateInputRef.current.value,
    //         butterflyDetail: data,
    //     };
    //     console.log(newShipment);
    // };


    const renderTable1 = () => (
        <table className="add-table" style={{borderTopLeftRadius: '0px'}}>
                    <thead>
                        <tr>
                            <th style={{width:"35%"}}>Species</th>
                            <th>Emerged</th>
                            <th>Poor Emergence</th>
                            <th style={{width:"15%"}}>Total Received</th>
                            <th style={{width:"15%"}}>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {butterflyData.map(item => (
                        <tr key={item.butterflyId}>
                            <td style={{textAlign: 'left', paddingLeft: '4%'}}>
                                {item.species}
                            </td>
                            <td>{/* emerged */}
                                <button onClick={() => incrementVal(item.butterflyId, 'emerged')}>+</button>
                                <div className="value-box">{}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'emerged')}>-</button>
                            </td>
                            <td>{/* poor emergence */}
                                <button onClick={() => incrementVal(item.butterflyId, 'poorEmergence')}>+</button>
                                <div className="value-box">{item.poorEmergence}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'poorEmergence')}>-</button>
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#469FCE'}}>
                                {item.numberReceived}
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#E4976C'}}>
                                {item.totalRemaining}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
    );

    const renderTable2 = () => (
        <table className="add-table" style={{borderTopLeftRadius: '0px'}}>
                    <thead>
                        <tr>
                            <th style={{width:"35%"}}>Species</th>
                            <th>Diseased</th>
                            <th>Parasites</th>
                            <th>No Emergence</th>
                            <th style={{width:"15%"}}>Total Received</th>
                            <th style={{width:"15%"}}>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {butterflyData.map(item => (
                        <tr key={item.butterflyId}>
                            <td style={{textAlign: 'left', paddingLeft: '4%'}}>
                                {item.species}
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
                            <td>
                                <button onClick={() => incrementVal(item.butterflyId, 'noEmergence')}>+</button>
                                <div className="value-box">{}</div>
                                <button onClick={() => decrementVal(item.butterflyId, 'noEmergence')}>-</button>
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#469FCE'}}>
                                {item.numberReceived}
                            </td>
                            <td style = {{color:'#E1EFFE', backgroundColor:'#E4976C'}}>
                                {item.totalRemaining}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
    );

    return (
        <div class="main-container">
            <Navbar />
            <h1 className="add-shipments-header">Add Release</h1>
            
            <div class="border-all">
                <div className="ship-info-input">
                    <div class="input-group">
                        <label for="releasedate">Release Date: </label>
                        <input type="date" id="releasedate" name="release-date" ref={releaseDateInputRef}/>
                    </div>
                    <div class="input-group">
                        <label for="shipdate">Shipment Date: </label>
                        <input type="date" id="shipdate" name="shipment-date" onChange={selectShipment} value={shipDate || ''}/>
                    </div>
                </div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '2.5%'}}>
                <button class="tab-btn" 
                    style={{backgroundColor: activeTab === 'table1' ? '#469FCE' : '#8ABCD7', border: activeTab === 'table1' ? '1px solid #469FCE' : '1px solid #8ABCD7'}} 
                    onClick={() => setActiveTab('table1')}>Good/Poor</button>
                <button class="tab-btn" 
                    style={{backgroundColor: activeTab === 'table2' ? '#469FCE' : '#8ABCD7', border: activeTab === 'table2' ? '1px solid #469FCE' : '1px solid #8ABCD7'}} 
                    onClick={() => setActiveTab('table2')}>Other</button>
            </div>
            <div className="add-shipments-table-container">
                {activeTab === 'table1' && renderTable1()}
                {activeTab === 'table2' && renderTable2()}  
            </div>

            <div class="submit-cancel-buttons">
                <button type="button" class="btn cancel-btn">Cancel</button>
                <button type="submit" class="btn submit-btn">
                            Submit
                </button>
            </div>
            
            <Footer />
        </div>
    );
}
