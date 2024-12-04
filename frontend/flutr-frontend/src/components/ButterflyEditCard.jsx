import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function ButterflyEditCard({
  butterfly,
  handleUpdate,
}) {
  const [common, setCommon] = useState(butterfly.commonName);
  const [life, setLifespan] = useState(butterfly.lifespan);


  // Handle changes to the common name
  const handleCommonChange = (e) => {
    setCommon(e.target.value); // Update local state
    handleUpdate(butterfly.buttId, { commonName: e.target.value, lifespan: life }); // Inform parent about changes
  };

  // Handle changes to the lifespan
  const handleLifespanChange = (e) => {
    setLifespan(e.target.value); // Update local state
    handleUpdate(butterfly.buttId, { commonName: common, lifespan: e.target.value }); // Inform parent about changes
  };

  return (
    <Col key={butterfly.buttId}>
      <Card
        style={{
          backgroundColor: "#E1EFFE",
            borderRadius: '15px',
            border: '4px solid #8ABCD7',
            margin: '10px',
            height: '450px', // Consistent card height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Ensures content stays spaced
            alignItems: 'center',
            overflow: 'hidden',
        }}
      >
        <Card.Img
          variant="top"
          style={{
            width: '100%',
            height: '250px', // Fixed height for images
            objectFit: 'cover', // Ensures images fill the area without distortion
            borderRadius: '11px 11px 0 0'
          }}
          src={butterfly.imgWingsOpen}
        />
        <Card.Body>
          <Card.Title style={{ alignContent: "center" }}>{butterfly.buttId}</Card.Title>
          <Card.Text>Common name:</Card.Text>
          <input value={common} onChange={handleCommonChange} />
          <Card.Text>Lifespan (days)</Card.Text>
          <input value={life} onChange={handleLifespanChange} />
        </Card.Body>
      </Card>
    </Col>
  );
}