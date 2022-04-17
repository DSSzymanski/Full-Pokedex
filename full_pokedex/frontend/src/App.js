import './App.css';
import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';

class App extends React.Component {
  render(){
    return (
      <AuthProvider>
        <Routes>
          <Route path='/login' element={
            <>
              <Navbar />
              <LoggedInRedirect>
                <LoginPage />
              </LoggedInRedirect>
            </>
          } />
          <Route
            exact 
            path="/"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    )
  }
}

const LoggedInRedirect = ({children}) => {
  let { user } = useContext(AuthContext);
  if (user) {
    return(
      <Navigate to='/' />
    )
  }
  return children;
}

const PrivateRoute = ({children, navTo='/login'}) => {
  let { user } = useContext(AuthContext);
  if(!user) {
    return(
      <Navigate to={navTo} />
    )
  }
  return children;
}

export default App;
