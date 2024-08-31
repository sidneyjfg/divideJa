// backend/routes/clients.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Endpoint para verificar se um cliente já existe
router.get('/clients', (req, res) => {
    const { name } = req.query;
    const sql = 'SELECT * FROM clients WHERE nome = ?';
    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Erro ao verificar cliente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao verificar cliente' });
        }
        res.json(results);
    });
});
router.get('/clients/name/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'SELECT * FROM clients WHERE nome = ?';
    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.json(null);
        }
    });
});

// Endpoint para criar um novo cliente
router.post('/clients', (req, res) => {
    const { name, phone, email, tableNumber } = req.body;

    const sqlInsertClient = 'INSERT INTO clients (nome, telefone, email, tableId) VALUES (?, ?, ?, ?)';
    
    // Primeiro, encontre o ID da mesa com base no número da mesa fornecido
    const findTableSql = 'SELECT id FROM tables WHERE numero = ?';
    connection.query(findTableSql, [tableNumber], (err, tableResult) => {
        if (err) {
            console.error('Erro ao buscar a mesa:', err);
            return res.status(500).json({ message: 'Erro ao buscar a mesa' });
        }
        
        if (tableResult.length === 0) {
            console.error('Mesa não encontrada com o número:', tableNumber);
            return res.status(404).json({ message: 'Mesa não encontrada' });
        }

        const tableId = tableResult[0].id;

        connection.query(sqlInsertClient, [name, phone, email, tableId], (err, result) => {
            if (err) {
                console.error('Erro ao criar cliente:', err);
                return res.status(500).json({ message: 'Erro no servidor ao criar cliente' });
            }
            res.status(201).json({ id: result.insertId, name, phone, email, tableId });
        });
    });
});


router.post('/orders', (req, res) => {
    const { descricao, quantidade, preco, clientId } = req.body;
    const sqlInsertOrder = 'INSERT INTO itens_pedido (descricao, quantidade, preco, clientId) VALUES (?, ?, ?, ?)';
    
    connection.query(sqlInsertOrder, [descricao, quantidade, preco, clientId], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pedido:', err);
            return res.status(500).json({ message: 'Erro no servidor ao adicionar pedido' });
        }
        res.status(201).json({ id: result.insertId, descricao, quantidade, preco, clientId });
    });
});

module.exports = router;
