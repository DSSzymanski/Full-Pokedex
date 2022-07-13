import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';
import FilterContext from '../context/FilterContext';
import ObtainedFilter from './ObtainedFilter';

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

    data['generation'] = document.getElementById('genDropdown').value;

    //add radio buttons
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
            <h5 onClick={ logoutUser }>
              Logout
            </h5>
          </div>
          :
          <div className="logoutDiv">
            <Link to='/login' className='pad-btn'><h5>Log In | Sign Up</h5></Link>
          </div>
        }
      </div>
      <div className="filter-div">
        <h5 className="filter-header">
          Filter
        </h5>
        <div className="filter-container">
          <label htmlFor="generation">Generation: </label>
          <select name="generation" id="genDropdown" defaultValue={filterData['generation']}>
            <option value={ANY}>Any</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
            <option value="5">V</option>
            <option value="6">VI</option>
            <option value="7">VII</option>
            <option value="8">VIII</option>
          </select>
        </div>
        <ObtainedFilter obtainedHeader='Caught' obtainedType='caught' trueLabel="Caught" falseLabel="Not Caught" />
        <ObtainedFilter obtainedHeader='Shiny' obtainedType='shiny' trueLabel="Shiny Obtained" falseLabel="Shiny Not Obtained" />
        <ObtainedFilter obtainedHeader='Lucky' obtainedType='lucky' trueLabel="Lucky Obtained" falseLabel="Lucky Not Obtained" />
        <ObtainedFilter obtainedHeader='Shadow' obtainedType='shadow' trueLabel="Shadow Obtained" falseLabel="Shadow Not Obtained" />
        <ObtainedFilter obtainedHeader='Purified' obtainedType='purified' trueLabel="Purified Obtained" falseLabel="Purified Not Obtained" />
        <ObtainedFilter obtainedHeader='Mega' obtainedType='mega' trueLabel='Mega Obtained' falseLabel='Mega Not Obtained' />
        <div className="btn-div">
          <button className='submit-btn' onClick={submitFilter}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;