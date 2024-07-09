# DivideJá
## Descrição do Projeto
DivideJá é uma plataforma que facilita a divisão de contas entre amigos, de acordo com o que foi consumido por cada pessoa. O objetivo é simplificar a tarefa de dividir despesas de maneira justa e transparente, evitando confusões e desentendimentos.


# Tecnologias Utilizadas
- Frontend: React, Axios
- Backend: Node.js, Express, Mysql
- Banco de Dados: Mysql 

### Funcionalidades Principais (empresa)
- Cadastro e Autenticação de Funcionários
 
- Registro e login de Funcionários
- Criação de Mesas
 
- Funcionários podem escolher como as contas serão divididas (igualmente ou por pessoa)
- Adição de participantes a mesa
- Adição de taxa de serviço
 
- Inserção de despesas com descrição, valor e quem consumiu
- Suporte para diferentes categorias de despesas
- Divisão de Contas

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

Como trabalhar com as branchs 

### Ir para a main
``` bash
git checkout main
```
### Puxar as últimas atualizações da main
``` bash
git pull origin main
```
### Mudar para a branch que deseja trabalhar
``` bash
git checkout updatesSidney
```
### Fazer as alterações e adicionar os arquivos modificados
``` bash
git add .
```
### Fazer um commit das alterações
``` bash
git commit -m "Alterações e features atualizadas"
```
### Fazer push das alterações para o repositório remoto
``` bash
git push origin updatesSidney
```
### Ir para a PreMerge
``` bash
git checkout PreMerge
```
### Puxar as últimas atualizações da PreMerge
``` bash
git pull origin PreMerge
```
### Mesclar a branch de trabalho na PreMerge
``` bash
git merge updatesSidney
```
### Resolver conflitos, se houver...

### Fazer push das mudanças mescladas para o repositório remoto
``` bash
git push origin PreMerge
```

_Em seguida o proprietário irá atuar nas PR organizando-as conforme necessário._