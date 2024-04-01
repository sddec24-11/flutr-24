import Navbar from "../components/navbar";

export default function Gallery({data}){
    return(
        <div>
            <Navbar location={data}/>
            <h1>{data.name}'s Gallery</h1>
        </div>
    )
}