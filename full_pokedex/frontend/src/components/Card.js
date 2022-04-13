import React from 'react';
import PokemonItem from './PokemonItem';
import RecordItem from './RecordItem'

function Card(props) {
    //If pokemon has not been released, do not generate card.
    if(!props.record.pokemon.has_been_released) {
        return null;
    }
    return(
        <div className="container recordContainer">
            <PokemonItem
                pokemon={props.record.pokemon}
                caught={props.record.caught}
            />
            <div className="recordDiv">
                <RecordItem 
                    icon={'http://localhost:8000/static/images/shiny_icon.png'}
                    isAchieved={props.record.shiny}
                    text={'shiny'} 
                    show={props.record.pokemon.has_shiny}
                />
                <RecordItem
                    icon={'http://localhost:8000/static/images/ui_bg_lucky_pokemon.png'}
                    isAchieved={props.record.lucky}
                    text= {'lucky'}
                    show={true}
                />
                <RecordItem
                    icon={'http://localhost:8000/static/images/ic_shadow.png'}
                    isAchieved={props.record.shadow}
                    text={'shadow'}
                    show={props.record.pokemon.has_shadow}
                />
                <RecordItem
                    icon={'http://localhost:8000/static/images/ic_purified.png'}
                    isAchieved={props.record.purified}
                    text= {'purified'}
                    show={props.record.pokemon.has_shadow}
                />
                <RecordItem
                    icon={'http://localhost:8000/static/images/ic_mega.png'}
                    isAchieved={props.record.mega}
                    text={'mega'}    
                    show={props.record.pokemon.has_mega}
                />
            </div>
        </div>
    )
}

export default Card