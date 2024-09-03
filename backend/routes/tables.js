// backend/routes/tables.js
const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Rota para buscar todas as mesas e seus clientes
router.get('/tables', (req, res) => {
    const sql = `
        SELECT t.id AS tableId, t.numero AS tableNumber, t.status, c.nome AS clientName, c.telefone, c.email
        FROM tables t
        LEFT JOIN clients c ON t.id = c.tableId
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mesas:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        const tables = results.reduce((acc, row) => {
            const table = acc.find(t => t.id === row.tableId);
            if (table) {
                table.clients.push({
                    name: row.clientName,
                    phone: row.telefone,
                    email: row.email
                });
            } else {
                acc.push({
                    id: row.tableId,
                    tableNumber: row.tableNumber,
                    status: row.status,
                    clients: row.clientName ? [{
                        name: row.clientName,
                        phone: row.telefone,
                        email: row.email
                    }] : []
                });
            }
            return acc;
        }, []);
        
        res.json(tables);
    });
});

// Rota para adicionar uma nova mesa e seus clientes
router.post('/tables', (req, res) => {
    const { tableNumber, status, clients } = req.body;
    const sqlInsertTable = 'INSERT INTO tables (numero, status) VALUES (?, ?)';
    connection.query(sqlInsertTable, [tableNumber, status], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar mesa:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        const newTableId = result.insertId;

        if (clients && clients.length > 0) {
            const sqlInsertClients = 'INSERT INTO clients (nome, telefone, email, tableId) VALUES ?';
            const clientValues = clients.map(client => [client.name, client.phone, client.email, newTableId]);
            connection.query(sqlInsertClients, [clientValues], (err) => {
                if (err) {
                    console.error('Erro ao adicionar clientes:', err);
                    return res.status(500).json({ message: 'Erro no servidor ao adicionar clientes' });
                }
                res.status(201).json({ id: newTableId, tableNumber, status, clients });
            });
        } else {
            res.status(201).json({ id: newTableId, tableNumber, status, clients: [] });
        }
    });
});

// Endpoint para excluir uma mesa
router.delete('/tables/:id', (req, res) => {
    const tableId = req.params.id;

    const deleteTableSql = 'DELETE FROM tables WHERE id = ?';
    connection.query(deleteTableSql, [tableId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir mesa:', err);
            return res.status(500).json({ message: 'Erro ao excluir mesa' });
        }
        res.status(200).json({ message: 'Mesa excluída com sucesso' });
    });
});


router.put('/tables/:id', (req, res) => {
    const tableId = req.params.id;
    const { status, clients } = req.body;

    const sql = 'UPDATE tables SET status = ? WHERE id = ?';
    connection.query(sql, [status, tableId], (err) => {
        if (err) {
            console.error('Erro ao atualizar status da mesa:', err);
            return res.status(500).json({ message: 'Erro ao atualizar mesa' });
        }

        // Atualizar ou limpar clientes
        if (clients && clients.length === 0) {
            const clearClientsSql = 'DELETE FROM clients WHERE tableId = ?';
            connection.query(clearClientsSql, [tableId], (err) => {
                if (err) {
                    console.error('Erro ao limpar clientes:', err);
                    return res.status(500).json({ message: 'Erro ao limpar clientes' });
                }
                res.status(200).json({ message: 'Mesa e clientes atualizados' });
            });
        } else {
            res.status(200).json({ message: 'Mesa atualizada' });
        }
    });
});
module.exports = router;
