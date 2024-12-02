import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function Location_card({location, index}){
    return(
        <Col key={index}>
            <a 
                href={'/' + location.subdomain} 
                style={{ width: '100%' }}
            >
                <Card 
                    style={{
                        backgroundColor: "#E1EFFE",
                        borderRadius: '15px',
                        border: '4px solid #8ABCD7',
                        margin: '10px',
                        height: '350px', // Consistent card height
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Ensures content stays spaced
                        alignItems: 'center',
                        overflow: 'hidden', // Prevents overflow of content
                    }}
                >
                    <Card.Img 
                        variant="top" 
                        style={{
                            width: '100%',
                            height: '200px', // Fixed height for images
                            objectFit: 'cover', // Ensures images fill the area without distortion
                            borderRadius: '11px 11px 0 0',
                        }} 
                        src={location.facilityImage} 
                    />
                    <Card.Body 
                        style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Card.Title>{location.name}</Card.Title>
                        <Card.Text>{location.address}</Card.Text>
                    </Card.Body>    
                </Card>
            </a>
        </Col>


        // <Col key={index}>
        //     <a href={'/' + location.subdomain} style={{width:'100%'}}>
        //         <Card style={{  backgroundColor: "#E1EFFE", borderRadius: '15px', border: '4px solid #8ABCD7', alignItems: 'center',justifyContent: 'center', margin: '10px'}}>
        //             <Card.Img variant="top" style={{width: '100%', padding: '0', borderRadius: '11px'}} src={location.facilityImage} />
        //             <Card.Body>
        //                 <Card.Title style={{alignContent: 'center'}}>{location.name}</Card.Title>
        //                 <Card.Text>{location.address}</Card.Text>
        //             </Card.Body>    
        //         </Card>
        //     </a>
        // </Col>
        
    );
}

export default Location_card;