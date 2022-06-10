import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className='sidebar-div'>
      <div className="log">
        {
          user ?
          <div className="logoutDiv">
            <h6 onClick={ logoutUser }>
              Logout
            </h6>
          </div>
          :
          <div className="logoutDiv">
            <Link to='/login' className='pad-btn'><h6>Log In | Sign Up</h6></Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar;