import { createContext, useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt"; 
import { useNavigate } from "react-router";

export const AUTH_TOKEN_KEY = 'auth_token'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        
        if (token) {

            if (isExpired(token)) {
                onLogout()
            } else {
                const userDecoded = decodeToken(token)
                setUser(userDecoded)
                setIsLogged(true)
            }
        } else {
            setIsLogged(false)
            setUser(null)
        }
    }, [])

    useEffect(() => {
        if (!isLogged) return;

        const intervalId = setInterval(() => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY)
            
            // Si hay token y expiró...
            if (token && isExpired(token)) {
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.") // Opcional: Avisar al usuario
                onLogout() // Sacarlo automáticamente
            }
        }, 5000) // 5000ms = 5 segundos

        // Limpieza: Cuando el componente se desmonte o el usuario haga logout, matamos el intervalo
        return () => clearInterval(intervalId)
    }, [isLogged])


    function onLogout(){
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setIsLogged(false)
        setUser(null)
        navigate('/login')
    }

    function onLogin (auth_token){
        localStorage.setItem(AUTH_TOKEN_KEY, auth_token)
        setIsLogged(true)
        const user_session = decodeToken(auth_token)
        setUser(user_session)
        navigate('/home')
    }

    return (
        <AuthContext.Provider value={{ isLogged, user, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider