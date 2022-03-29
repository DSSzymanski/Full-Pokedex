import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      recordList: []
    }
    this.getData = this.getData.bind(this)
  };

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch('http://127.0.0.1:8000/api/pokemon-list')
      .then(response => response.json())
      .then(data =>
        this.setState({pokemonList : data})
      )
  }

  render(){
    var pokemon = this.state.pokemonList
    pokemon = pokemon.filter(poke => poke.generation === 1)
    return(
      <div className="container">
        {pokemon.map((poke, index) => {
          return(
            <div key={index} className='pokemonDiv'>
              {poke.name}
              <div className='imgDiv'>
                <img src={"https://img.pokemondb.net/sprites/go/normal/" + poke.name.toLowerCase() + ".png"} alt={poke.name} className='pokeImg' />
              </div>
              {poke.gen}
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
