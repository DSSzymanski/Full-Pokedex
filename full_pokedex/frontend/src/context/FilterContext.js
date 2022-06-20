import { createContext, useEffect, useState } from "react";

const FilterContext = createContext();

export default FilterContext;

export const FilterProvider = ({ children }) => {
    const ANY = "any";
    const TRUE = true;
    const FALSE = false;

    let [ filterData, setFilterData ] = useState({
        caught: ANY,
        shiny: ANY,
        lucky: ANY,
        shadow: ANY,
        purified: ANY,
        mega: ANY,
    })

    let updateFilter = ( data ) => {
        setFilterData(data);
    }

    let validatePokemon = ( recordData ) => {
        for ( const key in filterData ) {
            //skip any checks
            if ( filterData[key] === ANY ) { continue; }
            if ( filterData[key] !== recordData[key]) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {},[filterData])

    let contextData = {
        filterData: filterData,
        updateFilter: updateFilter,
        validatePokemon: validatePokemon,
        ANY: ANY,
        TRUE: TRUE,
        FALSE: FALSE,
    }

    return (
        <FilterContext.Provider value={contextData}>
            {children}
        </FilterContext.Provider>
    )
}