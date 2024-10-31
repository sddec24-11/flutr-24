import { useState } from 'react'
import  styles from './Navbar.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

import NavDropdown from 'react-bootstrap/NavDropdown';


function Navbar({location, kioskMode}) {
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
    if(location != null){
      var opener = '/';
      if(kioskMode){
        opener = '/kiosk/';
      }
      return (
        <div className="App">
          <header className="App-header">
            <nav className={`${styles.navbar}`}style={{backgroundColor: location.colors[0]}}>
              {}
              
              <a href={opener + location.website} className={`${styles.logo}`}><img src={location.logoUrl} alt={location.logoUrl}/></a>
              <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                <li onClick={removeActive}>
                  <a href={opener + location.website + '/stats'} className={`${styles.navLink}`}><strong>Statistics</strong></a>
                </li>
                <li onClick={removeActive}>
                  <a href={opener + location.website + '/gallery'} className={`${styles.navLink}`}><strong>Gallery</strong></a>
                </li>

                {window.sessionStorage.getItem("authorized") && 
              <NavDropdown
                  id="nav-dropdown"
                  title="Administration"
                >
                  <Dropdown.Item href="/addrelease">Add Release</Dropdown.Item>
                  <Dropdown.Item href="/shipments">View Shipments</Dropdown.Item>
                  <Dropdown.Item href="/addshipment">Add Shipment</Dropdown.Item>
                  <Dropdown.Item href="">Import/Export Shipments</Dropdown.Item>
                  {window.sessionStorage.getItem("authorizationLevel" ) === "ADMIN" &&
                  <Dropdown.Item href="/edit/butterfly">Edit Butterflies</Dropdown.Item>}
                  {window.sessionStorage.getItem("authorizationLevel" ) === "ADMIN" &&
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Divider/>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Item href="/addOrg">Add Organization</Dropdown.Item>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Item href="/masterbutterfly/list">MASTER Butterfly List</Dropdown.Item>}
                  <Dropdown.Item href="/changePassword">Change Password</Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
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
              <li onClick={removeActive}>
                <a href='/masteredit' className={`${styles.navLink}`}>Master Edit</a>
              </li>
              {window.sessionStorage.getItem("authorized") && 
              <NavDropdown
                  id="nav-dropdown"
                  title="Administration"
                >
                  <Dropdown.Item href="/addrelease">Add Release</Dropdown.Item>
                  <Dropdown.Item href="/shipments">View Shipments</Dropdown.Item>
                  <Dropdown.Item href="/addshipment">Add Shipment</Dropdown.Item>
                  <Dropdown.Item href="">Import/Export Shipments</Dropdown.Item>
                  {["ADMIN", "SUPERUSER"].includes(window.sessionStorage.getItem("authorizationLevel")) &&
                  <Dropdown.Item href="/edit/butterfly">Edit Butterflies</Dropdown.Item>}
                  {["ADMIN", "SUPERUSER"].includes(window.sessionStorage.getItem("authorizationLevel")) &&
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Divider/>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Item href="/addOrg">Add Organization</Dropdown.Item>}
                  {window.sessionStorage.getItem("authorizationLevel") === "SUPERUSER" &&
                  <Dropdown.Item href="/masterbutterfly/list">MASTER Butterfly List</Dropdown.Item>}
                  <Dropdown.Divider/>
                  <Dropdown.Item href="/changePassword">Change Password</Dropdown.Item>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
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
  