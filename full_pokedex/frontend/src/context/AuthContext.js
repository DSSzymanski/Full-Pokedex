import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    )
    let [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
    )
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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
            navigate('/')
        }
        else {
            alert("Invalid login information.")
        }
    }

    let getLocalStorageRecordsAsJson = () => {
        const recordStr = 'Record'
        let pokemonDataInStorage = {}
        for (const key in localStorage) {
            if (key.includes(recordStr)) {
                const pokemonID = key.split(recordStr)[0];
                pokemonDataInStorage[pokemonID] = localStorage.getItem(key);
            }
        }
        return JSON.stringify(pokemonDataInStorage);
    }

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
                'password': e.target.password.value
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            loginUser(e);
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

    let logoutUser = () => {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        setUser(null);
        navigate('/login');
    }

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
        if(loading){
            setLoading(false)
        }
    }

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
