import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ table, onClose, onSave }) => {
    const [tableNumber, setTableNumber] = useState(table.tableNumber);
    const [numberOfPeople, setNumberOfPeople] = useState(table.numberOfPeople);
    const [clientNames, setClientNames] = useState(table.clients);
    const [status, setStatus] = useState(table.status);

    const handleClientNameChange = (index, value) => {
        const newClientNames = [...clientNames];
        newClientNames[index] = value;
        setClientNames(newClientNames);
    };

    const handleRemoveClient = (index) => {
        setClientNames(clientNames.filter((_, i) => i !== index));
    };

    const handleAddClient = () => {
        setClientNames([...clientNames, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTable = {
            tableNumber,
            numberOfPeople,
            clients: clientNames.filter(name => name !== ''),
            status
        };
        onSave(updatedTable);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar Mesa {table.tableNumber}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
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
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
