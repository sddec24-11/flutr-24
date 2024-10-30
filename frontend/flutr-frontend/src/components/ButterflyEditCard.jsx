import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function ButterflyEditCard({
  butterfly,
  index,
  handleUpdate,
  commonName,
  lifespan,
}) {
  const [common, setCommon] = useState(commonName);
  const [life, setLifespan] = useState(lifespan);

  // Handle changes to the common name
  const handleCommonChange = (e) => {
    setCommon(e.target.value); // Update local state
    handleUpdate(index, { commonName: e.target.value, lifespan: life }); // Inform parent about changes
  };

  // Handle changes to the lifespan
  const handleLifespanChange = (e) => {
    setLifespan(e.target.value); // Update local state
    handleUpdate(index, { commonName: common, lifespan: e.target.value }); // Inform parent about changes
  };

  return (
    <Col key={index}>
      <Card
        style={{
          backgroundColor: "#E1EFFE",
          borderRadius: "15px",
          border: "4px solid #8ABCD7",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <Card.Img
          variant="top"
          style={{ width: "100%", padding: "0", borderRadius: "11px" }}
          src={butterfly.imgWingsOpen}
        />
        <Card.Body>
          <Card.Title style={{ alignContent: "center" }}>{butterfly.buttId}</Card.Title>
          {/* <Card.Text>Common name:</Card.Text>
          <input value={common} onChange={handleCommonChange} /> */}
          <Card.Text>Lifespan (days)</Card.Text>
          <input value={life} onChange={handleLifespanChange} />
        </Card.Body>
      </Card>
    </Col>
  );
}