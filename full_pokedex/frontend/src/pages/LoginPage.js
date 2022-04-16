import React, { useContext } from 'react';
import AuthContext from "../context/AuthContext";
import './LoginPage.css';

const LoginPage = () => {
  let { loginUser, signUpUser } = useContext(AuthContext);
  return (
    <div className='formDiv'>
      <form id="loginForm" onSubmit={ loginUser }>
        <h3>Log In</h3>
        <input type="text" className='loginInput' name="username" placeholder="Enter Username." />
        <input type="password" className='loginInput' name="password" placeholder="Enter Password." />
        <input type="submit" className="submit" />
      </form>
      <form id="signUpForm" onSubmit={ signUpUser }>
        <h3>Sign Up</h3>
        <input type="email" className='signUpInput' name="email" placeholder="Enter Email." />
        <input type="text" className='signUpInput' name="username" placeholder="Enter Username." />
        <input type="password" className='signUpInput' name="password" placeholder="Enter Password." />
        <input type="submit" className="submit"/>
      </form>
    </div>
  )
}

export default LoginPage;