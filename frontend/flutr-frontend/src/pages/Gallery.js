import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Gallery({data}){
    return(
        <div>
            <Navbar location={data}/>
            <h1>{data.name}'s Gallery</h1>
            <Footer location={data}/>
        </div>
    )
}