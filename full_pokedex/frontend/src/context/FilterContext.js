import { createContext, useEffect, useState } from "react";

const FilterContext = createContext();

export default FilterContext;

export const FilterProvider = ({ children }) => {
    const ANY = 0;
    const TRUE = 1;
    const FALSE = -1;

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

    useEffect(() => {},[filterData])

    let contextData = {
        filterData: filterData,
        updateFilter: updateFilter,
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