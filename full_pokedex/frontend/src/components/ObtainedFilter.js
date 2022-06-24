import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

export default function ObtainedFilter(props) {
    let { filterData, ANY, TRUE, FALSE } = useContext(FilterContext);
    
    return (
        <div className="filter-container">
            <div>
            {props.obtainedHeader}
            </div>
            <div className="radio-button-container">
                <div className="filter-item">
                    {
                    filterData[props.obtainedType] === TRUE ?
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-true"} value="true" defaultChecked/> :
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-true"} value="true"/>
                    }
                    <label htmlFor={props.obtainedType+"-true"}>{props.trueLabel}</label>
                </div>
                <div className="filter-item">
                    {
                    filterData[props.obtainedType] === FALSE ?
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-false"} value="false" defaultChecked/> :
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-false"} value="false"/>
                    }
                    <label htmlFor={props.obtainedType+"-false"}>{props.falseLabel}</label>
                </div>
                <div className="filter-item">
                    {
                    filterData[props.obtainedType] === ANY ?
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-any"} value="any" defaultChecked/> :
                    <input type="radio" name={props.obtainedType} id={props.obtainedType+"-any"} value="any"/>
                    }
                    <label htmlFor={props.obtainedType+"-any"}>Any</label>
                </div>
            </div>
        </div>
    )
}
