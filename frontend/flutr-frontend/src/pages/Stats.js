import Navbar from "../components/navbar";

export default function Stats({data}){
    return(
        <div>
            <Navbar location={data}/>
            <h1>{data.name}'s Stats</h1>
        </div>
    )
}