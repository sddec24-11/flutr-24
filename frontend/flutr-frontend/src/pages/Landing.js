import Navbar from "../components/navbar";
import Location_card from "../components/locationCard";
import Row from 'react-bootstrap/Row';
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.css";

export default function Landing({data}){
    return(
        <div style={{width: "100%"}}>
                <Navbar />
                <h1>Landing Page</h1>
                <div>
                    <div class="mx-auto">
                        <Row xs={1} md={2} lg={4} className="g-4">
                            {data.map((r, index) => {
                                console.log(`${r.name}`)
                                return(
                                    <Location_card location={r}/>
                                )
                            })}
                        </Row>
                    </div>
                </div>
                <Footer />
        </div>
        
    )
}