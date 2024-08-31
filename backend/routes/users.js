// backend/routes/users.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Importa a conexão com o banco de dados
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

// Rota para obter informações do usuário autenticado
router.get('/user-info', authMiddleware, (req, res) => {
    const userId = req.user.id; // Recupera o ID do usuário a partir do token JWT

    const sql = 'SELECT nome, funcao FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar informações do usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        res.json(user);
    });
});

module.exports = router;
