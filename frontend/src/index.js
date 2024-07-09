import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LateralBar from './components/LateralBar';
import Container from './components/Container';

const App = () => {
    return (
        <div className="app">
            <LateralBar />
            <Container>
                {/* Aqui você pode adicionar o conteúdo central da página */}
                <h1>Bem-vindo ao Divide Já</h1>
                <p>Este é o conteúdo central da aplicação.</p>
            </Container>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
