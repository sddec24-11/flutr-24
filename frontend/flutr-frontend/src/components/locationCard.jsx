import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function Location_card({location, index}){
    console.log("AHFABNFa");
    return(
        <a href={'/' + location.path} style={{width:'27.6%'}}>
            <Col key={index} style={{width:'100%'}}>
                <Card style={{ width: '100%', height: '318px', backgroundColor: "#E1EFFE", borderRadius: '15px', border: '4px solid #8ABCD7', alignItems: 'center',justifyContent: 'center', margin: '10px'}}>
                    <Card.Img variant="top" style={{width: '100%', height:'160px', padding: '0', borderRadius: '11px'}} src={require(`../images/${location.image}`)} />
                    <Card.Body>
                        <Card.Title>{location.name}</Card.Title>
                        <Card.Text>{location.address}</Card.Text>
                    </Card.Body>    
                </Card>
            </Col>
        </a>
    );
}
export default Location_card;