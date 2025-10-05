import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Criar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMensagem("Você precisa estar logado para criar tarefas.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8081/tarefas/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao, status }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensagem(data.mensagem);
        setTitulo(""); setDescricao(""); setStatus("pendente");
      } else {
        setMensagem(data.erro || data.detalhes || "Erro ao criar tarefa");
      }
    } catch (err) {
      setMensagem("Erro no servidor");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Tarefa</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success">Criar</button>
          <button className="btn btn-secondary" onClick={() => navigate("/inicial")}>Voltar ao Menu</button>
        </div>

      </form>
    </div>
  );
}

export default Criar;
