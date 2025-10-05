require("dotenv").config();
const express = require("express");
const server = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const SECRET = process.env.SECRET || "minha_chave_secreta";

server.use(cors());
server.use(express.json());

/* importacao dos banco de dados */
const sequelize = require("./models/db");
const Usuario = require("./models/Usuarios");
const Tarefa = require("./models/Tarefas");

/* importar rotas */
const tarefasRoutes = require("./routes/rotaTarefa");

// Sincronizar models -> altera sem apagar dados
sequelize.sync({ alter: true })
  .then(() => console.log("Tabelas sincronizadas com sucesso!"))
  .catch((err) => console.error("Erro ao sincronizar tabelas: " + err));

server.use("/tarefas", tarefasRoutes);

/* rota de registro */
server.post("/registrar", async(req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: "Preencha todos os campos" });

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ error: "Email já está cadastrado" });

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      createdAt: novoUsuario.createdAt
    });

  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuario", detalhes: err.message });
  }
});

/* rota de login */
server.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: "Informe email e senha" });

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login", detalhes: err.message });
  }
});

/* porta padrao */
server.listen(8081, function(){
  console.log("Servidor está funcionando...");
});
