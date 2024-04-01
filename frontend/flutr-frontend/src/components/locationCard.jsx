import Card from 'react-bootstrap/Card';

function Location_card({location}){
    console.log("AHFABNFa");
    return(
        <a href={'/' + location.path}>
            <Card className="flex-fill" style={{ width: '15rem', height: 'auto', backgroundColor: location.color, borderRadius: '20px', border: '3px solid black', display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
                <Card.Img variant="top" style={{padding: '10px', width: '15rem', height:'auto'}} src={require(`../images/${location.logo}`)} />
            </Card>
        </a>
    );
}
export default Location_card;