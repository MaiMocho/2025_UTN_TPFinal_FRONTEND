import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import './UserMenu.css' 
// 👇 CAMBIO: Importamos desde 'react-icons/bs' (Bootstrap Icons)
import { BsPencilSquare, BsCardImage, BsBoxArrowRight } from "react-icons/bs";

const UserMenu = () => {
    const { user, onLogout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const defaultAvatar = "/OG-Helpy.png"

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="user-menu-container">
            <div className="user-info" onClick={toggleMenu}>
                <span className="user-name">{user ? user.name : 'Usuario'}</span>
                <img 
                    src={defaultAvatar} 
                    alt="Perfil" 
                    className="user-avatar" 
                />
            </div>

            {isOpen && (
                <div className="menu-dropdown">
                    <div className="menu-header">
                        <p>Opciones de cuenta</p>
                    </div>
                    <ul className="menu-list">
                        <li className="menu-item"> <BsPencilSquare size={18} /> Editar Perfil
                        </li>
                        <li className="menu-item"> <BsCardImage size={18} /> Cambiar Foto
                        </li>
                        
                        <li className="menu-item logout" onClick={onLogout}> <BsBoxArrowRight size={18} /> Cerrar Sesión
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserMenu