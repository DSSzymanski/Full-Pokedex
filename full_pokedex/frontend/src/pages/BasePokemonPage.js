import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Card from '../components/Card'

const BasePokemonPage = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [genList, setGenList] = useState([]);
  let { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getPokemonDataFromAPI();
  }, [])

  let getPokemonDataFromAPI = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/pokemon-list', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })
    let data = await response.json();
    if(response.status === 200){
      setRecordList(data);
    }
    else {
      logoutUser();
    }
    let numGens = data.at(-1).pokemon.generation;
    let newGenList = [];
    for(let i = 1; i <= numGens; i++) {
      newGenList.push(i);
    }
    setGenList(newGenList);
  }

  return(
    <div className="container">
    {
      genList.map((gen, index) => {
        return(
          <div key={index} className="genContainer">
            <h1 className="genHeader">
              Generation {gen}
            </h1>
            <div className="pokemonContainer">
              {pokemonList.map((pokemon, index2) => {
                if(record.pokemon.generation === gen){
                  return(
                    <div>
                      {pokemon.id}
                    </div>
                    //<Card key={index2} pokemon={pokemon} />
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

export default BasePokemonPage;
