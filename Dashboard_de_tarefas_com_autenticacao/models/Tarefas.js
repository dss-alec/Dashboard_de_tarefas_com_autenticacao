const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Usuario = require("./Usuarios");

const Tarefa = sequelize.define("tarefas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pendente", "concluida"),
    allowNull: false,
    defaultValue: "pendente"
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "tarefas",
  timestamps: true
});


Usuario.hasMany(Tarefa, { foreignKey: "usuarioId" });
Tarefa.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = Tarefa;