import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './KitchenPage.css'; // Estilização para a página

const KitchenPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/kitchen/orders');
                console.log("Resposta backEnd kitchen/orders -> ", response.data);
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('Dados inesperados recebidos:', response.data);
                    setOrders([]);
                }
            } catch (error) {
                console.error('Erro ao buscar pedidos da cozinha:', error);
            }
        };

        fetchOrders();
    }, []);

    const formatPrice = (price) => {
        // Tenta converter o preço para número
        const parsedPrice = parseFloat(price);
        console.log("formatPrice ", price, parsedPrice);
        
        // Verifica se o valor convertido é um número válido
        return !isNaN(parsedPrice) ? parsedPrice.toFixed(2) : '0.00';
    };
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
                            <p>Preço: R${formatPrice(order.preco)}</p>
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
