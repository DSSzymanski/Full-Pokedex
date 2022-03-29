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
        console.log('Data', data)
      )
  }

  render(){
    return(
      <div className="container">

      </div>
    )
  }
}

export default App;
