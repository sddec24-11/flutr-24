import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LocationHome({data}){
    return(
        <div>
            <Navbar location={data}/>
            <h1>{data.name} Home</h1>
            <Footer location={data}/>
        </div>
    )
}