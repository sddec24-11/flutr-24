import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About(){
    return(
        <div class="main-container">
            <Navbar />
            <div style={{width: '100%', height: '100%'}}>
                <div style={{border: '4px solid #469FCE', background: '#F5F5F5', margin: '5% 20%', borderRadius: '15px'}}>
                    <h2 style={{margin: ''}}>About</h2>
                    <div style={{padding: '10%'}}>
                        <p>Flutr is an All-In-One platform for butterfly houses to track their shipments and releases, while providing guests with a live look into the butterflies in the pavalion. 
                            <br />
                            <br />For houses, you are able to input the butterflies received from suppliers and track when each butterfly released into the pavilion. The system will automatically track which butterflies are in flight and provide unique stats for guests to see. Houses are also able to import and export previous shipment data for reports and tracking.
                            <br />
                            <br />For new houses looking to add your pavilion, contact flutr@iastate.edu for more information
                            <br />
                            <br />The Flutr application was created by a Senior Design group from Iowa State University in 2024
                            <br /> <a href="https://sddec24-11.sd.ece.iastate.edu/">Check out the team!</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}