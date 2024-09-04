import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import api from '../api/axios';

const OrderModal = ({ table, onClose }) => {
    const [orders, setOrders] = useState({});
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get(`/orders/table/${table.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
                setNotification('Erro ao buscar pedidos!');
            }
        };

        fetchOrders();
    }, [table.id]);

    const handleOrderChange = (clientName, orderIndex, field, value) => {
        const updatedOrders = { ...orders };
        updatedOrders[clientName][orderIndex][field] = value;
        setOrders(updatedOrders);
    };

    const handleDeleteOrder = async (clientName, orderId) => {
        try {
            await api.delete(`/orders/${orderId}`);
            const updatedOrders = { ...orders };
            updatedOrders[clientName] = updatedOrders[clientName].filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            setNotification('Item do pedido deletado com sucesso!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Erro ao deletar Item do pedido:', error);
            setNotification('Erro ao deletar Item do pedido!');
        }
    };

    const handleSaveOrder = async () => {
        try {
            for (const clientName in orders) {
                const clientOrders = orders[clientName];
                for (const order of clientOrders) {
                    await api.put(`/orders/${order.id}`, order);
                }
            }
            setNotification('Pedidos salvos com sucesso!');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Erro ao salvar pedidos:', error);
            setNotification('Erro ao salvar pedidos!');
        }
    };

    return (
        <div className="order-modal-overlay">
            <div className="order-modal">
                <h2>Pedidos da Mesa {table.tableNumber}</h2>
                {notification && <div className="notification">{notification}</div>}
                <div className="orders-container">
                    {Object.entries(orders).map(([clientName, clientOrders]) => (
                        <div key={clientName} className="client-orders-column">
                            <h3>Pedidos de {clientName}</h3>
                            {clientOrders.length > 0 ? (
                                clientOrders.map((order, index) => (
                                    <div key={index} className="order-item">
                                        <input
                                            type="text"
                                            value={order.descricao}
                                            onChange={(e) => handleOrderChange(clientName, index, 'descricao', e.target.value)}
                                            placeholder="Descrição"
                                        />
                                        <input
                                            type="number"
                                            value={order.quantidade}
                                            onChange={(e) => handleOrderChange(clientName, index, 'quantidade', e.target.value)}
                                            min="1"
                                            placeholder="Quantidade"
                                        />
                                        <input
                                            type="number"
                                            value={order.preco}
                                            onChange={(e) => handleOrderChange(clientName, index, 'preco', e.target.value)}
                                            min="0"
                                            step="0.01"
                                            placeholder="Preço"
                                        />
                                        <button onClick={() => handleDeleteOrder(clientName, order.id)}>Deletar</button>
                                    </div>
                                ))
                            ) : (
                                <p>Ainda não foi adicionado um pedido a este cliente.</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="order-modal-actions">
                    <button onClick={handleSaveOrder}>Salvar Alterações</button>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
