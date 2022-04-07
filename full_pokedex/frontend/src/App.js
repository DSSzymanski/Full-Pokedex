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
    var genArr = []
    for(let i = 1; i <= this.state.numGens; i++) {
      genArr.push(i);
    }
    return(
      <div className="container">
        {
          genArr.map((gen, index) => {
            return(
              <div key={index} className="genContainer">
                <h1 className="genHeader">
                  Generation {gen}
                </h1>
                <div className="pokemonContainer">
                  {pokemon.map((poke, index) => {
                    if(poke.generation === gen){
                      return(
                        <Card key={index} pokemon={poke} />
                        )
                      }
                    else{return null;}
                  })}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;
