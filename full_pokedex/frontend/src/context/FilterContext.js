import { createContext, useEffect, useState } from "react";

const FilterContext = createContext();

export default FilterContext;

export const FilterProvider = ({ children }) => {
    const ANY = "any";
    const TRUE = true;
    const FALSE = false;

    //object to store filter states
    let [ filterData, setFilterData ] = useState({
        caught: ANY,
        shiny: ANY,
        lucky: ANY,
        shadow: ANY,
        purified: ANY,
        mega: ANY,
        generation: ANY,
    })

    //updates data/filter states with new object.
    let updateFilter = ( data ) => {
        setFilterData(data);
    }

    /**
     * validates a single pokemon based on which forms have been
     * obtained and which generation the pokemon is in.
     * 
     * Returns a boolean used to determin whether the pokemon
     * should be displayed.
     */
    let validatePokemon = ( pokemon, recordData ) => {
        for ( const key in filterData ) {
            //skip any checks
            if ( filterData[key] === ANY ) { continue; }
            //specific check because generation holds more than the usual 3 states
            if ( key === 'generation' ) {
                if ( parseInt(filterData[key]) !== pokemon.generation ) {
                    return false;
                }
            }
            else if ( filterData[key] !== recordData[key]) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {},[filterData])

    //which functions can be called from within the provider
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