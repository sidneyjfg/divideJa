const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const connection = require('./config/db'); // Importa a conexão de 'db.js'

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Importar e usar rotas de usuários
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

const tableRoutes = require('./routes/tables');
app.use('/api', tableRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api', orderRoutes);

const clientsRoutes = require('./routes/clients'); 
app.use('/api', clientsRoutes);

// Rota para autenticação de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Tentativa de login:', { username, password });

    const sql = 'SELECT * FROM users WHERE login = ?';
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
        console.log('Usuário encontrado:', user);

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

            console.log('Login bem-sucedido, token gerado:', token);
            res.json({ token, user: { id: user.id, nome: user.nome, funcao: user.funcao } });
        });
    });
});
app.put('/api/tables/send-to-kitchen/:id', (req, res) => {
    const tableId = req.params.id;
    
    // Atualiza o status dos pedidos para 'enviado para cozinha'
    const sql = 'UPDATE orders SET status = ? WHERE tableId = ?';
    connection.query(sql, ['enviado para cozinha', tableId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar status dos pedidos:', err);
            return res.status(500).json({ message: 'Erro ao enviar pedidos para a cozinha' });
        }
        res.json({ message: 'Pedidos enviados para a cozinha com sucesso!' });
    });
});


// Porta de escuta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
