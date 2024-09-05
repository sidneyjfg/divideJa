-- Excluir tabelas existentes para começar do zero (opcional, cuidado ao usar em produção)
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS tables;
-- DROP TABLE IF EXISTS users;

-- Tabela de Mesas (tables)
CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    status ENUM('available', 'unavailable') DEFAULT 'available'
);

-- Tabela de Clientes (clients)
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    tableId INT,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);


-- Tabela de Pedidos (orders) se for necessário
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT,
    tableId INT,
    status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);

-- Tabela de Itens de Pedido (itens_pedido)
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    clientId INT,
    tableId INT,
    orderId INT, -- Se estiver relacionado a uma tabela de pedidos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
);

ALTER TABLE itens_pedido ADD COLUMN status ENUM('pendente', 'enviado para cozinha', 'concluído') DEFAULT 'pendente';
