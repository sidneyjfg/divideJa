import React, { useState, useEffect } from 'react';
import './CreateTablePage.css';
import Modal from '../components/Modal';
import api from '../api/axios';

const CreateTablePage = () => {
    const [tables, setTables] = useState([]);
    const [activeTableId, setActiveTableId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);

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

    return (
        <div className="create-table-page">
            <h1>Mesas Criadas</h1>
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
                    />
                ))}
            </div>

            {isModalOpen && (
                <Modal table={currentTable} onClose={() => setIsModalOpen(false)} onSave={handleSaveTable} />
            )}
        </div>
    );
};

const TableCard = ({ table, isActive, onClick, onEdit, onClear, onClose }) => {
    return (
        <div className={`table-card ${isActive ? 'active' : ''}`} onClick={onClick}>
            <div className="table-header">
                <h2>Mesa {table.tableNumber}</h2>
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
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default CreateTablePage;
