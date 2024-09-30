import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Stats({data}){
    return(
        <div class="main-container">
            <Navbar location={data}/>
            <h1>{data.name}'s Stats</h1>
            <Footer location={data}/>
        </div>
    )
}