import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMensagem("Login realizado com sucesso!");
        navigate("/inicial");
      } else {
        setMensagem(data.error || "Erro ao tentar fazer login");
      }
    } catch (err) {
      setMensagem("Erro de conexão com o servidor");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email" className="form-control" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input type="password" id="senha" className="form-control" value={senha}
               onChange={(e) => setSenha(e.target.value)} required />
      </div>

      {mensagem && <p className="text-center text-danger">{mensagem}</p>}
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}

export default Login;
