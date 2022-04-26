import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import AuthContext from '../context/AuthContext';

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
            <div className="header">
              <h6>
                Pokedex
              </h6>
            </div>
            <div className="logoutDiv">
              <Link to='/login'><h6>Sign Up</h6></Link>
            </div>
          </div>
          )
      }
    </>
  )


}

export default Navbar;