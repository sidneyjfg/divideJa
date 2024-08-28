import React, { useState } from 'react';
import './Settings.css'; // Importa o arquivo CSS para estilização

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null); // Estado para controlar a seção ativa

  const handleButtonClick = (section) => {
    setActiveSection(section); // Define a seção ativa com base no botão clicado
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envio dos dados alterados
    console.log('Alterações salvas.');
    setActiveSection(null); // Volta ao estado inicial após o envio
  };

  return (
    <div className="containerSettings">
      <h2>Configurações</h2>

      {/* Renderiza os botões ou o formulário com base na seção ativa */}
      {activeSection === null && (
        <div className="buttonGroup">
          <button className="button" onClick={() => handleButtonClick('username')}>Alterar Nome de Usuário</button>
          <button className="button" onClick={() => handleButtonClick('password')}>Alterar Senha</button>
          <button className="button" onClick={() => handleButtonClick('photo')}>Alterar Foto de Perfil</button>
          <button className="button" onClick={() => alert('Ajuda clicada!')}>Ajuda</button>
          <button className="button" onClick={() => alert('Termos de Privacidade clicados!')}>Termos de Privacidade</button>
        </div>
      )}

      {/* Formulário para alterar o nome de usuário */}
      {activeSection === 'username' && (
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Novo Nome de Usuário:</label>
            <input type="text" className="input" />
          </div>
          <button type="submit" className="button">Salvar Alterações</button>
        </form>
      )}

      {/* Formulário para alterar a senha */}
      {activeSection === 'password' && (
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Nova Senha:</label>
            <input type="password" className="input" />
          </div>
          <button type="submit" className="button">Salvar Alterações</button>
        </form>
      )}

      {/* Formulário para alterar a foto de perfil */}
      {activeSection === 'photo' && (
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Nova Foto de Perfil:</label>
            <input type="file" className="input" />
          </div>
          <button type="submit" className="button">Salvar Alterações</button>
        </form>
      )}
    </div>
  );
};

export default Settings;
