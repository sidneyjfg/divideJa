import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './KitchenPage.css'; // Estilização para a página

const KitchenPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/kitchen/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Erro ao buscar pedidos da cozinha:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="kitchen-page">
            <h1>Pedidos para Cozinha</h1>
            {orders.length > 0 ? (
                <div className="orders-container">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <h3>Mesa {order.tableNumber} - Cliente: {order.clientName}</h3>
                            <p>Pedido: {order.descricao}</p>
                            <p>Quantidade: {order.quantidade}</p>
                            <p>Preço: R${order.preco.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum pedido enviado para a cozinha.</p>
            )}
        </div>
    );
};

export default KitchenPage;
