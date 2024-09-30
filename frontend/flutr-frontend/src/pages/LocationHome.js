import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LocationHome({data}){
    return(
        <div class="main-container">
            <Navbar location={data} authenticated={true}/>
            <h1>{data.name} Home</h1>
            <Footer location={data}/>
        </div>
    )
}