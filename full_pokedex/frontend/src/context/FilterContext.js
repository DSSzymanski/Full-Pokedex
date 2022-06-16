import { createContext, useState } from "react";

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

    let contextData = {
        filterData: filterData,
    }

    return (
        <FilterContext.Provider value={contextData}>
            {children}
        </FilterContext.Provider>
    )
}