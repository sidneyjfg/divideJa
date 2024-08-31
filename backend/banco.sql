-- Excluir tabelas existentes para começar do zero (opcional, cuidado ao usar em produção)
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS users;

-- Criar tabela de mesas
CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100),
    tableId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tableId INT,
    status VARCHAR(20) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);

-- Criar tabela de itens de pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedidoId INT,
    descricao VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedidoId) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- Inserir mesas de teste
INSERT INTO tables (id, numero, status) VALUES
(1, '1', 'unavailable'),
(2, '2', 'unavailable'),
(3, '3', 'available');

-- Inserir clientes de teste associados às mesas com telefone e email
INSERT INTO clients (nome, telefone, email, tableId) VALUES
('João', '123-456-7890', 'joao@example.com', 1),
('Maria', '987-654-3210', 'maria@example.com', 1),
('Carlos', '555-123-4567', 'carlos@example.com', 1),
('Ana', '444-555-6666', 'ana@example.com', 1),
('Pedro', '111-222-3333', 'pedro@example.com', 2),
('Paula', '222-333-4444', 'paula@example.com', 2),
('Fernanda', '333-444-5555', 'fernanda@example.com', 2);

-- Inserir usuários de teste
INSERT INTO users (nome, funcao, login, senha, foto) VALUES
('Sidney Junio', 'Administrador', 'admin', '$2a$10$hashedpassword', NULL),
('João Cozinheiro', 'Cozinheiro', 'cozinheiro', '$2a$10$hashedpassword', NULL),
('Maria Caixa', 'Caixa', 'caixa', '$2a$10$hashedpassword', NULL),
('Carlos Garçom', 'Garçom', 'garcom', '$2a$10$hashedpassword', NULL);

-- Inserir pedidos de teste
INSERT INTO pedidos (tableId, status) VALUES
(1, 'pendente'),
(2, 'finalizado');

-- Inserir itens de pedido de teste
INSERT INTO itens_pedido (pedidoId, descricao, quantidade, preco) VALUES
(1, 'Pizza Margherita', 2, 25.50),
(1, 'Coca Cola', 1, 5.00),
(2, 'Lasanha', 1, 30.00),
(2, 'Suco de Laranja', 1, 7.00);
