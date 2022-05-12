import React, { useEffect, useState, useRef } from 'react';
import shiny_icon from '../icon_images/shiny_icon.png';
import ic_mega from '../icon_images/ic_mega.png';
import ic_shadow from '../icon_images/ic_shadow.png';
import ic_purified from '../icon_images/ic_purified.png';
import ui_bg_lucky_pokemon from '../icon_images/ui_bg_lucky_pokemon.png';
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
    if(!props.pokemon.has_been_released) {
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
            <div className="recordDiv">
                { !props.pokemon.has_shiny ? null :
                    <div className="buttonDiv">
                        <button
                            title='Shiny'
                            onClick={() => setData(prev => ({
                                ...data,
                                shiny: !data.shiny,
                            }))}
                        >
                            <img
                                src={shiny_icon}
                                alt={'shiny'}
                                className={data.shiny ? "iconImage" : "iconImage greyscale"}
                            />
                        </button>
                    </div>
                }
                <div className="buttonDiv">
                    <button
                        title='Lucky'
                        onClick={() => setData(prev => ({
                                ...data,
                                lucky: !data.lucky,
                            }))}>
                        <img
                            src={ui_bg_lucky_pokemon}
                            alt={'lucky'}
                            className={data.lucky ? "iconImage" : "iconImage greyscale"}
                        />
                    </button>
                </div>
                { !props.pokemon.has_shadow ? null :
                    <>
                        <div className="buttonDiv">
                            <button
                                title='Shadow'
                                onClick={() => setData(prev => ({
                                ...data,
                                shadow: !data.shadow,
                            }))}>
                                <img
                                    src={ic_shadow}
                                    alt={'shadow'}
                                    className={data.shadow ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                        <div className="buttonDiv">
                            <button
                                title='Purified'
                                onClick={() => setData(prev => ({
                                ...data,
                                purified: !data.purified,
                            }))}>
                                <img
                                    src={ic_purified}
                                    alt={'purified'}
                                    className={data.purified ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                    </>
                }
                { !props.pokemon.has_mega ? null :
                    <div className="buttonDiv">
                        <button
                            title='Mega'
                            onClick={() => setData(prev => ({
                                ...data,
                                mega: !data.mega,
                            }))}>
                            <img
                                src={ic_mega}
                                alt={'mega'}
                                className={data.mega ? "iconImage" : "iconImage greyscale"}
                            />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default BaseCard;