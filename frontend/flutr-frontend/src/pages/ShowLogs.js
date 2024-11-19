import { useState, useEffect } from "react";

export default function ShowLogs(){
    const [logs, setLogs] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const authorizationLevel = window.sessionStorage.getItem("authorizationLevel");
        if (authorizationLevel !== "SUPERUSER" && authorizationLevel !== "ADMIN") {
            alert("Sorry, you can't view this page");
            document.location.href = "/login";
        }
    }, []);
    useEffect(() => {
        const fetchLogs = async () => {
            try{
              const response = await fetch(`http://206.81.3.155:8282/api/logs/allLogs`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': window.sessionStorage.getItem("accessKey")
              },
              });
              response.json().then(json => {
                if(json.success){
                    setLogs(json.payload);
                    console.log(json.payload);
                    setLoading(true);
                }
              });
            } catch (error) {
              console.error("Failed to fetch logs:", error);
            } finally {
              
            }
            
          };
          fetchLogs();
    })
    return(
        <div>
            {loading ? <p style = {{textAlign: 'center'}}>Loading...</p> :
            <div>
                {/* {logs.map((log) => {
                    <p>hello</p>
                })} */}
            </div>
                }
        </div>
    )
}