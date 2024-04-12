import { useState } from "react";
import styles from './Footer.module.css';

function Footer({location}){
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };
    
    //clean up function to remove the active class
    const removeActive = () => {
      setIsActive(false)
    }
    // const [pickColor, setPickColor] = useState("#dbeafe");
    if(location != null){
      // setPickColor(location.color);
      return (
        <div>

        </div>
      );
    }

    let currentYear = new Date().getFullYear();
    const logo = require('../images/flutr-logo.png');
    return (
      <div className={`${styles.holder}`}>
        <div className={`${styles.content}`}>
            <a href="/login"><h3>Organization Login</h3></a>
            <p><span>&#169;</span> {currentYear} Reiman Gardens All Rights Reserved.</p>
        </div>
      </div>
    );
}

export default Footer;