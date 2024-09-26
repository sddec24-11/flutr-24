import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Stats({data}){
    return(
        <div>
            <Navbar location={data}/>
                <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: data.colorScheme.primary}}><strong>Statistics</strong></h2>
                </div>
                <div style={{backgroundColor: "#FFFFFF", borderRadius: "15px", width: "50%"}}>

                </div>
            <Footer location={data}/>
        </div>
    )
}