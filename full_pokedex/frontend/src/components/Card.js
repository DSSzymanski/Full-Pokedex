import React from 'react';
import PokemonItem from './PokemonItem';
import RecordItem from './RecordItem'

function Card(props) {
    return(
        <div className="container recordContainer">
            <PokemonItem pokemon={props.pokemon} caught={false} />
            <div className="recordDiv">
                <RecordItem icon={'images/shiny_icon.png'} text= {'shiny'} show={true} />
                <RecordItem icon={'images/ui_bg_lucky_pokemon.png'} text= {'lucky'} show={true} />
                <RecordItem icon={'images/ic_shadow.png'} text= {'shadow'} show={true} />
                <RecordItem icon={'images/ic_purified.png'} text= {'purified'} show={true} />
                <RecordItem icon={'images/ic_mega.png'} text= {'mega'} show={true} isAchieved={false}/>
            </div>
        </div>
    )
}

export default Card