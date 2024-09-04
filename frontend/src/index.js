// src/index.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LateralBar from './components/LateralBar';
import Container from './components/Container';
import HomePage from './pages/HomePage';
import Settings from './components/Settings';
import CreateTablePage from './pages/CreateTablePage';
import ManageOrdersPage from './pages/ManageOrdersPage';
import KitchenPage from './pages/KitchenPage';
import LoginPage from './pages/LoginPage'; // Importe a página de login
import './index.css';

// Define a estrutura principal do aplicativo
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

    // Função de login para simular autenticação
    const handleLogin = (status) => {
        setIsAuthenticated(status);
    };

    // Função de logout
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="app">
                {isAuthenticated && <LateralBar onLogout={handleLogout} />} {/* Exibe a barra lateral apenas se autenticado */}
                <Container>
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
                            }
                        />
                        <Route
                            path="/"
                            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/create-table"
                            element={isAuthenticated ? <CreateTablePage /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/manage-orders"
                            element={isAuthenticated ? <ManageOrdersPage /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/configuracoes"
                            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/cozinha"
                            element={isAuthenticated ? <KitchenPage /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

// Renderize o aplicativo no elemento com ID root
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
