const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configurar a conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,   // Host do banco de dados
    user: process.env.DB_USER,   // Usuário do banco de dados
    password: process.env.DB_PASS, // Senha do banco de dados
    database: process.env.DB_NAME // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
    
    // Selecionar todos os usuários
    const selectUsers = 'SELECT id, senha FROM users';
    
    connection.query(selectUsers, async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            connection.end();
            return;
        }
        
        // Iterar sobre cada usuário e atualizar a senha
        for (let user of results) {
            const userId = user.id;
            const plainPassword = user.senha;
            
            try {
                // Gerar o hash da senha
                const hashedPassword = await bcrypt.hash(plainPassword, 10);
                
                // Atualizar a senha no banco de dados
                const updatePassword = 'UPDATE users SET senha = ? WHERE id = ?';
                connection.query(updatePassword, [hashedPassword, userId], (err, result) => {
                    if (err) {
                        console.error(`Erro ao atualizar senha para o usuário com ID ${userId}:`, err);
                    } else {
                        console.log(`Senha atualizada com sucesso para o usuário com ID ${userId}`);
                    }
                });
            } catch (err) {
                console.error(`Erro ao criptografar a senha para o usuário com ID ${userId}:`, err);
            }
        }
        
        // Encerrar a conexão
        connection.end();
    });
});
