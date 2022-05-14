import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import AuthContext from '../context/AuthContext';

/**
 * Generates a navbar element that differs based on whether there is a user stored in the AuthContext.
 * If so, the navbar contains a logout button and if not, the navbar contained a button to the login page.
 * 
 * @returns Navbar Element
 */

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  
  return (
    <>
      {
        user ? (
          <div className='Navbar'>
            <div className="header">
              <h6>
                {user.username}'s Pokedex
              </h6>
            </div>
            <div className="logoutDiv">
              <h6 onClick={ logoutUser }>Logout</h6>
            </div>
          </div>
        ) : (
          <div className='Navbar'>
            <div className="pokedexLinkDiv">
              <Link to='/base'><h6>Pokedex</h6></Link>
            </div>
            <div className="header">
              <h6>
                Pokedex
              </h6>
            </div>
            <div className="logoutDiv">
              <Link to='/login'><h6>Log In | Sign Up</h6></Link>
            </div>
          </div>
          )
      }
    </>
  )


}

export default Navbar;