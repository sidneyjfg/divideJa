import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LateralBar from './components/LateralBar';
import Container from './components/Container';
import CreateTablePage from './components/CreateTablePage';

const App = () => {
    return (
        <div className="app">
            <LateralBar />
            <Container>
                <CreateTablePage />
            </Container>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
