import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Location_card({location, index}){
    console.log("AHFABNFa");
    return(
        
        <Col key={index}>
            <a href={'/' + location.path} style={{width:'100%'}}>
                <Card style={{  backgroundColor: "#E1EFFE", borderRadius: '15px', border: '4px solid #8ABCD7', alignItems: 'center',justifyContent: 'center', margin: '10px'}}>
                    <Card.Img variant="top" style={{width: '100%', padding: '0', borderRadius: '11px'}} src={require(`../images/${location.image}`)} />
                    <Card.Body>
                        <Card.Title>{location.name}</Card.Title>
                        <Card.Text>{location.address}</Card.Text>
                    </Card.Body>    
                </Card>
            </a>
        </Col>
        
    );
}


function RowColLayoutColWidthBreakpointExample() {
  return (
    <Container>
      <Row xs={1} sm={2} md={4}>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col>3 of 3</Col>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col>3 of 3</Col>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col>3 of 3</Col>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

// export default RowColLayoutColWidthBreakpointExample;
export default Location_card;