import React, { useEffect, useState, useRef, useContext } from 'react';
import FilterContext from '../context/FilterContext';
import Record from './Record';

/**
 * The BaseCard element is a container style element that allows a non-user to show and store data on a single Pokemon.
 * Depending on the Pokemon passed in through the props, the card will display the image of the pokemon, and clickable buttons
 * for if a certain version of the pokemon has been obtained (caught, shiny, lucky, shadow, purified, mega). The picture and
 * buttons start out having the greyscale css class to show it dimmed or unobtained and once clicked it will remove the class.
 * Once clicked, the useEffect method will set a local storage variable of an object using the id of the pokemon as a key and
 * containing the obtained versions data.
 * 
 * @param {*} props: Props should contain a single pokemon object retrieved from the API to generate a card from.
 * @returns BaseCard Element
 */
function BaseCard(props) {
    //Load data object from local storage or set a default object if there is no matching key.
    let [data, setData] = useState(() =>
        localStorage.getItem(props.pokemon.id + "Record") ? JSON.parse(localStorage.getItem(props.pokemon.id + "Record")) :
    {
        caught: false,
        shiny: false,
        lucky: false,
        shadow: false,
        purified: false,
        mega: false,
    })
    //used so initialization of data objects doesn't trigger useEffect
    let firstRender = useRef(true);
    const addrStr = 'http://127.0.0.1:8000';
    let { validatePokemon } = useContext(FilterContext);

    //triggers on all button clicks and updates localStorage with data about the card
    useEffect(() => {
        if (!firstRender.current) {
            localStorage.setItem(props.pokemon.id + "Record", JSON.stringify(data));
        }
        else {
            firstRender.current = false;
        }
    }, [data])

    //If pokemon has not been released, do not generate card.
    if(!props.pokemon.has_been_released || !validatePokemon( props.pokemon, data)) {
        return null;
    }
    return(
        <div className="container recordContainer">
            <div className="pokemonDiv">
                <div className="nameDiv">
                    {props.pokemon.id} {props.pokemon.name}
                </div>
                <div className="imgDiv">
                    <img
                        src={addrStr + props.pokemon.img}
                        alt={props.pokemon.name}
                        className={data.caught ? "pokeImg" : "pokeImg greyscale"}
                        title={props.pokemon.name}
                        onClick={() =>
                            setData(prev => ({
                                ...data,
                                caught: !data.caught,
                        }))}
                    />
                </div>
            </div>
            <Record pokemon={props.pokemon} data={data} setData={setData}/>
        </div>
    )
}

export default BaseCard;