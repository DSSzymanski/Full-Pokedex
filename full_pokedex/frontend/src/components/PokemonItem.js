import React from 'react';

class PokemonItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: props.pokemon,
            caught: props.caught,
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({caught: !this.state.caught})
    }

    render() {
        return (
            <div className="pokemonDiv">
                <div className="nameDiv">
                    {this.state.pokemon.id} {this.state.pokemon.name}
                </div>
                <div className="imgDiv">
                    <img 
                        src={'http://127.0.0.1:8000' + this.state.pokemon.img}
                        alt={this.state.pokemon.name}
                        className={this.state.caught ? "pokeImg" : "pokeImg greyscale"}
                        onClick={this.onClick}
                    />
                </div>
            </div>
        )
    }
}

export default PokemonItem
