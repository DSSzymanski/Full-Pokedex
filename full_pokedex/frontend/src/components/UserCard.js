import React, { useEffect, useState, useRef } from 'react';
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
    let [caught, setCaught] = useState(props.record.caught);
    let [shiny, setShiny] = useState(props.record.shiny);
    let [lucky, setLucky] = useState(props.record.lucky);
    let [shadow, setShadow] = useState(props.record.shadow);
    let [purified, setPurified] = useState(props.record.purified);
    let [mega, setMega] = useState(props.record.mega);
    //used so initialization of data objects doesn't trigger useEffect
    let firstRender = useRef(true);

    /**
     * Method used for the API call to update a record in the database. Sends the data about which
     * versions have been maintained as a JSON string.
     */
    let submitRecord = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/update-record/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                caught: caught,
                shiny: shiny,
                lucky: lucky,
                shadow: shadow,
                purified: purified,
                mega: mega
            })
        })
        let data = await response.json()
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
    }, [caught, shiny, lucky, shadow, purified, mega])

    //If pokemon has not been released, do not generate card.
    if(!props.record.pokemon.has_been_released) {
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
                        src={'http://127.0.0.1:8000' + props.record.pokemon.img}
                        alt={props.record.pokemon.name}
                        className={caught ? "pokeImg" : "pokeImg greyscale"}
                        onClick={() => setCaught(!caught)}
                    />
                </div>
            </div>
            <div className="recordDiv">
                { !props.record.pokemon.has_shiny ? null :
                    <div className="buttonDiv">
                        <button onClick={() => setShiny(!shiny)}>
                            <img
                                src={"http://localhost:8000/static/images/shiny_icon.png"}
                                alt={'shiny'}
                                className={shiny ? "iconImage" : "iconImage greyscale"}
                            />
                        </button>
                    </div>
                }
                <div className="buttonDiv">
                    <button onClick={() => setLucky(!lucky)}>
                        <img
                            src={"http://localhost:8000/static/images/ui_bg_lucky_pokemon.png"}
                            alt={'lucky'}
                            className={lucky ? "iconImage" : "iconImage greyscale"}
                        />
                    </button>
                </div>
                { !props.record.pokemon.has_shadow ? null :
                    <>
                        <div className="buttonDiv">
                            <button onClick={() => setShadow(!shadow)}>
                                <img
                                    src={"http://localhost:8000/static/images/ic_shadow.png"}
                                    alt={'shadow'}
                                    className={shadow ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                        <div className="buttonDiv">
                            <button onClick={() => setPurified(!purified)}>
                                <img
                                    src={"http://localhost:8000/static/images/ic_purified.png"}
                                    alt={'purified'}
                                    className={purified ? "iconImage" : "iconImage greyscale"}
                                />
                            </button>
                        </div>
                    </>
                }
                { !props.record.pokemon.has_mega ? null :
                    <div className="buttonDiv">
                        <button onClick={() => setMega(!mega)}>
                            <img
                                src={"http://localhost:8000/static/images/ic_mega.png"}
                                alt={'mega'}
                                className={mega ? "iconImage" : "iconImage greyscale"}
                            />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserCard;