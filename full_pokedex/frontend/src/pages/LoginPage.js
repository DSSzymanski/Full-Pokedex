import React, { useContext } from 'react';
import AuthContext from "../context/AuthContext";
import './LoginPage.css';

/**
 * Basic page with 2 forms, one for signing up for a new user and one for
 * logging in an existing user. Uses context to handle the API calls and
 * redirection after a valid call.
 *
 * @returns log in / signup page element
 */
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