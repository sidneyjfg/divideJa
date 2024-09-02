// backend/routes/clients.js

const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Endpoint para buscar cliente por nome
router.get('/clients/name/:name', (req, res) => {
    const { name } = req.params;
    const sql = 'SELECT * FROM clients WHERE nome = ?';
    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            return res.status(500).json({ message: 'Erro ao buscar cliente' });
        }
        console.log("Clientes encontraods: ",results)
        res.json(results);
        
    });
});

// Endpoint para criar um novo cliente
router.post('/clients', (req, res) => {
    const { name, phone, email, tableNumber } = req.body;
    const sqlInsertClient = 'INSERT INTO clients (nome, telefone, email, tableId) VALUES (?, ?, ?, ?)';

    // Primeiro, encontre o ID da mesa com base no número da mesa fornecido
    const findTableSql = 'SELECT id FROM tables WHERE numero = ?';
    connection.query(findTableSql, [tableNumber], (err, tableResult) => {
        if (err || tableResult.length === 0) {
            console.error('Erro ao encontrar a mesa:', err);
            return res.status(500).json({ message: 'Erro ao encontrar a mesa' });
        }
        
        const tableId = tableResult[0].id;

        connection.query(sqlInsertClient, [name, phone || null, email || null, tableId], (err, result) => {
            if (err) {
                console.error('Erro ao criar cliente:', err);
                return res.status(500).json({ message: 'Erro no servidor ao criar cliente' });
            }
            res.status(201).json({ id: result.insertId, name, phone, email, tableId });
        });
    });
});

// Rota para deletar um cliente
router.delete('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const sqlDeleteClient = 'DELETE FROM clients WHERE id = ?';

    connection.query(sqlDeleteClient, [clientId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao deletar cliente' });
        }

        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    });
});


module.exports = router;
