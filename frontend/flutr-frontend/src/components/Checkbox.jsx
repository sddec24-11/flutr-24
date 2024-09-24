import React, {useState} from 'react';
import "./Checkbox.css"

export default function Checkbox({state, setState}){
    const [boxColor, setColor] = useState((color) => state === true ? "#469FCE" : "#8ABCD7");

    const handleChange = (e) =>{
        e.preventDefault();
        if(state){
            setColor("#8ABCD7");
        }
        else{
            setColor("#469FCE");
        }
        setState(!state);
        console.log("This is now " + state + " and " + boxColor);
    }
    return(
        <div>
            <div className="outerBox" onClick={handleChange} style={{width: '40px', height: '40px'}}>
                <div className="innerBox" style={{backgroundColor: boxColor, width: '68w%', height:'68%',margin: 'auto', marginTop: '16%', borderRadius: '15px'}}></div>
            </div>
        </div>
    )
}