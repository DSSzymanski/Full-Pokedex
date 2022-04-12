import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Card from '../components/Card'

const MainPage = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [recordList, setRecordList] = useState([]);
  let [genList, setGenList] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getPokemonDataFromAPI();
    getRecordDataFromAPI();
  }, [])

  let getPokemonDataFromAPI = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/pokemon-list');
    let data = await response.json();
    if(response.status === 200){
      setPokemonList(data);
    }
    else {
      logoutUser();
    }
    let numGens = data.at(-1).generation;
    let newGenList = [];
    for(let i = 1; i <= numGens; i++) {
      newGenList.push(i);
    }
    setGenList(newGenList);
  }

  let getRecordDataFromAPI = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/record-list', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(authTokens.access)
        }
    })
    let data = await response.json();
    if(response.status === 200){
      setRecordList(data);
    }
    else {
      logoutUser();
    }
    console.log(data);
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
                {pokemonList.map((poke, index) => {
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

export default MainPage;
