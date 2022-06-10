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
            <Link to='/base'><h6>Pokedex</h6></Link>
          </div>
          <div className="header">
            <h6>
              {user ? user.username + '\'s Pokedex' : 'Pokedex'}
            </h6>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <h6>
              <i className={open ? 'fas fa-times' : 'fas fa-bars'}></i>
            </h6>
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