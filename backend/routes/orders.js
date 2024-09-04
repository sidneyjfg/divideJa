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

// Rota para excluir um pedido específico
router.delete('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const sql = `
        DELETE FROM itens_pedido
        WHERE id = ?
    `;
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir Item do pedido:', err);
            return res.status(500).json({ message: 'Erro ao excluir Item do pedido' });
        }
        res.json({ message: 'Item do pedido excluído com sucesso' });
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

// Rota para buscar todos os pedidos de uma mesa específica
router.get('/orders/table/:tableId', (req, res) => {
    const tableId = req.params.tableId;
    const sql = `
        SELECT o.id AS orderId, o.descricao, o.quantidade, o.preco, o.clientId, c.nome AS clientName
        FROM itens_pedido o
        JOIN clients c ON o.clientId = c.id
        WHERE o.tableId = ?
    `;
    connection.query(sql, [tableId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar pedidos:', err);
            return res.status(500).json({ message: 'Erro ao buscar pedidos' });
        }

        // Organiza os pedidos por nome do cliente
        const ordersByClient = results.reduce((acc, order) => {
            if (!acc[order.clientName]) {
                acc[order.clientName] = [];
            }
            acc[order.clientName].push({
                id: order.orderId,
                descricao: order.descricao,
                quantidade: order.quantidade,
                preco: order.preco,
                clientId: order.clientId,
            });
            return acc;
        }, {});

        res.json(ordersByClient);
    });
});


// Rota para atualizar um pedido específico
router.put('/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const { descricao, quantidade, preco } = req.body;
    const sql = `
        UPDATE itens_pedido
        SET descricao = ?, quantidade = ?, preco = ?
        WHERE id = ?
    `;
    connection.query(sql, [descricao, quantidade, preco, orderId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            return res.status(500).json({ message: 'Erro ao atualizar pedido' });
        }
        res.json({ message: 'Pedido atualizado com sucesso' });
    });
});

// Rota para enviar pedidos para a cozinha
router.put('/orders/send-to-kitchen/:tableId', (req, res) => {
    const { tableId } = req.params;

    const sql = `
        UPDATE orders 
        SET status = 'enviado para cozinha'
        WHERE tableId = ? AND status = 'pendente'
    `;

    connection.query(sql, [tableId], (err, results) => {
        if (err) {
            console.error('Erro ao enviar pedidos para a cozinha:', err);
            return res.status(500).json({ message: 'Erro ao enviar pedidos' });
        }

        res.json({ message: 'Pedidos enviados para a cozinha com sucesso!' });
    });
});


module.exports = router;
