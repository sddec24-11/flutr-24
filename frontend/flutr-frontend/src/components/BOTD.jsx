export default function BOTD({butterfly, colorScheme, buttonFunction}){
    var plural = "Continent of origin: ";
    if (butterfly.range.length > 1){
        plural = "Continents of origin: ";
    }

    return(
        <div>
            <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px', paddingTop: '16px', marginBottom: '16px'}}>
                <div style={{textAlign: 'center'}}>
                    <h3 style={{color: colorScheme[0]}}>Butterfly of the Day</h3>
                    <img src={butterfly.imgWingsOpen} style={{borderRadius: '10px', width: '75%'}}></img>
                    <h4 style={{color: colorScheme[0]}}>{butterfly.commonName}</h4>
                    <h5 style={{color: colorScheme[0]}}><i>{butterfly.buttId}</i></h5>
                    <div style={{textAlign: 'left', width: '75%', margin: 'auto'}}>
                        <p style={{color: colorScheme[0]}}><strong>Number in flight: </strong>{butterfly.noInFlight}</p>
                        <p style={{color: colorScheme[0]}}><strong>{plural}</strong><ul>{butterfly.range.map((r) => {
                            return (<li>{r}</li>)
                        })}</ul></p>
                        <p style={{color: colorScheme[0]}}><strong>Fun fact: </strong>{butterfly.funFacts}</p>
                    </div>
                    <button onClick={buttonFunction} style={{backgroundColor: colorScheme[0], color: "#FFFFFF", width: '25%', paddingTop:'15px', paddingBottom: '15px', borderRadius: '15px', marginTop: '15px', marginBottom: '15px'}}>View Gallery</button>
                </div>
                
            </div>
        </div>
    )
}