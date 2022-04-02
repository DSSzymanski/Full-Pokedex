import './App.css';
import React from 'react'
import Card from './components/Card'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      recordList: [],
      numGens: 0,
      icons: [],
    }
  };

  async componentDidMount() {
    await fetch('http://127.0.0.1:8000/api/pokemon-list')
      .then(response => response.json())
      .then(data =>
        this.setState({pokemonList : data})
      )
    this.setState({numGens: this.state.pokemonList.at(-1).generation})
  }

  render(){
    var pokemon = this.state.pokemonList
    //var numGens = this.state.numGens
    return(
      <div className="container">
        {pokemon.map((poke, index) => {
          return(
            <Card key={index} pokemon={poke} />
          )
        })}
      </div>
    )
  }
}

export default App;
