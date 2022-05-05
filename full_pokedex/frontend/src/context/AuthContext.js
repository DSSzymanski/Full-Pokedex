import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

/**
 * The AuthContext handles user authorization and creation of users.
 * AuthContext contains 5 main values:
 *      loginUser to pass data to the API to validate a login
 *      logoutUser to clear JWT Tokens and delete user data inside local storage
 *      user which contains the data held within the decoded JWT access token
 *      authTokens which stores the access and refresh JWT tokens for the user
 *      signUpUser which passes data to the API to validate a new user creation
 */

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    //gets the authToken from localStorage or default to null
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    )
    //decode user from access authToken if in localStorage or default to null
    let [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
    )
    //flag used to trigger updateToken on page load in useEffect
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    //str used to find records stored in localStorage (getLocalStorageRecordsAsJson and clearLocalStorageRecords)
    const recordStr = 'Record'

    /**
     * Sends request to API with login data to try to validate a user. If response indicates a valid
     * login, saves the auth token to localStorage and updates user and authTokens state. If not a valid
     * login, sends alert to browser and doesn't update.
     *
     * @param {*} e event which triggers method
     */
    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
        }
        else {
            alert("Invalid login information.")
        }
    }

    /**
     * Scans local storage to find any records and returns them as a JSON string.
     * Records are only in local storage for non-user states.
     * Function is only used in the signUpUser function when creating a new user.
     *
     * @returns str returns JSON string representing all records in local storage.
     */
    let getLocalStorageRecordsAsJson = () => {
        let pokemonDataInStorage = {}
        for (const key in localStorage) {
            if (key.includes(recordStr)) {
                const pokemonID = key.split(recordStr)[0];
                pokemonDataInStorage[pokemonID] = localStorage.getItem(key);
            }
        }
        return JSON.stringify(pokemonDataInStorage);
    }

    /**
     * Removes all records stored in local storage.
     * Records are only in local storage for non-user states.
     * Function is only used in the signUpUser function after a new user has been created.
     */
    let clearLocalStorageRecords = () => {
        for (const key in localStorage) {
            if (key.includes(recordStr)) {
                localStorage.removeItem(key);
            }
        }
    }

    /**
     * Function sends information in request to API to attempt to create a new user.
     * Sends email, username, and password fields from login page and gets record
     * data from local storage.
     * If a valid response is received, removed records from local storage and attempts
     * to login user and through that transition to the logged in view.
     * If an invalid response is received, sends why the user wasn't created as an alert.
     *
     *@param {*} e event which triggers method
     */
    let signUpUser = async(e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/create-user/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'username': e.target.username.value,
                'password': e.target.password.value,
                'records': getLocalStorageRecordsAsJson(),
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            await loginUser(e);
            clearLocalStorageRecords();
        }
        else {
            let alertMsg = "";
            for(const property in data) {
                for(const msg in data[property]) {
                    alertMsg = alertMsg.concat(data[property][msg] + '\n');
                }
            }
            alert(alertMsg);
        }
    }

    /**
     * Function clears user data from local storage and context and redirects to login page.
     */
    let logoutUser = () => {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        setUser(null);
        navigate('/login');
    }

    /**
     * Attempts to refresh the authToken by sending refresh token data to the API.
     * If a valid response is received, update the token using the data.
     * Else calls logout function to delete the tokens as they are invalid.
     */
    let updateToken = async() => {
        //if no tokens exist, don't send call to api
        if(!authTokens) {
            setLoading(false);
            return;
        }
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
        }
        else {
            logoutUser();
        }
        //if initialization through useEffect
        if(loading){
            setLoading(false)
        }
    }

    //Use effect sets an interval to update the refresh token every 3 mins.
    useEffect(() => {
        if(loading) {
            updateToken()
        }
        let intervalTime = 3 * 60 * 1000
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, intervalTime)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    //Data passed through provider to children.
    let contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens,
        signUpUser: signUpUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
