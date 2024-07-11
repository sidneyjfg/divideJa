import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LateralBar.css';
import profilePic from '../assets/images/profile.png';

// Importações do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faPlus, faHistory, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LateralBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="lateral-bar">
            <div className="profile-section">
                <img className="profile-pic" src={profilePic} alt="Employer profile" />
                <h2>Felipe Monteleão</h2>
                <p>#3456</p>
            </div>
            <nav className="menu">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className={activeItem === '/' ? 'active' : ''}
                            onClick={() => handleItemClick('/')}
                        >
                            <FontAwesomeIcon icon={faHome} className="menu-icon" /> INÍCIO
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/amigos"
                            className={activeItem === '/amigos' ? 'active' : ''}
                            onClick={() => handleItemClick('/amigos')}
                        >
                            <FontAwesomeIcon icon={faUsers} className="menu-icon" /> AMIGOS
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/create-table"
                            className={activeItem === '/create-table' ? 'active' : ''}
                            onClick={() => handleItemClick('/create-table')}
                        >
                            <FontAwesomeIcon icon={faPlus} className="menu-icon" /> CRIAR NOVA MESA
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/historico"
                            className={activeItem === '/historico' ? 'active' : ''}
                            onClick={() => handleItemClick('/historico')}
                        >
                            <FontAwesomeIcon icon={faHistory} className="menu-icon" /> HISTÓRICO
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/configuracoes"
                            className={activeItem === '/configuracoes' ? 'active' : ''}
                            onClick={() => handleItemClick('/configuracoes')}
                        >
                            <FontAwesomeIcon icon={faCog} className="menu-icon" /> CONFIGURAÇÕES
                        </Link>
                    </li>
                </ul>
            </nav>
            <button className="logout-button">
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> SAIR
            </button>
        </div>
    );
};

export default LateralBar;
