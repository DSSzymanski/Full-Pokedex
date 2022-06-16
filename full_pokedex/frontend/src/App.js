import './App.css';
import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import UserPokemonPage from './pages/UserPokemonPage'
import LoginPage from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BasePokemonPage from './pages/BasePokemonPage';
import { FilterProvider } from './context/FilterContext';

class App extends React.Component {
  render(){
    return (
      <>
        <AuthProvider>
          <FilterProvider>
            <Routes>
              <Route
                path='/login'
                element={
                  <>
                    <Navbar />
                    <LoggedInRedirect>
                      <LoginPage />
                    </LoggedInRedirect>

                  </>
                }
              />
              <Route
                path="/base"
                element={
                  <>
                    <Navbar />
                    <LoggedInRedirect>
                      <BasePokemonPage />
                    </LoggedInRedirect>
                  </>
                }
              />
              <Route
                exact 
                path="/"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <UserPokemonPage />
                    </PrivateRoute>
                  </>
                }
              />
            </Routes>
          </FilterProvider>
        </AuthProvider>
        <Footer />
      </>
    )
  }
}

//private route used to redirect from base page or login pages (non user pages) to the route page for users.
const LoggedInRedirect = ({children}) => {
  let { user } = useContext(AuthContext);
  if (user) {
    return(
      <Navigate to='/' />
    )
  }
  return children;
}

//private route used to redirect from the user generated page if there isn't a user logged in.
const PrivateRoute = ({children, navTo='/base'}) => {
  let { user } = useContext(AuthContext);
  if(!user) {
    return(
      <Navigate to={navTo} />
    )
  }
  return children;
}

export default App;
