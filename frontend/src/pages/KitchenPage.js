// src/components/OrderCard.js
import React from 'react';
import './KitchenPage.css';

const KitchenPage = ({ orderNumber, orderId, item, extra, customer, time }) => {
  return (
    <div className="card">
      <div className="header">
        <span className="badge order-number">{orderNumber}</span>
        <span className="badge order-id">Pedido{orderId}</span>
      </div>
      <div className="content">
        <p className="order-item">{item} <br /> <span className="order-extra">{extra}</span></p>
        <p className="order-info">
          <span className="customer">{customer}</span>
          <span className="time">{time}</span>
        </p>
        <div className="actions">
          <button className="btn ready">PRONTO</button>
          <button className="btn delivered">ANDAMENTO</button>
        </div>
      </div>
    </div>
  );
};

export default KitchenPage;
