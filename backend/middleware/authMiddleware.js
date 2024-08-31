// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Decodifica o token e armazena os dados do usuário
        next(); // Continua para a próxima função
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
