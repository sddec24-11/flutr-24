export default function BOTD({butterfly, colorScheme, numberInFlight}){
    var plural = "Continent of origin: ";
    if (butterfly.coo.length > 1){
        plural = "Continents of origin: ";
    }
    return(
        <div>
            <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px'}}>
                <h3 style={{color: colorScheme.primary}}>Butterfly of the Day</h3>
                <image style={{borderRadius: '10px'}}></image>
                <h4 style={{color: colorScheme.primary}}>{butterfly.common_name}</h4>
                <h5 style={{color: colorScheme.secondary}}><i>{butterfly.sci_name}</i></h5>
                <p style={{color: colorScheme.secondary}}><strong>Number in flight: </strong>{numberInFlight}</p>
                <p style={{color: colorScheme.secondary}}><strong>{plural}</strong><ul>{butterfly.coo.map((r) => {
                    return (<li>{r}</li>)
                })}</ul></p>
                <p style={{color: colorScheme.secondary}}><strong>Fan fact: </strong>{butterfly.fun_fact}</p>
                <button style={{backgroundColor: colorScheme.primary, color: "#FFFFFF"}}>View Gallery</button>
            </div>
        </div>
    )
}