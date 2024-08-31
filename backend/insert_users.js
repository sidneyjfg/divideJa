const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Função para criptografar senhas e inserir usuários usando Promises
const insertUser = (nome, login, funcao, senha) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(senha, 10, (err, hash) => {
            if (err) {
                return reject(`Erro ao criptografar a senha para o usuário ${nome}: ${err}`);
            }

            const sql = 'INSERT INTO users (nome, login, funcao, senha) VALUES (?, ?, ?, ?)';
            connection.query(sql, [nome, login, funcao, hash], (err, result) => {
                if (err) {
                    return reject(`Erro ao inserir usuário ${nome}: ${err}`);
                } else {
                    resolve(`Usuário ${nome} inserido com sucesso!`);
                }
            });
        });
    });
};

// Conectar ao banco de dados e inserir usuários
connection.connect(async (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');

    try {
        // Inserir usuários
        console.log(await insertUser('Sidney', 'adm', 'Administrador', 'adm'));
        console.log(await insertUser('João', 'caixa', 'Caixa', 'caixa'));
        console.log(await insertUser('Maria', 'cozinheiro', 'Cozinheiro', 'cozinheiro'));
        console.log(await insertUser('Pedro', 'garcom', 'Garçom', 'garçom'));

    } catch (err) {
        console.error(err);
    } finally {
        // Fechar a conexão após todas as operações
        connection.end();
        console.log('Conexão com o banco de dados encerrada.');
    }
});
