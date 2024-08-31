import React, { useState, useEffect } from 'react';
import './CreateTablePage.css';
import Modal from '../components/Modal';
import api from '../api/axios';

const CreateTablePage = () => {
    const [tables, setTables] = useState([]);
    const [activeTableId, setActiveTableId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await api.get('/tables');
                setTables(response.data);
            } catch (error) {
                console.error('Erro ao buscar mesas:', error);
            }
        };

        fetchTables();
    }, []);

    const handleEditClick = (table) => {
        setCurrentTable(table);
        setIsModalOpen(true);
    };

    const handleSaveTable = (updatedTable) => {
        setTables(tables.map(table => (table.id === updatedTable.id ? updatedTable : table)));
        setIsModalOpen(false);
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
                    />
                ))}
            </div>

            {isModalOpen && (
                <Modal table={currentTable} onClose={() => setIsModalOpen(false)} onSave={handleSaveTable} />
            )}
        </div>
    );
};

const TableCard = ({ table, isActive, onClick, onEdit }) => {
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
                    <button onClick={onEdit}>Editar</button>
                </div>
            )}
        </div>
    );
};

export default CreateTablePage;
