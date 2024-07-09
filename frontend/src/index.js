import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LateralBar from './components/LateralBar';
import Container from './components/Container';
import HomePage from './pages/HomePage';
import CreateTablePage from './pages/CreateTablePage';
import ManageOrdersPage from './pages/ManageOrdersPage';
import './index.css';

// Define a estrutura principal do aplicativo
const App = () => {
    return (
        <div className="app">
            <LateralBar />
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-table" element={<CreateTablePage />} />
                    <Route path="/manage-orders" element={<ManageOrdersPage />} />
                </Routes>
            </Container>
        </div>
    );
};

// Renderize o aplicativo no elemento com ID root
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
