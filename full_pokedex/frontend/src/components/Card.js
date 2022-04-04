import React from 'react';
import PokemonItem from './PokemonItem';
import RecordItem from './RecordItem'

function Card(props) {
    //If pokemon has not been released, do not generate card.
    if(!props.pokemon.has_been_released) {
        return null;
    }
    return(
        <div className="container recordContainer">
            <PokemonItem pokemon={props.pokemon} caught={false} />
            <div className="recordDiv">
                <RecordItem icon={'images/shiny_icon.png'} text= {'shiny'} show={props.pokemon.has_shiny} />
                <RecordItem icon={'images/ui_bg_lucky_pokemon.png'} text= {'lucky'} show={true} />
                <RecordItem icon={'images/ic_shadow.png'} text= {'shadow'} show={props.pokemon.has_shadow} />
                <RecordItem icon={'images/ic_purified.png'} text= {'purified'} show={props.pokemon.has_shadow} />
                <RecordItem icon={'images/ic_mega.png'} text= {'mega'} show={props.pokemon.has_mega}/>
            </div>
        </div>
    )
}

export default Card