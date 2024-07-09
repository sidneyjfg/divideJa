import React from 'react';
import './LateralBar.css';
import profilePic from '../assets/images/profile.png';

// Importações do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faPlus, faHistory, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LateralBar = () => {
    return (
        <div className="lateral-bar">
            <div className="profile-section">
                <img className="profile-pic" src={profilePic} alt="Profile" />
                <h2>Felipe Monteleão</h2>
                <p>#3456</p>
            </div>
            <nav className="menu">
                <ul>
                    <li>
                        <a href="#inicio">
                            <FontAwesomeIcon icon={faHome} className="menu-icon" /> INÍCIO
                        </a>
                    </li>
                    <li>
                        <a href="#amigos">
                            <FontAwesomeIcon icon={faUsers} className="menu-icon" /> AMIGOS
                        </a>
                    </li>
                    <li>
                        <a href="#criar-mesa">
                            <FontAwesomeIcon icon={faPlus} className="menu-icon" /> CRIAR NOVA MESA
                        </a>
                    </li>
                    <li>
                        <a href="#historico">
                            <FontAwesomeIcon icon={faHistory} className="menu-icon" /> HISTÓRICO
                        </a>
                    </li>
                    <li>
                        <a href="#configuracoes">
                            <FontAwesomeIcon icon={faCog} className="menu-icon" /> CONFIGURAÇÕES
                        </a>
                    </li>
                </ul>
            </nav>
            <button className="logout-button">
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> SAIR
            </button>
        </div>
    );
}

export default LateralBar;
