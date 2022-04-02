import React from 'react';
import RecordItem from './RecordItem'

function Card(props) {
    return(
        <div className="container recordContainer">
            <div className="pokemonDiv">
                <div className="nameDiv">
                    {props.pokemon.id} {props.pokemon.name}
                </div>
                <div className="imgDiv">
                    <img src={'http://127.0.0.1:8000' + props.pokemon.img} alt={props.pokemon.name} className='pokeImg' />
                </div>
            </div>
            <div className="recordDiv">
                <RecordItem icon={'images/shiny_icon.png'} text= {'shiny'} show={true} />
                <RecordItem icon={'images/ui_bg_lucky_pokemon.png'} text= {'lucky'} show={true} />
                <RecordItem icon={'images/ic_shadow.png'} text= {'shadow'} show={true} />
                <RecordItem icon={'images/ic_purified.png'} text= {'purified'} show={true} />
                <RecordItem icon={'images/ic_mega.png'} text= {'mega'} show={true} />
            </div>
        </div>
    )
}

export default Card