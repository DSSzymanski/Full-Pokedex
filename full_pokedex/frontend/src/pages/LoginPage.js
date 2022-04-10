import React, { useContext } from 'react'
import AuthContext from "../context/AuthContext"

const LoginPage = () => {
  let { loginUser, user } = useContext(AuthContext);
  console.log(user)
  return (
    <div className='LoginFormDiv'>
        <form onSubmit={ loginUser }>
            <input type="text" name="username" placeholder="Enter Username." />
            <input type="password" name="password" placeholder="Enter Password." />
            <input type="submit" />
        </form>
    </div>
  )
}

export default LoginPage;