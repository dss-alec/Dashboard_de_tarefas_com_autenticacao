require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "cadastro",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "12345",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log 
  }
);

sequelize.authenticate()
  .then(() => console.log("Banco de dados conectado com sucesso"))
  .catch((erro) => console.log("Erro ao se conectar ao Banco de dados " + erro));

module.exports = sequelize;
