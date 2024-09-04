-- Excluir tabelas existentes para começar do zero (opcional, cuidado ao usar em produção)
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS tables;
--DROP TABLE IF EXISTS users;

-- Tabela de Mesas
CREATE TABLE tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL, -- Alterado de 'tableNumber' para 'numero'
    status ENUM('available', 'unavailable') DEFAULT 'available',
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    tableId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);

-- Tabela de Pedidos
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

-- Tabela de Itens de Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    orderId INT,
    clientId INT,
    tableId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (tableId) REFERENCES tables(id) ON DELETE CASCADE
);
