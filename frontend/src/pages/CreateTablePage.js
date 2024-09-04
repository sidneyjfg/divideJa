import React, { useState, useEffect } from 'react';
import './CreateTablePage.css';
import { FaClipboardList } from 'react-icons/fa'; // Ícone de pedido
import Modal from '../components/Modal';
import OrderModal from '../components/OrderModal'; // Nova modal para pedidos
import api from '../api/axios';

const CreateTablePage = () => {
    const [tables, setTables] = useState([]);
    const [activeTableId, setActiveTableId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // Estado para abrir a modal de pedidos
    const [notification, setNotification] = useState('');


    // Função para buscar as mesas do servidor
    const fetchTables = async () => {
        try {
            const response = await api.get('/tables');
            setTables(response.data);
        } catch (error) {
            console.error('Erro ao buscar mesas:', error);
        }
    };

    // Chamada inicial para buscar as mesas quando o componente monta
    useEffect(() => {
        fetchTables();
    }, []);

    const handleEditClick = (table) => {
        setCurrentTable(table);
        setIsModalOpen(true);
    };

    // Atualiza a tabela localmente e refaz o fetch das tabelas para garantir que esteja sincronizado
    const handleSaveTable = (updatedTable) => {
        setTables(tables.map(table => (table.id === updatedTable.id ? updatedTable : table)));
        setIsModalOpen(false);
        fetchTables(); // Atualiza as mesas para refletir as mudanças feitas no banco de dados
    };

    const handleClearTable = async (tableId) => {
        try {
            await api.put(`/tables/${tableId}`, { status: 'available', clients: [] });
            setTables(tables.map(table =>
                table.id === tableId ? { ...table, clients: [], status: 'available' } : table
            ));
            fetchTables(); // Atualiza as mesas para refletir as mudanças feitas no banco de dados
        } catch (error) {
            console.error('Erro ao limpar a mesa:', error);
        }
    };

    const handleCloseTable = async (tableId) => {
        try {
            await api.put(`/tables/${tableId}`, { status: 'available' });
            setTables(tables.map(table =>
                table.id === tableId ? { ...table, status: 'available' } : table
            ));
            fetchTables(); // Atualiza as mesas para refletir as mudanças feitas no banco de dados
        } catch (error) {
            console.error('Erro ao fechar a conta da mesa:', error);
        }
    };

    // Função para adicionar uma nova mesa com o próximo número
    const handleAddTable = async () => {
        const maxTableNumber = tables.length > 0 
            ? Math.max(...tables.map(table => table.tableNumber)) 
            : 0;
        
        const newTableNumber = maxTableNumber + 1;

        try {
            const response = await api.post('/tables', {
                tableNumber: newTableNumber,
                status: 'available',
                clients: []
            });
            setTables([...tables, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar nova mesa:', error);
        }
    };

    // Função para excluir uma mesa
    const handleDeleteTable = async (tableId) => {
        try {
            await api.delete(`/tables/${tableId}`);
            setTables(tables.filter(table => table.id !== tableId));
        } catch (error) {
            console.error('Erro ao excluir mesa:', error);
        }
    };

    // Função para visualizar pedidos da mesa
    const handleViewOrders = (table) => {
        setCurrentTable(table); // Define a mesa atual
        setIsOrderModalOpen(true); // Abre a modal de pedidos
    };

    const handleSendToKitchen = async (tableId) => {
        try {
            await api.put(`/orders/send-to-kitchen/${tableId}`);
            setNotification('Pedidos enviados para a cozinha com sucesso!');
            setTimeout(() => setNotification(''), 3000); // Limpa a notificação após 3 segundos
        } catch (error) {
            console.error('Erro ao enviar pedidos para a cozinha:', error);
            setNotification('Erro ao enviar pedidos para a cozinha.');
        }
    };
    

    return (
        <div className="create-table-page">
            <h1>Mesas Criadas</h1>
            {notification && <div className="notification">{notification}</div>}
            <div className="tables">
                {tables.map((table) => (
                   <TableCard
                   key={table.id}
                   table={table}
                   isActive={activeTableId === table.id}
                   onClick={() => setActiveTableId(activeTableId === table.id ? null : table.id)}
                   onEdit={() => handleEditClick(table)}
                   onClear={() => handleClearTable(table.id)}
                   onClose={() => handleCloseTable(table.id)}
                   onDelete={() => handleDeleteTable(table.id)}
                   onViewOrders={() => handleViewOrders(table)}
                   onSendToKitchen={handleSendToKitchen} // Passa a função para enviar pedidos para cozinha
               />
               
                ))}
            </div>

            {/* Botão para adicionar uma nova mesa */}
            <button className="add-table-button" onClick={handleAddTable}>+</button>

            {isModalOpen && (
                <Modal table={currentTable} onClose={() => setIsModalOpen(false)} onSave={handleSaveTable} />
            )}
            {isOrderModalOpen && (
                <OrderModal table={currentTable} onClose={() => setIsOrderModalOpen(false)} />
            )}
        </div>
    );
};

const TableCard = ({ table, isActive, onClick, onEdit, onClear, onClose, onDelete, onViewOrders, onSendToKitchen }) => {
    return (
        <div className={`table-card ${isActive ? 'active' : ''}`} onClick={onClick}>
            <div className="table-header">
                <h2>
                    Mesa {table.tableNumber}
                    <FaClipboardList
                        className="order-icon"
                        onClick={(e) => {
                            e.stopPropagation(); // Previne o clique de expandir/contrair a mesa
                            onViewOrders(); // Abre a modal de pedidos
                        }}
                    />
                </h2>
                <span className={`status ${table.status}`}></span>
                <span className={`arrow ${isActive ? 'right' : 'down'}`}>&#9660;</span>
            </div>
            {isActive && (
                <div className="table-details">
                    <p>Número de Pessoas: {table.clients.length}</p>
                    <ul>
                        {table.clients.map((client, i) => (
                            <li key={i}>{client.name}</li>
                        ))}
                    </ul>
                    <div className="table-actions">
                        <button onClick={onEdit}>Editar</button>
                        <button onClick={onClear}>Limpar Mesa</button>
                        {table.clients.length > 0 && (
                            <button onClick={onClose}>Fechar Conta</button>
                        )}
                        <button onClick={onDelete}>Excluir Mesa</button>
                        <button onClick={() => onSendToKitchen(table.id)}>Enviar para Cozinha</button> {/* Novo botão */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTablePage;
