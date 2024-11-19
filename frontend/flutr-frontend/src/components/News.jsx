export default function News({content, colorScheme, image}){
    return(
        <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px', textAlign: 'center'}}>
            <h3 style={{color: colorScheme[0], paddingTop: '10px'}}>News</h3>
            <div style={{width: '85%', margin: 'auto'}}>
                <p style={{color: colorScheme[0], padding: '15px'}}>{content}</p>
                {image !== null && <img src={image} alt="Image to accompany news not loaded..." style={{width: '100%', marginBottom: '15px'}}/>}
            </div>
        </div>
    )
}