import Navbar from "../components/navbar"
import ButterflyEditCard from "../components/ButterflyEditCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import React, {useState} from 'react';

const butterflies = [
    {
        id: 1,
        sci_name: "Firsticus Oneth",
        common_name: "The first one",
        lifespan: 1,
        image: "reiman-logo.png",
    },
    {
        id: 3,
        sci_name: "Triterfly",
        common_name: "The third one",
        lifespan: 3,
        image: "reiman-logo.png",
    },
    {
        id: 2,
        sci_name: "Bi",
        common_name: "The second one",
        lifespan: 2,
        image: "reiman-logo.png",
    },
];

export default function EditButterflies(){
    const [changeList, setChangeList] = useState([]);

    return (
        <div>
            <Navbar/>
            <div>
                <Container>
                    <Row xs={1} sm={2} md={2} lg={3}>
                        {butterflies.map((r) => {
                            return(
                                <ButterflyEditCard butterfly={r} changeList={changeList} />
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    )
}