import Navbar from "../components/navbar";
import Location_card from "../components/locationCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Landing({data}){
    return(
        <div>
            <Navbar />
            <h1>Landing Page</h1>
            <Row xs={2} md={2} lg={3} className="g-4">
                <Col className="col-6">
                    {data.map((r, index) => {
                        console.log(`${r.name}`)
                        return(
                            <Location_card location={r}/>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}