import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default function ButterflyEditCard({butterfly, changeList}){
    const [common, setCommon] = useState(butterfly.common_name);
    const [lifespan, setLifespan] = useState(butterfly.lifespan);
    const [changePoint, setChangePoint] = useState(-1);

    const addToChangeList = () => {
        if(changePoint === -1){
            setChangePoint(changeList.length)
            changeList.push(
                {
                    id: butterfly.id,
                    common_name: common,
                    lifespan: lifespan
                }
            )
        }
        else{
            changeList[changePoint] = {
                id: butterfly.id,
                common_name: common,
                lifespan: lifespan
            }
        }
        console.log(changeList);
    }

    const handleCommonChange = (e) => {
        e.preventDefault();
        setCommon(e.target.value);
        addToChangeList();
    }
    const handleLifespanChange = (e) => {
        e.preventDefault();
        setLifespan(e.target.value);
        addToChangeList();
    }
    
    return(
        <Col key={butterfly.id}>
                <Card style={{  backgroundColor: "#E1EFFE", borderRadius: '15px', border: '4px solid #8ABCD7', alignItems: 'center',justifyContent: 'center', margin: '10px'}}>
                    <Card.Img variant="top" style={{width: '100%', padding: '0', borderRadius: '11px'}} src={require(`../images/${butterfly.image}`)} />
                    <Card.Body>
                        <Card.Title style={{alignContent: 'center'}}>{butterfly.sci_name}</Card.Title>
                        <Card.Text>Common name:</Card.Text>
                        <input value={common} onChange={handleCommonChange}></input>
                        <Card.Text>Lifespan (days)</Card.Text>
                        <input value={lifespan} onChange={handleLifespanChange}></input>
                    </Card.Body>    
                </Card>
        </Col>
        
    );
}