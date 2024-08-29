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
divideJa/
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
│   │   │   └── Container.css
│   │   │   └── Container.js
│   │   │   └── LateralBar.css
│   │   │   └── LateralBar.js
│   │   │   └── Modal.css
│   │   │   └── Modal.js
│   │   │   └── Settings.css
│   │   │   └── Settings.js
│   │   ├── pages/
│   │   │   └── CreateTablePage.css
│   │   │   └── CreateTablePage.js
│   │   │   └── FriendsPage.css
│   │   │   └── FriendsPage.js
│   │   │   └── HomePage.css
│   │   │   └── HomePage.js
│   │   │   └── ManageOrdersPage.css
│   │   │   └── ManageOrdersPage.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── README.md
└── package.json

```
# Histórias de Usuários

## 1. Garçom Gerenciando Mesas
- [ ] Como um Garçom, quero visualizar a lista de mesas no restaurante com seus respectivos números e status (disponível, ocupada, etc.).
- [ ] Como um Garçom, quero clicar em uma mesa para ver os detalhes dos clientes presentes e seus pedidos.
- [ ] Como um Garçom, quero adicionar novos clientes a uma mesa.
- [ ] Como um Garçom, quero adicionar pedidos para cada cliente individualmente em uma mesa.
- [ ] Como um Garçom, quero editar ou remover pedidos de clientes, caso necessário.
- [ ] Como um Garçom, quero limpar uma mesa (remover todos os clientes e pedidos) após o pagamento ser concluído.

## 2. Cozinheiro Recebendo Pedidos
- [ ] Como um Cozinheiro, quero receber uma lista de pedidos pendentes organizados por mesa.
- [ ] Como um Cozinheiro, quero ver detalhes dos pedidos, incluindo o nome do cliente e o que foi pedido.
- [ ] Como um Cozinheiro, quero marcar um pedido como "em preparo" ou "pronto".
- [ ] Como um Cozinheiro, quero filtrar pedidos por status (pendente, em preparo, pronto).

## 3. Caixa Processando Pagamentos
- [ ] Como um Caixa, quero selecionar uma mesa para ver a lista de clientes e seus pedidos.
- [ ] Como um Caixa, quero calcular o total a ser pago por cada cliente individualmente.
- [ ] Como um Caixa, quero dividir a conta entre os clientes com base no que cada um consumiu.
- [ ] Como um Caixa, quero processar o pagamento para clientes individuais ou para toda a mesa.
- [ ] Como um Caixa, quero marcar a mesa como "disponível" após o pagamento ser concluído.

## 4. Gerente Monitorando o Restaurante
- [ ] Como um Gerente, quero visualizar o status de todas as mesas e seus pedidos em tempo real.
- [ ] Como um Gerente, quero visualizar relatórios diários de vendas, incluindo total por mesa e por cliente.
- [ ] Como um Gerente, quero adicionar ou remover mesas do sistema.
- [ ] Como um Gerente, quero criar novos usuários (cozinheiro, caixa, garçom) e definir suas permissões.
- [ ] Como um Gerente, quero editar informações de mesas e usuários.

## 5. Cliente Fazendo Pedido
- [ ] Como um Cliente, quero consultar o cardápio através de um dispositivo (tablet ou celular fornecido pelo restaurante).
- [ ] Como um Cliente, quero fazer pedidos diretamente de um dispositivo na mesa.
- [ ] Como um Cliente, quero ver uma lista dos meus pedidos pendentes.
- [ ] Como um Cliente, quero solicitar a conta e escolher se quero pagar individualmente ou dividir a conta com outros clientes na mesa.



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