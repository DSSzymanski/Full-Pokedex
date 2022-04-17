import React, { useContext } from 'react';
//import { Link } from 'react-router-dom';
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
                {user.user_id}'s Pokedex
              </h6>
            </div>
            <div className="logoutDiv">
              <h6 onClick={ logoutUser }>Logout</h6>
            </div>
          </div>
        ) : (<div></div>)
      }
    </>
  )


}

export default Navbar;