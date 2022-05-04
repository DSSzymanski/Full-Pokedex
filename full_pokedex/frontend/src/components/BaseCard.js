import React, { useEffect, useState, useRef } from 'react';
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
                        src={'http://127.0.0.1:8000' + props.pokemon.img}
                        alt={props.pokemon.name}
                        className={data.caught ? "pokeImg" : "pokeImg greyscale"}
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
                        <button onClick={() => setData(prev => ({
                                ...data,
                                shiny: !data.shiny,
                            }))}
                        >
                            <img
                                src={"http://localhost:8000/static/images/shiny_icon.png"}
                                alt={'shiny'}
                                className={data.shiny ? "iconImage" : "iconImage greyscale"}
                            />
                        </button>
                    </div>
                }
                <div className="buttonDiv">
                    <button onClick={() => setData(prev => ({
                                ...data,
                                lucky: !data.lucky,
                            }))}>
                        <img
                            src={"http://localhost:8000/static/images/ui_bg_lucky_pokemon.png"}
                            alt={'lucky'}
                            className={data.lucky ? "iconImage" : "iconImage greyscale"}
                        />
                    </button>
                </div>
                { !props.pokemon.has_shadow ? null :
                    <>
                        <div className="buttonDiv">
                            <button onClick={() => setData(prev => ({
                                ...data,
                                shadow: !data.shadow,
                            }))}>
                                <img
                                    src={"http://localhost:8000/static/images/ic_shadow.png"}
                                    alt={'shadow'}
                                    className={data.shadow ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                        <div className="buttonDiv">
                            <button onClick={() => setData(prev => ({
                                ...data,
                                purified: !data.purified,
                            }))}>
                                <img
                                    src={"http://localhost:8000/static/images/ic_purified.png"}
                                    alt={'purified'}
                                    className={data.purified ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                    </>
                }
                { !props.pokemon.has_mega ? null :
                    <div className="buttonDiv">
                        <button onClick={() => setData(prev => ({
                                ...data,
                                mega: !data.mega,
                            }))}>
                            <img
                                src={"http://localhost:8000/static/images/ic_mega.png"}
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