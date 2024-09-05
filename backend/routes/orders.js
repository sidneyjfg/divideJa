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

router.put('/orders/send-to-kitchen/:tableId', (req, res) => {
    const { tableId } = req.params;

    // Primeiro, criar um pedido na tabela 'orders' para cada cliente da mesa
    const insertOrderSql = `
        INSERT INTO orders (clientId, tableId, status)
        SELECT DISTINCT clientId, tableId, 'enviado para cozinha'
        FROM itens_pedido
        WHERE tableId = ? AND status = 'pendente'
    `;

    connection.query(insertOrderSql, [tableId], (err, orderResults) => {
        if (err) {
            console.error('Erro ao criar pedidos:', err);
            return res.status(500).json({ message: 'Erro ao criar pedidos' });
        }

        const orderIds = orderResults.insertId;

        // Atualizar os itens_pedido associados para o novo status e associar ao pedido
        const updateItemsSql = `
            UPDATE itens_pedido
            SET status = 'enviado para cozinha', orderId = LAST_INSERT_ID()
            WHERE tableId = ? AND status = 'pendente'
        `;

        connection.query(updateItemsSql, [tableId], (err, updateResults) => {
            if (err) {
                console.error('Erro ao atualizar itens do pedido:', err);
                return res.status(500).json({ message: 'Erro ao atualizar itens do pedido' });
            }

            res.json({ message: 'Pedidos enviados para a cozinha com sucesso!', orderIds });
        });
    });
});


// Rota para enviar pedidos para a cozinha
router.get('/kitchen/orders', (req, res) => {
    const sql = `
        SELECT o.id, o.descricao, o.quantidade, o.preco, t.numero AS tableNumber, c.nome AS clientName
        FROM itens_pedido o
        JOIN tables t ON o.tableId = t.id
        JOIN clients c ON o.clientId = c.id
        WHERE o.status = 'enviado para cozinha'
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pedidos da cozinha:', err);
            return res.status(500).json({ message: 'Erro no servidor ao buscar pedidos da cozinha' });
        }
        res.json(results);
    });
});



module.exports = router;
