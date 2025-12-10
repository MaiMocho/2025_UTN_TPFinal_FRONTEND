import { createContext, useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

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
            
            if (token && isExpired(token)) {
                onLogout() 
                Swal.fire({
                    title: '⚠️ Sesión Finalizada',
                    text: 'Tu tiempo de sesión ha expirado. Por favor, inicia sesión nuevamente.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'session-expired-popup',
                        title: 'session-expired-title',
                        confirmButton: 'session-expired-btn',
                        container: 'session-expired-backdrop'
                    }
                })
            }
        }, 5000) 

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