import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';

/**
 * Generates a navbar element that differs based on whether there is a user stored in the AuthContext.
 * If so, the navbar contains a logout button and if not, the navbar contained a button to the login page.
 * 
 * @returns Navbar Element
 */

const Navbar = () => {
  let { user } = useContext(AuthContext);
  let [ open, setOpen ] = useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <>
      {
        <div className='Navbar'>
          <div className="pokedexLinkDiv">
            <Link to='/base'><h5>Pokedex</h5></Link>
          </div>
          <div className="header">
            <h5>
              {user ? user.username + '\'s Pokedex' : 'Non-account Pokedex'}
            </h5>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <h5>
              <i className={open ? 'fas fa-times' : 'fas fa-bars'}></i>
            </h5>
          </div>
          <div className={open ? "sidebar-show" : "sidebar-hide"}>
            <Sidebar />
          </div>
        </div>
      }
    </>
  )


}

export default Navbar;