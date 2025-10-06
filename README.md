# 🗂️ Organizador de Tarefas (CRUD Completo com Login)

Este projeto é um **sistema completo de gerenciamento de tarefas** desenvolvido em **Node.js (Express)** no backend e **React** no frontend.  
O objetivo é permitir que cada usuário se registre, faça login e gerencie suas próprias tarefas (criar, listar, editar e remover) com autenticação JWT.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- Node.js  
- Express  
- Sequelize (ORM)  
- MySQL  
- JWT (Json Web Token)  
- Dotenv  
- Cors  
- Body-parser

### **Frontend**
- React  
- React Router DOM  
- Bootstrap 5

---

## ⚙️ Funcionalidades

- ✅ Cadastro de usuário  
- 🔐 Login com autenticação JWT  
- 📝 Criação de tarefas  
- 📋 Listagem das tarefas do usuário logado  
- ✏️ Edição de título, descrição e status  
- ❌ Remoção de tarefas  
- 🔒 Proteção de rotas com token JWT  

---

## 🧩 Estrutura do Projeto

organizador-de-tarefas/
│
├── backend/
│ ├── server.js
│ ├── .env
│ ├── models/
│ │ └── Tarefas.js
│ ├── routes/
│ │ └── rotaTarefa.js
│ └── sequelize.js
│
└── frontend/
└── src/
├── App.js
├── paginas/
│ ├── registro.js
│ ├── login.js
│ └── inicial.js
└── CRUD/
├── criar.js
├── listar.js
├── editar.js
└── remover.js

---

---

## 🧰 Instalação e Execução (Passo a Passo Completo)

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/dss-alec/Dashboard_de_tarefas_com_autenticacao.git
cd Dashboard_de_tarefas_com_autenticacao

---

# === CONFIGURAÇÃO DO BACKEND ===
# Execute os comandos abaixo dentro da pasta /backend

# 1️⃣ Acesse a pasta do backend
cd backend

# 2️⃣ Instale as dependências necessárias
npm install

# 3️⃣ Crie o arquivo .env na raiz da pasta backend
#    (Se já existir, apenas verifique se os dados estão corretos)
# Adicione o seguinte conteúdo:
# --------------------------------
# SECRET=minha_chave_secreta
# PORT=8081
# DB_NAME=cadastro
# DB_USER=root
# DB_PASS=
# DB_HOST=localhost
# DB_DIALECT=mysql
# --------------------------------

# 4️⃣ Inicie o servidor backend
node server.js

# 5️⃣ Verifique se o servidor iniciou corretamente:
#    - Deve aparecer no terminal algo como:
#      "Conectado ao banco de dados" e
#      "Servidor rodando na porta 8081"

---

# === CRIAR O BANCO DE DADOS MYSQL ===

# 1️⃣ Acesse o MySQL pelo terminal:
mysql -u root -p

# 2️⃣ Após digitar sua senha, crie o banco de dados:
CREATE DATABASE cadastro;

# 3️⃣ Verifique se o banco foi criado com sucesso:
SHOW DATABASES;

# 4️⃣ (Opcional) Caso queira remover e recriar o banco:
DROP DATABASE cadastro;
CREATE DATABASE cadastro;

---

# === EXECUTAR O FRONTEND ===

# 1️⃣ Acesse a pasta do frontend:
cd frontend

# 2️⃣ Instale as dependências:
npm install

# 3️⃣ Inicie o servidor React:
npm start

# ✅ O frontend abrirá automaticamente em:
# 👉 http://localhost:3000

---

# 🧠 CONCEITOS UTILIZADOS

- Autenticação JWT e persistência no localStorage  
- Relacionamento entre usuários e tarefas via Sequelize  
- Middlewares Express para segurança e validação  
- React Hooks (`useState`, `useEffect`)  
- Comunicação frontend-backend via Fetch API  
- Interface responsiva com Bootstrap

---

# 📜 LICENÇA

Este projeto é de uso livre para **estudo e portfólio**.  
Sinta-se à vontade para melhorar, modificar e compartilhar!

---

# 👨‍💻 DESENVOLVEDOR

**Desenvolvido por:** Alec dos Santos Souza  
📧 Contato: alecdss17@gmail.com 
💼 GitHub: [github.com/dss-alec](https://github.com/dss-alec)
