import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router'
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../Context/AuthContext'
import './LoginScreen.css'

const LoginScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { onLogin } = useContext(AuthContext)

    useEffect(
        () => {
            const query = new URLSearchParams(location.search)
            const from = query.get('from')
            if (from === 'verified_email') {
                alert('Has validado tu mail exitosamente')
            }
        },
        []
    )

    const LOGIN_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state = {
        [LOGIN_FORM_FIELDS.EMAIL]: '',
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    }

    const { response, error, loading, sendRequest, resetResponse } = useFetch()

    function handleLogin(form_state_sent) {
        if (!form_state_sent.email.trim() || !form_state_sent.password.trim()) {
            alert("Por favor, completa todos los campos."); 
            return;
        }

        resetResponse()
        sendRequest(
            () => {
                return login(
                    form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
                    form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    const {
        form_state,
        onInputChange,
        handleSubmit,
        resetForm
    } = useForm(initial_form_state, handleLogin)

    useEffect(
        () => {
            if (response && response.ok) {
                onLogin(response.body.auth_token)
            }
        },
        [response]
    )

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Bienvenido de vuelta!</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="tu@email.com"
                            value={form_state[LOGIN_FORM_FIELDS.EMAIL]}
                            name={LOGIN_FORM_FIELDS.EMAIL}
                            onChange={onInputChange}
                            id={'email'}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="••••••••"
                            value={form_state[LOGIN_FORM_FIELDS.PASSWORD]}
                            name={LOGIN_FORM_FIELDS.PASSWORD}
                            onChange={onInputChange}
                            id={'password'}
                        />
                    </div>

                    {error && <div className="message-error">{error}</div>}
                    {response && <div className="message-success">Login exitoso! Redirigiendo...</div>}

                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>

                    <div className="auth-footer">
                        <span>¿No tienes cuenta?</span>
                        <Link to="/register" className="auth-link">
                            ¡Crea una!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen