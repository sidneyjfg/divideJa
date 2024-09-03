// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Rota para adicionar um novo pedido
router.post('/orders', (req, res) => {
    const { descricao, quantidade, preco, clientId, tableId } = req.body;
    const sql = 'INSERT INTO itens_pedido (descricao, quantidade, preco, clientId, tableId) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(sql, [descricao, quantidade, preco, clientId, tableId], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pedido:', err);
            return res.status(500).json({ message: 'Erro ao salvar pedido' });
        }
        res.status(201).json({ message: 'Pedido adicionado com sucesso!', orderId: result.insertId });
    });
});


// Rota para buscar todos os pedidos de um cliente específico
router.get('/orders/client/:clientId', (req, res) => {
    const { clientId } = req.params;
    const sql = `
        SELECT ip.id AS itemId, ip.descricao, ip.quantidade, ip.preco, p.id AS pedidoId, p.status
        FROM itens_pedido ip
        JOIN pedidos p ON ip.pedidoId = p.id
        WHERE ip.clientId = ?
    `;
    connection.query(sql, [clientId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pedidos do cliente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao buscar pedidos do cliente' });
        }
        res.json(results);
    });
});

module.exports = router;
