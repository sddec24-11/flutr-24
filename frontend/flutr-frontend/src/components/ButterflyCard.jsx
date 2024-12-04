import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function ButterflyCard({butterfly, index}){
    return(
        <Col key={index}>
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
            overflow: 'hidden',
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
          src={butterfly.imgWingsOpen === null
          ? butterfly.imgWingsClosed
          : butterfly.imgWingsOpen}
        />
        <Card.Body>
          <Card.Title style={{ alignContent: "center" }}>
            <i>{butterfly.buttId}</i>
          </Card.Title>
          <Card.Text>
            <strong>{butterfly.commonName}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
        // <Col key={index}>
        //     <Card
        //         style={{
        //         backgroundColor: "#E1EFFE",
        //         borderRadius: "15px",
        //         border: "4px solid #8ABCD7",
        //         alignItems: "center",
        //         justifyContent: "center",
        //         margin: "10px",
        //         }}
        //     >
        //         <Card.Img
        //         variant="top"
        //         style={{ width: "100%", padding: "0", borderRadius: "11px" }}
                // src={butterfly.imgWingsOpen === null || butterfly.imgWingsOpen === "https://flutr-butt-images.nyc3.cdn.digitaloceanspaces.com/unknown.png"
                // ? butterfly.imgWingsClosed
                // : butterfly.imgWingsOpen}
        //         />
        //         <Card.Body>
        //         <Card.Title style={{ alignContent: "center" }}><i>{butterfly.buttId}</i></Card.Title>
        //         <Card.Text><strong>{butterfly.commonName}</strong></Card.Text>
        //         </Card.Body>
        //     </Card>
        // </Col>

    )
}