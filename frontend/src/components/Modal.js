import React, { useState, useEffect } from 'react';
import './Modal.css';
import api from '../api/axios';

const Modal = ({ table, onClose, onSave }) => {
    const [tableNumber, setTableNumber] = useState(table.tableNumber);
    const [clientNames, setClientNames] = useState(table.clients.map(client => client.name));
    const [numberOfPeople, setNumberOfPeople] = useState(clientNames.length);
    const [currentClientIndex, setCurrentClientIndex] = useState(null);
    const [newOrder, setNewOrder] = useState({ descricao: '', quantidade: 1, preco: 0 });
    const [orders, setOrders] = useState({});
    const [notification, setNotification] = useState('');

    useEffect(() => {
        setNumberOfPeople(clientNames.length);
    }, [clientNames]);

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

    const handleAddOrderClick = (index) => {
        setCurrentClientIndex(index);
    };

    const handleOrderChange = (field, value) => {
        setNewOrder({ ...newOrder, [field]: value });
    };

    const handleAddOrder = () => {
        if (currentClientIndex !== null) {
            const clientName = clientNames[currentClientIndex];
            const updatedOrders = { ...orders };
            
            if (!updatedOrders[clientName]) {
                updatedOrders[clientName] = [];
            }
            updatedOrders[clientName].push({ ...newOrder });

            setOrders(updatedOrders);
            setNewOrder({ descricao: '', quantidade: 1, preco: 0 });
            setNotification(`Pedido adicionado para ${clientName}`);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedTable = {
                tableNumber,
                numberOfPeople: clientNames.length,
                clients: clientNames.map(name => ({ name })),
                orders,
                status: clientNames.length > 0 ? 'unavailable' : 'available'
            };

            // Salvar/Atualizar clientes e pedidos
            for (const clientName of clientNames) {
                let clientId;
                const clientResponse = await api.get(`/clients/name/${clientName}`);
                if (clientResponse.data && clientResponse.data.length > 0) {
                    clientId = clientResponse.data[0].id;
                } else {
                    const newClientResponse = await api.post('/clients', {
                        name: clientName,
                        phone: '', // Enviar como null se necessário
                        email: '',
                        tableNumber
                    });
                    clientId = newClientResponse.data.id;
                }

                const clientOrders = orders[clientName] || [];
                for (const order of clientOrders) {
                    await api.post('/orders', {
                        ...order,
                        clientId,
                        tableNumber
                    });
                }
            }

            await api.put(`/tables/${table.id}`, { status: updatedTable.status });

            // Atualiza o estado no CreateTablePage
            onSave(updatedTable);
            setNotification('Alterações salvas com sucesso!');
            setTimeout(() => setNotification(''), 3000);

        } catch (error) {
            console.error('Erro ao salvar clientes ou pedidos:', error);
            setNotification('Erro ao salvar alterações!');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar Mesa {tableNumber}</h2>
                {notification && <div className="notification">{notification}</div>}
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
                        <label>Número de Pessoas: {numberOfPeople}</label>
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
                                <button type="button" onClick={() => handleAddOrderClick(index)}>Adicionar Pedido</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddClient}>Adicionar Cliente</button>
                    </div>
                    {currentClientIndex !== null && (
                        <div className="order-form">
                            <h3>Adicionar Pedido para {clientNames[currentClientIndex]}</h3>
                            <div className="form-group">
                                <label>Descrição do Pedido:</label>
                                <input
                                    type="text"
                                    value={newOrder.descricao}
                                    onChange={(e) => handleOrderChange('descricao', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantidade:</label>
                                <input
                                    type="number"
                                    value={newOrder.quantidade}
                                    onChange={(e) => handleOrderChange('quantidade', e.target.value)}
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label>Preço:</label>
                                <input
                                    type="number"
                                    value={newOrder.preco}
                                    onChange={(e) => handleOrderChange('preco', e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <button type="button" onClick={handleAddOrder}>Adicionar Pedido</button>
                        </div>
                    )}
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
