import React, { useState } from 'react';
import './CreateTablePage.css';
import Modal from '../components/Modal';

const CreateTablePage = () => {
    const [tables, setTables] = useState([
        { tableNumber: '1', clients: ['João', 'Maria', 'Carlos', 'Ana'], status: 'available' },
        { tableNumber: '2', clients: ['Pedro', 'Paula', 'Fernanda'], status: 'unavailable' }
    ]);
    const [activeTableIndex, setActiveTableIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);

    const addTable = (newTable) => {
        setTables([...tables, newTable]);
    };

    const handleTableClick = (index) => {
        setActiveTableIndex(activeTableIndex === index ? null : index);
    };

    const handleEditClick = (table) => {
        setCurrentTable(table);
        setIsModalOpen(true);
    };

    const handleSaveTable = (updatedTable) => {
        setTables(tables.map(table => (table.tableNumber === updatedTable.tableNumber ? updatedTable : table)));
        setIsModalOpen(false);
    };

    return (
        <div className="create-table-page">
            <h1>Mesas Criadas</h1>
            <div className="tables">
                {tables.map((table, index) => (
                    <TableCard
                        key={index}
                        table={table}
                        isActive={activeTableIndex === index}
                        onClick={() => handleTableClick(index)}
                        onEdit={() => handleEditClick(table)}
                    />
                ))}
            </div>
            <CreateTableForm addTable={addTable} />
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
                            <li key={i}>{client}</li>
                        ))}
                    </ul>
                    <button onClick={onEdit}>Editar</button>
                </div>
            )}
        </div>
    );
};

const CreateTableForm = ({ addTable }) => {
    const [tableNumber, setTableNumber] = useState('');
    const [clientNames, setClientNames] = useState(['']);
    const [status, setStatus] = useState('available');

    const handleAddClient = () => {
        setClientNames([...clientNames, '']);
    };

    const handleClientNameChange = (index, value) => {
        const newClientNames = [...clientNames];
        newClientNames[index] = value;
        setClientNames(newClientNames);
    };

    const handleRemoveClient = (index) => {
        setClientNames(clientNames.filter((_, i) => i !== index));
    };

    const handleClearForm = () => {
        setTableNumber('');
        setClientNames(['']);
        setStatus('available');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTable = {
            tableNumber,
            clients: clientNames.filter(name => name !== ''),
            status
        };
        addTable(newTable);
        handleClearForm();
    };

    return (
        <form onSubmit={handleSubmit} className="create-table-form">
            <h2>Criar Nova Mesa</h2>
            <div className="form-group">
                <label>Número da Mesa:</label>
                <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Nomes dos Clientes:</label>
                {clientNames.map((name, index) => (
                    <div key={index} className="client-name">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handleClientNameChange(index, e.target.value)}
                            placeholder={`Cliente ${index + 1}`}
                        />
                        <button type="button" onClick={() => handleRemoveClient(index)}>Remover</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddClient}>Adicionar Cliente</button>
            </div>
            <div className="form-group">
                <label>Status da Mesa:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="available">Disponível</option>
                    <option value="unavailable">Indisponível</option>
                </select>
            </div>
            <button type="submit">Criar Mesa</button>
            <button type="button" onClick={handleClearForm} className="clear-form">Limpar</button>
        </form>
    );
};

export default CreateTablePage;