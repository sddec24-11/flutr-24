import Navbar from "../components/navbar";

export default function LocationHome({data}){
    return(
        <div>
            <Navbar />
            <h1>{data.name} Home</h1>
        </div>
    )
}