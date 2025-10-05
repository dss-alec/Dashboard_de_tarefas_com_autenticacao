import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Remover() {
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleRemove = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return setMensagem("Você precisa estar logado.");

    try {
      const res = await fetch(`http://localhost:8081/tarefas/excluir/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (res.ok) {
        setMensagem(data.mensagem || "Tarefa removida com sucesso!");
        setId(""); 
      } else {
        setMensagem(data.erro || data.detalhes || "Erro ao remover");
      }
    } catch (err) {
      setMensagem("Erro no servidor");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Remover Tarefa</h2>

      {mensagem && (
        <div className="alert alert-info mt-3">{mensagem}</div>
      )}

      <form onSubmit={handleRemove} className="mt-3">
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID da Tarefa</label>
          <input
            id="id"
            type="number"
            className="form-control"
            placeholder="Digite o ID da tarefa que deseja remover"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-danger">Remover</button>
          <button className="btn btn-secondary" onClick={() => navigate("/inicial")}>Voltar ao Menu</button>
        </div>
      </form>
    </div>
  );
}

export default Remover;
