import React, {useEffect} from "react";
export default function Logout(){
    useEffect(() => {
        window.sessionStorage.removeItem("accessKey");
        window.sessionStorage.removeItem("authenticated");
        window.sessionStorage.removeItem("authorizationLevel");
        window.sessionStorage.removeItem("houseID");
        document.location.href = "/login";
    });
    
    return (
        <div></div>
    )
}