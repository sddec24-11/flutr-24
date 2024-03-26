import Navbar from "../components/navbar";

export default function LocationHome({data}){
    return(
        <div>
            <Navbar location={data}/>
            <h1>{data.name} Home</h1>
        </div>
    )
}