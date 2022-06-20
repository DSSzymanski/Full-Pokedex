import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';
import FilterContext from '../context/FilterContext';

const Sidebar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let { filterData, updateFilter, ANY, TRUE, FALSE } = useContext(FilterContext);

  /**
   * Iterates through the radio button groups and creates
   * an object containing that data. Then passes the data
   * through to the filter context to update filter.
   */
  let submitFilter = () => {
    let data = {}
    let radioNames = [
      "caught",
      "shiny",
      "lucky",
      "shadow",
      "purified",
      "mega"
    ]

    for (const name of radioNames) {
      let radioBtns = document.getElementsByName(name);
      for (const ele of radioBtns){
        if(ele.checked) {
          if( ele.value === "any") {
            data[name] = ANY;
          }
          else if( ele.value === "true") {
            data[name] = TRUE;
          }
          else if( ele.value === "false") {
            data[name] = FALSE;
          }
        }
      }
    }

    updateFilter(data);
  }

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
            {
              filterData['caught'] === TRUE ?
              <input type="radio" name="caught" id="caught-true" value="true" defaultChecked/> :
              <input type="radio" name="caught" id="caught-true" value="true"/>
            }
            <label htmlFor="caught-true">Caught</label>
          </div>
          <div className="filter-item">
            {
              filterData['caught'] === FALSE ?
              <input type="radio" name="caught" id="caught-false" value="false" defaultChecked/> :
              <input type="radio" name="caught" id="caught-false" value="false"/>
            }
            <label htmlFor="caught-false">Not Caught</label>
          </div>
          <div className="filter-item">
            {
              filterData['caught'] === ANY ?
              <input type="radio" name="caught" id="caught-any" value="any" defaultChecked/> :
              <input type="radio" name="caught" id="caught-any" value="any"/>
            }
            <label htmlFor="caught-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Shiny
          </div>
          <div className="filter-item">
            {
              filterData['shiny'] === TRUE ?
              <input type="radio" name="shiny" id="shiny-true" value="true" defaultChecked/> :
              <input type="radio" name="shiny" id="shiny-true" value="true"/> 
            }
            <label htmlFor="shiny-true">Shiny Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['shiny'] === FALSE ?
              <input type="radio" name="shiny" id="shiny-false" value="false" defaultChecked/> :
              <input type="radio" name="shiny" id="shiny-false" value="false"/>
            }
            <label htmlFor="shiny-false">Shiny Not Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['shiny'] === ANY ?
              <input type="radio" name="shiny" id="shiny-any" value="any" defaultChecked/> :
              <input type="radio" name="shiny" id="shiny-any" value="any"/>
            }
            <label htmlFor="shiny-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Lucky
          </div>
          <div className="filter-item">
            {
              filterData['lucky'] === TRUE ?
              <input type="radio" name="lucky" id="lucky-true" value="true" defaultChecked/> :
              <input type="radio" name="lucky" id="lucky-true" value="true"/>
            }
            <label htmlFor="lucky-true">Lucky Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['lucky'] === FALSE ?
              <input type="radio" name="lucky" id="lucky-false" value="false" defaultChecked/> :
              <input type="radio" name="lucky" id="lucky-false" value="false"/>
            }
            <label htmlFor="lucky-false">Lucky Not Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['lucky'] === ANY ?
              <input type="radio" name="lucky" id="lucky-any" value="any" defaultChecked/> :
              <input type="radio" name="lucky" id="lucky-any" value="any"/>
            }
            <label htmlFor="lucky-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Shadow
          </div>
          <div className="filter-item">
            {
              filterData['shadow'] === TRUE ?
              <input type="radio" name="shadow" id="shadow-true" value="true" defaultChecked/> :
              <input type="radio" name="shadow" id="shadow-true" value="true"/>
            }
            <label htmlFor="shadow-true">Shadow Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['shadow'] === FALSE ?
              <input type="radio" name="shadow" id="shadow-false" value="false" defaultChecked/> :
              <input type="radio" name="shadow" id="shadow-false" value="false"/>
            }
            <label htmlFor="shadow-false">Shadow Not Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['shadow'] === ANY ?
              <input type="radio" name="shadow" id="shadow-any" value="any" defaultChecked/> :
              <input type="radio" name="shadow" id="shadow-any" value="any"/>
            }
            <label htmlFor="shadow-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Purified
          </div>
          <div className="filter-item">
            {
              filterData['purified'] === TRUE ?
              <input type="radio" name="purified" id="purified-true" value="true" defaultChecked/> :
              <input type="radio" name="purified" id="purified-true" value="true"/>
            }
            <label htmlFor="purified-true">Purified Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['purified'] === FALSE ?
              <input type="radio" name="purified" id="purified-false" value="false" defaultChecked/> :
              <input type="radio" name="purified" id="purified-false" value="false"/>
            }
            <label htmlFor="purified-false">Purified Not Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['purified'] === ANY ?
              <input type="radio" name="purified" id="purified-any" value="any" defaultChecked/> :
              <input type="radio" name="purified" id="purified-any" value="any"/>
            }
            <label htmlFor="purified-any">Any</label>
          </div>
        </div>
        <div className="filter-container">
          <div>
            Mega
          </div>
          <div className="filter-item">
            {
              filterData['mega'] === TRUE ?
              <input type="radio" name="mega" id="mega-true" value="true" defaultChecked/> :
              <input type="radio" name="mega" id="mega-true" value="true"/>
            }
            <label htmlFor="mega-true">Mega Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['mega'] === FALSE ?
              <input type="radio" name="mega" id="mega-false" value="false" defaultChecked/> :
              <input type="radio" name="mega" id="mega-false" value="false"/>
            }
            <label htmlFor="mega-false">Mega Not Obtained</label>
          </div>
          <div className="filter-item">
            {
              filterData['mega'] === ANY ?
              <input type="radio" name="mega" id="mega-any" value="any" defaultChecked/> :
              <input type="radio" name="mega" id="mega-any" value="any"/>
            }
            <label htmlFor="mega-any">Any</label>
          </div>
        </div>
        <div className="btn-div">
          <button className='submit-btn' onClick={submitFilter}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;