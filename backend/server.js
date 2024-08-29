// backend/server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para autenticação de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; // Certifique-se de que os campos do Postman sejam consistentes

    const sql = 'SELECT * FROM users WHERE login = ?'; // Usando a tabela 'users' e campo 'login'
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
        if (results.length === 0) {
            console.log('Usuário não encontrado:', username);
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];

        // Comparar a senha digitada com a senha armazenada no banco de dados
        bcrypt.compare(password, user.senha, (err, isMatch) => {
            if (err) {
                console.error('Erro ao comparar senhas:', err);
                return res.status(500).json({ message: 'Erro no servidor' });
            }
            if (!isMatch) {
                console.log('Senha incorreta para o usuário:', username);
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            // Gerar token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            console.log('Login bem-sucedido, token gerado');
            res.json({ token, user: { id: user.id, nome: user.nome, funcao: user.funcao } });
        });
    });
});

// Porta de escuta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
