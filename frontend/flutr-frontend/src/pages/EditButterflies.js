import Navbar from "../components/navbar";
import ButterflyEditCard from "../components/ButterflyEditCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import React, { useState } from "react";

const butterflies = [
  {
    id: 1,
    sci_name: "Firsticus Oneth",
    common_name: "The first one",
    lifespan: 1,
    image: "reiman-logo.png",
  },
  {
    id: 3,
    sci_name: "Triterfly",
    common_name: "The third one",
    lifespan: 3,
    image: "reiman-logo.png",
  },
  {
    id: 2,
    sci_name: "Biterfly",
    common_name: "The second one",
    lifespan: 2,
    image: "reiman-logo.png",
  },
];

export default function EditButterflies({ isMasterUser }) {
  const [changeList, setChangeList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [editPoints, setEditPoints] = useState(butterflies.map(() => -1));

  // Updates the change list with new values when a butterfly is edited
  const handleUpdate = (index, updatedValues) => {
    const updatedChangeList = [...changeList];
    const updatedEditPoints = [...editPoints];

    // Check if the butterfly has been edited before
    if (editPoints[index] === -1) {
      // If not, add a new entry
      updatedEditPoints[index] = updatedChangeList.length;
      updatedChangeList.push({
        id: butterflies[index].id,
        ...updatedValues,
      });
    } else {
      // If yes, update the existing entry
      updatedChangeList[editPoints[index]] = {
        id: butterflies[index].id,
        ...updatedValues,
      };
    }

    setChangeList(updatedChangeList);
    setEditPoints(updatedEditPoints);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Redirect or open add butterfly form");
    // Redirect To Add Butterfly Form
  };

  return (
    <div>
      <Navbar />
      <h3>Edit Butterflies</h3>
      <div>
        <div>
          <Container>
            <Row>
              <Col style={{ width: "100%", margin: "auto" }} onChange={handleChangeSearch}>
                <input />
              </Col>
              {isMasterUser && (
                <Col style={{ width: "100%", margin: "auto" }}>
                  <button onClick={handleAdd}>Add Butterfly</button>
                </Col>
              )}
            </Row>
          </Container>
        </div>
        <Container>
          <Row xs={1} sm={2} md={2} lg={3}>
            {butterflies
              .filter((r) => r.sci_name.toLowerCase().includes(searchInput.toLowerCase()))
              .map((r, index) => (
                <ButterflyEditCard
                  key={r.id}
                  butterfly={r}
                  index={index}
                  handleUpdate={handleUpdate}
                  common_name={editPoints[index] !== -1 ? changeList[editPoints[index]].common_name : r.common_name}
                  lifespan={editPoints[index] !== -1 ? changeList[editPoints[index]].lifespan : r.lifespan}
                />
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}