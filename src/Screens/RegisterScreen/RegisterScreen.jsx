import React from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import './RegisterScreen.css'

const RegisterScreen = () => {

    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }
    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }
    const { response, error, loading, sendRequest } = useFetch()
    function onRegister(form_state_sent) {
        sendRequest(
            () => {
                return register(
                    form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                    form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                    form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    const {
        form_state,
        onInputChange,
        handleSubmit
    } = useForm(initial_form_state, onRegister)


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Join Us!</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder='Tu nombre'
                            value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                            name={REGISTER_FORM_FIELDS.USERNAME}
                            id='username'
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="tu@email.com"
                            value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                            name={REGISTER_FORM_FIELDS.EMAIL}
                            onChange={onInputChange}
                            id='email'
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="••••••••"
                            value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                            name={REGISTER_FORM_FIELDS.PASSWORD}
                            onChange={onInputChange}
                            id='password'
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <div className="message-error">{error}</div>}
                    {response && <div className="message-success">Usuario registrado con exito! Verifica tu email para activar tu cuenta</div>}

                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>

                    <div className="auth-footer">
                        <span>Ya tenes una cuenta?</span>
                        <Link to="/login" className="auth-link">
                            Iniciar sesión
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterScreen