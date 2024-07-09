import React, { useState } from 'react';
import './CreateTablePage.css';

const CreateTablePage = () => {
    const [tables, setTables] = useState([
        { tableNumber: '1', numberOfPeople: '0', clients: [], status: 'available' },
        { tableNumber: '2', numberOfPeople: '3', clients: ['Pedro', 'Paula', 'Fernanda'], status: 'unavailable' }
    ]);
    const [activeTable, setActiveTable] = useState(null);

    const addTable = (newTable) => {
        setTables([...tables, newTable]);
    };

    const handleTableClick = (index) => {
        setActiveTable(activeTable === index ? null : index);
    };

    return (
        <div className="create-table-page">
            <h1>Mesas Criadas</h1>
            <div className="tables">
                {tables.map((table, index) => (
                    <TableCard
                        key={index}
                        table={table}
                        isActive={activeTable === index}
                        onClick={() => handleTableClick(index)}
                    />
                ))}
            </div>
            <CreateTableForm addTable={addTable} />
        </div>
    );
};

const TableCard = ({ table, isActive, onClick }) => {
    return (
        <div className={`table-card ${isActive ? 'active' : ''}`} onClick={onClick}>
            <div className="table-header">
                <h2>Mesa {table.tableNumber}</h2>
                <span className={`status ${table.status}`}></span>
                <span className={`arrow ${isActive ? 'down' : 'right'}`}>&#9660;</span>
            </div>
            {isActive && (
                <div className="table-details">
                    <p>Número de Pessoas: {table.numberOfPeople}</p>
                    <ul>
                        {table.clients.map((client, i) => (
                            <li key={i}>{client}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const CreateTableForm = ({ addTable }) => {
    const [tableNumber, setTableNumber] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTable = {
            tableNumber,
            numberOfPeople,
            clients: clientNames.filter(name => name !== ''),
            status
        };
        addTable(newTable);
        setTableNumber('');
        setNumberOfPeople('');
        setClientNames(['']);
        setStatus('available');
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
                <label>Número de Pessoas:</label>
                <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Nomes dos Clientes:</label>
                {clientNames.map((name, index) => (
                    <input
                        key={index}
                        type="text"
                        value={name}
                        onChange={(e) => handleClientNameChange(index, e.target.value)}
                        placeholder={`Cliente ${index + 1}`}
                    />
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
        </form>
    );
};

export default CreateTablePage;
