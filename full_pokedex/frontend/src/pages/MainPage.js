import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Card from '../components/Card'

const MainPage = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [recordList, setRecordList] = useState([]);
  let [genList, setGenList] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getRecordDataFromAPI();
  }, [])


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
    let numGens = data.at(-1).pokemon.generation;
    let newGenList = [];
    for(let i = 1; i <= numGens; i++) {
      newGenList.push(i);
    }
    setGenList(newGenList);
  }

  const LoggedOutPage = () => {
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

  const LoggedInPage = () => {
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
                {recordList.map((record, index) => {
                  if(record.pokemon.generation === gen){
                    return(
                      <Card key={index} record={record} pokemon={record.pokemon} />
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

  return(
    <LoggedInPage />
  )
}

export default MainPage;
