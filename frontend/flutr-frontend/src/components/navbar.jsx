import { useState } from 'react'
import  styles from './Navbar.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

import NavDropdown from 'react-bootstrap/NavDropdown';


function Navbar({location, authenticated, kioskMode}) {
function Navbar({location, authenticated, kioskMode}) {
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
      var opener = '/';
      if(kioskMode){
        opener = '/kiosk/';
      }
      return (
        <div className="App">
          <header className="App-header">
            <nav className={`${styles.navbar}`}style={{backgroundColor: location.color}}>
              {}
              
              <a href={opener + location.path} className={`${styles.logo}`}><img src={require(`../images/${location.logo}`)} alt={location.logo}/></a>
              <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                <li onClick={removeActive}>
                  <a href={opener + location.path + '/stats'} className={`${styles.navLink}`}><strong>Statistics</strong></a>
                </li>
                <li onClick={removeActive}>
                  <a href={opener + location.path + '/gallery'} className={`${styles.navLink}`}><strong>Gallery</strong></a>
                </li>

                {authenticated && 
              <NavDropdown
                  id="nav-dropdown"
                  title="Administration"
                >
                  <Dropdown.Item href="/addrelease">Add Release</Dropdown.Item>
                  <Dropdown.Item href="/shipments">View Shipments</Dropdown.Item>
                  <Dropdown.Item href="">Add Shipment</Dropdown.Item>
                  <Dropdown.Item href="">Import/Export Shipments</Dropdown.Item>
                  <Dropdown.Item href="/edit/butterfly">Edit Butterflies</Dropdown.Item>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                </NavDropdown>}
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
                <a href='/' className={`${styles.navLink}`}>Home</a>
              </li>
              <li onClick={removeActive}>
                <a href='/about' className={`${styles.navLink}`}>About</a>
              </li>
              {authenticated && 
              <NavDropdown
                  id="nav-dropdown"
                  title="Administration"
                >
                  <Dropdown.Item href="">Add Release</Dropdown.Item>
                  <Dropdown.Item href="/shipments">View Shipments</Dropdown.Item>
                  <Dropdown.Item href="">Add Shipment</Dropdown.Item>
                  <Dropdown.Item href="">Import/Export Shipments</Dropdown.Item>
                  <Dropdown.Item href="/edit/butterfly">Edit Butterflies</Dropdown.Item>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                </NavDropdown>}
              
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
  