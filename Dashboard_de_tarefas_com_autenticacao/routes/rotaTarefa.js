const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Tarefa = require("../models/Tarefas");
const SECRET = process.env.SECRET || "minha_chave_secreta";

// Middleware para validar token
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido", detalhes: err.message });
  }
}

// Criar tarefa
router.post("/criar", autenticarToken, async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;

    const tarefa = await Tarefa.create({
      titulo,
      descricao,
      status,
      usuarioId: req.usuario.id, // pega ID do usuário logado
    });

    res.status(201).json({ mensagem: "Tarefa criada com sucesso!", tarefa });
  } catch (err) {
    console.error("Erro ao criar tarefa:", err.message);
    res.status(500).json({ erro: "Erro ao criar tarefa", detalhes: err.message });
  }
});

// Listar tarefas do usuário logado
router.get("/listar", autenticarToken, async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({ where: { usuarioId: req.usuario.id } });
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar tarefas", detalhes: err.message });
  }
});

// Buscar uma tarefa pelo ID
router.get("/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findOne({ where: { id, usuarioId: req.usuario.id } });

    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });

    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar tarefa", detalhes: err.message });
  }
});

// Editar uma tarefa pelo ID
router.put("/editar/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    const tarefa = await Tarefa.findOne({ where: { id, usuarioId: req.usuario.id } });
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    if (titulo !== undefined) tarefa.titulo = titulo;
    if (descricao !== undefined) tarefa.descricao = descricao;
    if (status !== undefined) tarefa.status = status;

    await tarefa.save();
    res.json({ mensagem: "Tarefa atualizada com sucesso!", tarefa });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao editar tarefa", detalhes: err.message });
  }
});


// Excluir uma tarefa
router.delete("/excluir/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findOne({ where: { id, usuarioId: req.usuario.id } });
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    await tarefa.destroy();
    res.json({ mensagem: "Tarefa removida com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover tarefa", detalhes: err.message });
  }
});

module.exports = router;