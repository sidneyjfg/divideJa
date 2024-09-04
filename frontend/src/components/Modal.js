import React, { useState, useEffect } from 'react';
import './Modal.css';
import api from '../api/axios';

const Modal = ({ table, onClose, onSave }) => {
    const [tableNumber, setTableNumber] = useState(table.tableNumber);
    const [clients, setClients] = useState(table.clients); // Armazena objetos de clientes completos
    const [numberOfPeople, setNumberOfPeople] = useState(clients.length);
    const [currentClientIndex, setCurrentClientIndex] = useState(null);
    const [newOrder, setNewOrder] = useState({ descricao: '', quantidade: 1, preco: 0 });
    const [orders] = useState({});
    const [notification, setNotification] = useState('');
    const [clientsToRemove] = useState([]); // Lista de IDs de clientes a serem removidos

    useEffect(() => {
        setNumberOfPeople(clients.length);
    }, [clients]);

    const handleClientNameChange = (index, value) => {
        const updatedClients = [...clients];
        updatedClients[index].name = value;
        setClients(updatedClients);
    };

    const handleRemoveClient = async (index) => {
        const clientToRemove = clients[index];
        console.log("Cliente a ser removido: ", clientToRemove);
        try {
            // Obter o ID do cliente com base no nome
            const clientResponse = await api.get(`/clients/name/${clientToRemove.name}`);
            console.log("Resposta recebida pelo backEnd Remove: ", clientResponse.data);
            if (clientResponse.data && clientResponse.data.length > 0) {
                const clientId = clientResponse.data[0].id;
                console.log("Id do cliente encontrado: ", clientId);
                // Fazer uma chamada de API para remover o cliente do banco de dados
                await api.delete(`/clients/${clientId}`);
                setNotification(`Cliente ${clientToRemove.name} removido com sucesso.`);
            } else {
                setNotification(`Cliente ${clientToRemove.name} não encontrado no banco de dados.`);
            }

            // Remover o cliente da lista localmente
            setClients(clients.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Erro ao remover cliente:', error);
            setNotification('Erro ao remover cliente!');
        }

        setTimeout(() => setNotification(''), 3000);
    };

    const handleAddClient = () => {
        setClients([...clients, { name: '', phone: '', email: '' }]);
    };

    const handleAddOrderClick = async (index) => {
        const clientOrder = clients[index];
        console.log("clientOrder -> ", clientOrder.name);
    
        try {
            // Verificar se o cliente existe no banco de dados
            const clientResponse = await api.get(`/clients/name/${clientOrder.name}`);
            console.log("clienteResponse: ", clientResponse);
            
            if (clientResponse.data && clientResponse.data.length > 0) {
                // Cliente existe, então usamos o ID dele
                const clientId = clientResponse.data[0].id;
                setCurrentClientIndex(index); // Define o cliente atual pelo índice
                console.log("ID do cliente encontrado e definido:", clientId);
            } else {
                // Adicionar cliente se não existir
                const newClientResponse = await api.post('/clients', {
                    name: clientOrder.name,
                    phone: clientOrder.phone || null,
                    email: clientOrder.email || null,
                    tableNumber: tableNumber
                });
                const newClientId = newClientResponse.data.id;
                setCurrentClientIndex(index); // Define o novo cliente pelo índice
                console.log("Cliente adicionado e ID definido:", newClientId);
            }
        } catch (error) {
            console.error('Erro ao buscar ou adicionar cliente:', error);
            setNotification('Erro ao buscar ou adicionar cliente!');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    const handleOrderChange = (field, value) => {
        setNewOrder({ ...newOrder, [field]: value });
    };

    const handleAddOrder = async () => {
        if (currentClientIndex !== null) {
            try {
                const client = clients[currentClientIndex];
                const clientResponse = await api.get(`/clients/name/${client.name}`);
                if (clientResponse.data && clientResponse.data.length > 0) {
                    const clientId = clientResponse.data[0].id;
    
                    await api.post('/orders', {
                        descricao: newOrder.descricao,
                        quantidade: newOrder.quantidade,
                        preco: newOrder.preco,
                        clientId: clientId,
                        tableId: table.id // Certifique-se de que `table.id` é passado corretamente
                    });
                    setNotification('Pedido adicionado com sucesso!');
                    console.log('Pedido adicionado ao banco de dados');
                } else {
                    setNotification('Erro: Cliente não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao adicionar pedido:', error);
                setNotification('Erro ao adicionar pedido!');
            }
        } else {
            console.warn('Nenhum cliente selecionado para adicionar pedido');
        }
        setNewOrder({ descricao: '', quantidade: 1, preco: 0 }); // Reseta o formulário do pedido
        setTimeout(() => setNotification(''), 3000); // Limpa a notificação após 3 segundos
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedTable = {
                tableNumber,
                numberOfPeople: clients.length,
                clients,
                orders,
                status: clients.length > 0 ? 'unavailable' : 'available'
            };

            // Executa as exclusões de clientes, se houver
            for (const clientId of clientsToRemove) {
                await api.delete(`/clients/${clientId}`);
            }

            // Salvar/Atualizar clientes e pedidos
            for (const client of clients) {
                let clientId;
                const clientResponse = await api.get(`/clients/name/${client.name}`);
                if (clientResponse.data && clientResponse.data.length > 0) {
                    clientId = clientResponse.data[0].id;
                } else {
                    const newClientResponse = await api.post('/clients', {
                        name: client.name,
                        phone: client.phone || null,
                        email: client.email || null,
                        tableNumber
                    });
                    clientId = newClientResponse.data.id;
                }

                const clientOrders = orders[client.name] || [];
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
                        {clients.map((client, index) => (
                            <div key={index} className="client-name">
                                <input
                                    type="text"
                                    value={client.name}
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
                            <h3>Adicionar Pedido para {clients[currentClientIndex]?.name || 'Cliente'}</h3>
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
                    <div className="modal-buttons">
                        <button type="submit">Salvar Alterações</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
