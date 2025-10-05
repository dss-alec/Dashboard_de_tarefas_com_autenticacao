import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Editar() {
  const [id, setId] = useState("");
  const [tarefa, setTarefa] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Buscar tarefa pelo ID
  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!token) return setMensagem("Você precisa estar logado.");

    try {
      const res = await fetch(`http://localhost:8081/tarefas/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setTarefa(data);
        setMensagem("");
      } else {
        setMensagem(data.erro || "Tarefa não encontrada");
      }
    } catch (err) {
      console.error("Erro ao buscar tarefa:", err);
      setMensagem("Erro ao buscar tarefa");
    }
  };

  // Editar tarefa
  const handleEditar = async (e) => {
    e.preventDefault();
    if (!tarefa) return;

    // Validação do status antes de enviar
    const valoresValidos = ["pendente", "concluida"];
    if (!valoresValidos.includes(tarefa.status)) {
      return setMensagem("Status inválido");
    }

    try {
      const res = await fetch(`http://localhost:8081/tarefas/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          status: tarefa.status,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Tarefa atualizada com sucesso!");
      } else {
        console.error("Erro no update:", data);
        setMensagem(data.erro || data.detalhes || "Erro ao editar tarefa");
      }
    } catch (err) {
      console.error("Erro no servidor:", err);
      setMensagem("Erro no servidor");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Tarefa</h2>

      {mensagem && <div className="alert alert-info">{mensagem}</div>}

      {/* Buscar pelo ID */}
      <form onSubmit={handleBuscar} className="mb-3">
        <label>ID da Tarefa</label>
        <input
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button className="btn btn-primary mt-2">Carregar Tarefa</button>
      </form>

      {/* Formulário de edição aparece só depois que a tarefa for carregada */}
      {tarefa && (
        <form onSubmit={handleEditar}>
          <div className="mb-3">
            <label>Título</label>
            <input
              className="form-control"
              value={tarefa.titulo}
              onChange={(e) =>
                setTarefa({ ...tarefa, titulo: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Descrição</label>
            <input
              className="form-control"
              value={tarefa.descricao}
              onChange={(e) =>
                setTarefa({ ...tarefa, descricao: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Status</label>
            <select
              className="form-control"
              value={tarefa.status}
              onChange={(e) =>
                setTarefa({ ...tarefa, status: e.target.value })
              }
            >
              <option value="pendente">Pendente</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
          
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success">Salvar Alterações</button>
            <button className="btn btn-secondary" onClick={() => navigate("/inicial")}>Voltar ao Menu</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Editar;
