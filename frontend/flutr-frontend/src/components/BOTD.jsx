export default function BOTD({butterfly, colorScheme, numberInFlight, buttonFunction}){
    var plural = "Continent of origin: ";
    if (butterfly.coo.length > 1){
        plural = "Continents of origin: ";
    }
    return(
        <div>
            <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px', paddingTop: '16px', marginBottom: '16px'}}>
                <div style={{textAlign: 'center'}}>
                    <h3 style={{color: colorScheme.primary}}>Butterfly of the Day</h3>
                    <img src={require(`../images/butterfly.jpeg`)} style={{borderRadius: '10px', width: '75%'}}></img>
                    <h4 style={{color: colorScheme.primary}}>{butterfly.common_name}</h4>
                    <h5 style={{color: colorScheme.secondary}}><i>{butterfly.sci_name}</i></h5>
                    <div style={{textAlign: 'left', width: '75%', margin: 'auto'}}>
                        <p style={{color: colorScheme.secondary}}><strong>Number in flight: </strong>{numberInFlight}</p>
                        <p style={{color: colorScheme.secondary}}><strong>{plural}</strong><ul>{butterfly.coo.map((r) => {
                            return (<li>{r}</li>)
                        })}</ul></p>
                        <p style={{color: colorScheme.secondary}}><strong>Fan fact: </strong>{butterfly.fun_fact}</p>
                    </div>
                    <button onClick={buttonFunction} style={{backgroundColor: colorScheme.primary, color: "#FFFFFF", width: '25%', paddingTop:'15px', paddingBottom: '15px', borderRadius: '15px', marginTop: '15px', marginBottom: '15px'}}>View Gallery</button>
                </div>
                
            </div>
        </div>
    )
}