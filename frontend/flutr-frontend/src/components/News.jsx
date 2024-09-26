export default function News({content, colorScheme}){
    return(
        <div style={{backgroundColor: "#FFFFFF", borderRadius: '10px'}}>
            <h3 style={{color: colorScheme.primary}}>News</h3>
            <p style={{color: colorScheme.secondary}}>{content}</p>
        </div>
    )
}