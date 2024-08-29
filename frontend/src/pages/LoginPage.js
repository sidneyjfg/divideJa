// src/pages/LoginPage.js

import React, { useState } from 'react';
import './LoginPage.css';
import api from '../api/axios';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', { username, password });
            const { token, user } = response.data;

            // Armazenar o token no localStorage
            localStorage.setItem('token', token);
            onLogin(true); // Chama a função de login com sucesso

            console.log('Usuário logado:', user);
        } catch (error) {
            alert('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome de Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;
