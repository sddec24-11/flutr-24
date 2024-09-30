import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import SocialModal from "../components/SocialModal";
import PageTitle from "../components/PageTitle";

export default function Stats({data, kioskMode}){
    const [insta, setInsta] = useState(false);
    const [fb, setFB] = useState(false);
    const [x, setX] = useState(false);
    const [yt, setYT] = useState(false);


  const handleClose = () => {
    setInsta(false);
    setFB(false);
    setX(false);
    setYT(false);
  }
  const handleInsta = () => setInsta(true);
  const handleFB = () => setFB(true);
  const handleX = () => setX(true);
  const handleYT = () => setYT(true);
    return(
        <div>
            <Navbar location={data} kioskMode={kioskMode}/>
            <PageTitle title={data.name + "'s Statistics"}/>
            <SocialModal show={insta} handleClose={handleClose} type={"Instagram"} link={data.socialMedia.instagram}/>
            <SocialModal show={fb} handleClose={handleClose} type={"Facebook"} link={data.socialMedia.facebook}/>
            <SocialModal show={x} handleClose={handleClose} type={"X"} link={data.socialMedia.x}/>
            <SocialModal show={yt} handleClose={handleClose} type={"YouTube"} link={data.socialMedia.youtube}/>
                <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: data.colorScheme.primary}}><strong>Statistics</strong></h2>
                </div>
                <div style={{backgroundColor: "#FFFFFF", borderRadius: "15px", width: "50%"}}>
                    
                </div>
                <Footer location={data} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>

        </div>
    )
}