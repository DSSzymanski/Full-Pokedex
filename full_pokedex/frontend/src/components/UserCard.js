import React, { useEffect, useState, useContext, useRef } from 'react';
import shiny_icon from '../icon_images/shiny_icon.png';
import ic_mega from '../icon_images/ic_mega.png';
import ic_shadow from '../icon_images/ic_shadow.png';
import ic_purified from '../icon_images/ic_purified.png';
import ui_bg_lucky_pokemon from '../icon_images/ui_bg_lucky_pokemon.png';
import FilterContext from '../context/FilterContext';
/**
 * The UserCard element is a container style element that allows a signed in user to show and store data on a single Pokemon.
 * Depending on the Pokemon contained in the record object passed in through the props, the card will display the image of the 
 * pokemon, and clickable buttons for if a certain version of the pokemon has been obtained (caught, shiny, lucky, shadow, purified,
 * mega). The picture and buttons start out having the greyscale css class to show it dimmed or unobtained and once clicked it
 * will remove the class. Once clicked, the useEffect method will send a call to the update-record method of the API. Once 
 * called, it will update the database Record Item.
 * 
 * @param {*} props: Props should contain a single record object retrieved from the API to generate a card from.
 * @returns BaseCard Element
 */
const UserCard = (props) => {
    let [id, setId] = useState(props.record.id);
    let [data, setData] = useState({
        caught: props.record.caught,
        shiny: props.record.shiny,
        lucky: props.record.lucky,
        shadow: props.record.shadow,
        purified: props.record.purified,
        mega: props.record.mega,
    });
    //used so initialization of data objects doesn't trigger useEffect
    let firstRender = useRef(true);
    const addrStr = 'http://127.0.0.1:8000';
    let { validatePokemon } = useContext(FilterContext);

    /**
     * Method used for the API call to update a record in the database. Sends the data about which
     * versions have been maintained as a JSON string.
     */
    let submitRecord = async() => {
        let response = await fetch(addrStr + '/api/update-record/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                caught: data.caught,
                shiny: data.shiny,
                lucky: data.lucky,
                shadow: data.shadow,
                purified: data.purified,
                mega: data.mega
            })
        })
        let response_data = await response.json()
        if(response.status === 200) {
            return;
        }
        else{
            alert(response.statusText);
        }
    }

    //Triggers on any button click in the card and calls submit record method if it isn't the initial render.
    useEffect(() => {
        if (!firstRender.current) {
            submitRecord();
        }
        else {
            firstRender.current = false;
        }
    }, [data])

    //If pokemon has not been released, do not generate card.
    if(!props.record.pokemon.has_been_released || !validatePokemon( props.record.pokemon, data)) {
        return null;
    }
    return(
        <div className="container recordContainer">
            <div className="pokemonDiv">
                <div className="nameDiv">
                    {props.record.pokemon.id} {props.record.pokemon.name}
                </div>
                <div className="imgDiv">
                    <img
                        src={addrStr + props.record.pokemon.img}
                        alt={props.record.pokemon.name}
                        className={data.caught ? "pokeImg" : "pokeImg greyscale"}
                        title={props.record.pokemon.name}
                        onClick={() =>
                            setData(prev => ({
                                ...data,
                                caught: !data.caught,
                        }))}
                    />
                </div>
            </div>
            <div className="recordDiv">
                { !props.record.pokemon.has_shiny ? null :
                    <div className="buttonDiv">
                        <button
                            className={data.shiny ? null : "greyscale"}
                            title='Shiny'
                            onClick={() => setData(prev => ({
                                ...data,
                                shiny: !data.shiny,
                            }))}
                        >
                            <img
                                src={shiny_icon}
                                alt={'shiny'}
                                className="iconImage"
                            />
                        </button>
                    </div>
                }
                <div className="buttonDiv">
                    <button
                        className={data.lucky ? null : "greyscale"}
                        title='Lucky'
                        onClick={() => setData(prev => ({
                            ...data,
                            lucky: !data.lucky,
                        }))}
                    >
                        <img
                            src={ui_bg_lucky_pokemon}
                            alt={'lucky'}
                            className="iconImage"
                        />
                    </button>
                </div>
                { !props.record.pokemon.has_shadow ? null :
                    <>
                        <div className="buttonDiv">
                            <button
                                className={data.shadow ? null : "greyscale"}
                                title='Shadow'
                                onClick={() => setData(prev => ({
                                    ...data,
                                    shadow: !data.shadow,
                                }))}
                            >
                                <img
                                    src={ic_shadow}
                                    alt={'shadow'}
                                    className='iconImage'
                                />
                            </button>
                        </div>
                        <div className="buttonDiv">
                            <button
                                className={data.purified ? null : "greyscale"}
                                title='Purified'
                                onClick={() => setData(prev => ({
                                    ...data,
                                    purified: !data.purified,
                                }))}
                            >
                                <img
                                    src={ic_purified}
                                    alt={'purified'}
                                    className='iconImage'
                                />
                            </button>
                        </div>
                    </>
                }
                { !props.record.pokemon.has_mega ? null :
                    <div className="buttonDiv">
                        <button
                            className={data.mega ? null : "greyscale"}
                            title='Mega'
                            onClick={() => setData(prev => ({
                                ...data,
                                mega: !data.mega,
                            }))}
                        >
                            <img
                                src={ic_mega}
                                alt={'mega'}
                                className='iconImage'
                            />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserCard;