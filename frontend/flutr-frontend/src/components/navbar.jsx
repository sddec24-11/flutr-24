import { useState } from 'react'
import  styles from './Navbar.module.css';


function Navbar({location}) {
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
        <div className="App">
          <header className="App-header">
            <nav className={`${styles.navbar}`}style={{backgroundColor: location.color}}>
              {}
              
              <a href={'/' + location.path} className={`${styles.logo}`}><img src={require(`../images/${location.logo}`)} alt={location.logo}/></a>
              <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                <li onClick={removeActive}>
                  <a href={'/' + location.path + '/stats'} className={`${styles.navLink}`}>Statistics</a>
                </li>
                <li onClick={removeActive}>
                  <a href={'/' + location.path + '/gallery'} className={`${styles.navLink}`}>Gallery</a>
                </li>
              </ul>
              <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
                <span className={`${styles.bar}`}></span>
                <span className={`${styles.bar}`}></span>
                <span className={`${styles.bar}`}></span>
              </div>
            </nav>
          </header>
        </div>
      );
    }

    const logo = require('../images/flutr-logo.png');
    return (
      <div className="App">
        <header className="App-header">
          <nav className={`${styles.navbar}`}>
            {}
            
            <a href='/' className={`${styles.logo}`}><img src={logo} alt='flutr-logo'/></a>
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
              <li onClick={removeActive}>
                <a href='/about' className={`${styles.navLink}`}>About</a>
              </li>
              <li onClick={removeActive}>
                <a href='/contact' className={`${styles.navLink}`}>Contact</a>
              </li>
              
            </ul>
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
        </header>
      </div>
    );
  }
  export default Navbar;
  