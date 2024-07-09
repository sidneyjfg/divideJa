# DivideJá
## Descrição do Projeto
DivideJá é uma plataforma que facilita a divisão de contas entre amigos, de acordo com o que foi consumido por cada pessoa. O objetivo é simplificar a tarefa de dividir despesas de maneira justa e transparente, evitando confusões e desentendimentos.


# Tecnologias Utilizadas
- Frontend: React, Axios
- Backend: Node.js, Express, Mysql
- Banco de Dados: Mysql 

### Funcionalidades Principais
- Cadastro e Autenticação de Usuários
 
- Registro e login de usuários
- Autenticação via redes sociais (opcional)
- Criação de Eventos
 
- Usuários podem criar eventos onde as contas serão divididas
- Adição de participantes ao evento
- Adição de Despesas
 
- Inserção de despesas com descrição, valor e quem consumiu
- Suporte para diferentes categorias de despesas
- Divisão de Contas
- 
- Cálculo automático de quanto cada pessoa deve pagar
- Visualização detalhada de como a conta foi dividida
- Pagamento e Saldo
 
- Registro de pagamentos realizados
- Saldo atualizado de cada participante
- Histórico de Eventos

- Visualização de eventos passados
- Resumo de despesas e pagamentos realizados

## Estrutura do projeto
``` bash
my-fullstack-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── ordersController.js
│   ├── models/
│   │   └── orderModel.js
│   ├── routes/
│   │   └── orders.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── OrderItem.js
│   │   ├── pages/
│   │   │   └── Home.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── README.md
└── package.json

```
