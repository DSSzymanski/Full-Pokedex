import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <>
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
      <div className="filter-div">
        <h5 className="filter-header">
          Filter
        </h5>
        <div className="filter-container">
          <div>
            Caught
          </div>
          <div className="filter-item">
            <input type="radio" name="caught" id="caught-true" value="true"/>
            <label for="caught-true">Caught</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="caught" id="caught-false" value="false"/>
            <label for="caught-false">Not Caught</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="caught" id="caught-any" value="any" checked/>
            <label for="caught-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Shiny
          </div>
          <div className="filter-item">
            <input type="radio" name="shiny" id="shiny-true" value="true"/>
            <label for="shiny-true">Shiny Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="shiny" id="shiny-false" value="false"/>
            <label for="shiny-false">Shiny Not Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="shiny" id="shiny-any" value="any" checked/>
            <label for="shiny-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Lucky
          </div>
          <div className="filter-item">
            <input type="radio" name="lucky" id="lucky-true" value="true"/>
            <label for="lucky-true">Lucky Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="lucky" id="lucky-false" value="false"/>
            <label for="lucky-false">Lucky Not Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="lucky" id="lucky-any" value="any" checked/>
            <label for="lucky-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Shadow
          </div>
          <div className="filter-item">
            <input type="radio" name="shadow" id="shadow-true" value="true"/>
            <label for="shadow-true">Shadow Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="shadow" id="shadow-false" value="false"/>
            <label for="shadow-false">Shadow Not Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="shadow" id="shadow-any" value="any" checked/>
            <label for="shadow-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Purified
          </div>
          <div className="filter-item">
            <input type="radio" name="purified" id="purified-true" value="true"/>
            <label for="purified-true">Purified Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="purified" id="purified-false" value="false"/>
            <label for="purified-false">Purified Not Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="purified" id="purified-any" value="any" checked/>
            <label for="purified-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Mega
          </div>
          <div className="filter-item">
            <input type="radio" name="mega" id="mega-true" value="true"/>
            <label for="mega-true">Mega Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="mega" id="mega-false" value="false"/>
            <label for="mega-false">Mega Not Obtained</label>
          </div>
          <div className="filter-item">
            <input type="radio" name="mega" id="mega-any" value="any" checked/>
            <label for="mega-any">Any</label>
          </div>
        </div>
        <div className="btn-div">
          <button className='submit-btn'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;