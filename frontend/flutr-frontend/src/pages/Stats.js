import Navbar from "../components/navbar";

export default function Stats({data}){
    return(
        <div>
            <Navbar />
            <h1>{data.name}'s Stats</h1>
        </div>
    )
}