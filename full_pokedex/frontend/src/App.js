import './App.css';
import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext';
import AuthContext from './context/AuthContext';

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

const PrivateRoute = ({children}) => {
  let { user } = useContext(AuthContext);
  if(!user) {
    return(
      <Navigate to='/login' />
    )
  }
  return children;
}

export default App;
