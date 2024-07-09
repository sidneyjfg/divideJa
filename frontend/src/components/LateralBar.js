import React, { useState } from 'react';
import './LateralBar.css';
import profilePic from '../assets/images/profile.png';

// Importações do Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faPlus, faHistory, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LateralBar = () => {
    const [activeItem, setActiveItem] = useState('inicio');

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
                        <a
                            href="/"
                            className={activeItem === 'inicio' ? 'active' : ''}
                            onClick={() => handleItemClick('inicio')}
                        >
                            <FontAwesomeIcon icon={faHome} className="menu-icon" /> INÍCIO
                        </a>
                    </li>
                    <li>
                        <a
                            href="amigos"
                            className={activeItem === 'amigos' ? 'active' : ''}
                            onClick={() => handleItemClick('amigos')}
                        >
                            <FontAwesomeIcon icon={faUsers} className="menu-icon" /> AMIGOS
                        </a>
                    </li>
                    <li>
                        <a
                            href="create-table"
                            className={activeItem === 'create-table' ? 'active' : ''}
                            onClick={() => handleItemClick('create-table')}
                        >
                            <FontAwesomeIcon icon={faPlus} className="menu-icon" /> CRIAR NOVA MESA
                        </a>
                    </li>
                    <li>
                        <a
                            href="historico"
                            className={activeItem === 'historico' ? 'active' : ''}
                            onClick={() => handleItemClick('historico')}
                        >
                            <FontAwesomeIcon icon={faHistory} className="menu-icon" /> HISTÓRICO
                        </a>
                    </li>
                    <li>
                        <a
                            href="configuracoes"
                            className={activeItem === 'configuracoes' ? 'active' : ''}
                            onClick={() => handleItemClick('configuracoes')}
                        >
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
