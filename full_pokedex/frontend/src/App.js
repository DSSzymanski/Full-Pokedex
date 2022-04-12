import './App.css';
import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import {AuthProvider, AuthContext} from './context/AuthContext';

class App extends React.Component {
  render(){
    return (
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            exact 
            path="/"
            element={
              <MainPage />
            }
          />
        </Routes>
      </AuthProvider>
    )
  }
}

export default App;
