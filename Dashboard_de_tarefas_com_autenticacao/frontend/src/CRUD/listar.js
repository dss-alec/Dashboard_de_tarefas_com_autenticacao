import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Listar() {
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado para ver suas tarefas.");
      setTarefas([]); 
      return;
    }

    const fetchTarefas = async () => {
      try {
        const res = await fetch("http://localhost:8081/tarefas/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setTarefas(data); 
          setErro(""); 
        } else {
          setErro(data.erro || data.detalhes || "Erro inesperado");
          setTarefas([]);
        }
      } catch (err) {
        setErro("Erro ao buscar tarefas");
        setTarefas([]);
      }
    };

    fetchTarefas();
  }, []); 

  return (
    <div className="container mt-4">
      <h2>Lista de Tarefas</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.length === 0 ? (
            <tr>
              <td colSpan="4">Nenhuma tarefa encontrada</td>
            </tr>
          ) : (
            tarefas.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.titulo}</td>
                <td>{t.descricao}</td>
                <td>{t.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-secondary" onClick={() => navigate("/inicial")}>Voltar ao Menu</button>
      </div>
    </div>
  );
}

export default Listar;
