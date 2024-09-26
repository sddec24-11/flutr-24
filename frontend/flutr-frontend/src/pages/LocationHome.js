import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BOTD from "../components/BOTD";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import News from "../components/News";

const butterfly = {
    common_name: "Common Name",
    sci_name: "Scientific Name",
    fun_fact: "Something fun",
    coo: ["Bermuda","Jamaica"]
}

const colorScheme = {
    primary: "#087648",
    secondary: "#7DAD87",
    background: "#96C09F"
}

const stats = {butterflyCount: 123, speciesCount: 45}

export default function LocationHome({data}){
    return(
        <div style={{backgroundColor: colorScheme.background}}>
            <Navbar location={data} authenticated={true}/>
            <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: colorScheme.primary}}><strong>{data.name}</strong></h2>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: colorScheme.secondary}}>Subheading?</p>
            </div>
            <div style={{width: "90%", margin: "auto"}}>
                <Container>
                    <Row xs={1} sm={2} md={2}>
                        <Col style={{paddingTop: '16px'}}><BOTD numberInFlight={3} butterfly={butterfly} colorScheme={colorScheme}/></Col>
                        <Col style={{paddingTop: '16px'}}>
                            <div>
                                <News colorScheme={colorScheme} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas sapien ac ligula efficitur rhoncus. Sed faucibus augue ultricies sagittis ultricies. Sed nec suscipit leo. In imperdiet vestibulum quam. Proin vel mi scelerisque, eleifend lacus ut, sodales erat. Phasellus mattis ultricies elit et cursus. Nam finibus nisi sed elit placerat ornare. Suspendisse eu consectetur ex, eu tincidunt odio. Fusce pretium purus non congue varius. "}/>
                                <div style={{borderRadius: '10px', backgroundColor: '#FFFFFF'}}>
                                    <h3>Statistics</h3>
                                    <div style={{backgroundColor: colorScheme.secondary}}>
                                        <h1 style={{color: colorScheme.primary}}>{stats.butterflyCount}</h1>
                                        <h4 style={{color: colorScheme.primary}}>butterflies in flight</h4>
                                        <h1 style={{color: colorScheme.primary}}>{stats.speciesCount}</h1>
                                        <h4 style={{color: colorScheme.primary}}>species in flight</h4>
                                    </div>
                                    <div>
                                        <button style={{backgroundColor: colorScheme.primary}}>See More</button>
                                    </div>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                </Container>
            </div>
            <Footer location={data}/>
        </div>
    )
}