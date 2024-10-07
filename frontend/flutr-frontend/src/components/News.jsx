export default function News({content, colorScheme}){
    return(
        <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px', textAlign: 'center'}}>
            <h3 style={{color: colorScheme.primary, paddingTop: '10px'}}>News</h3>
            <div style={{width: '85%', margin: 'auto'}}><p style={{color: colorScheme.secondary, padding: '15px'}}>{content}</p></div>
        </div>
    )
}