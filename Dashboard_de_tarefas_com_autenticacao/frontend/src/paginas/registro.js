import { useState } from "react";

function Registro() {
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const resposta = await fetch("http://localhost:8081/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
        });
        
        const data = await resposta.json();

        if (resposta.ok) {
            setMensagem("Usuário cadastrado com sucesso!");
            setNome("");
            setEmail("");
            setSenha("");
        } else {
            setMensagem(data.error || "Erro ao registrar usuário");
        }
        } catch (err) {
            setMensagem("Erro de conexão com o servidor");
            console.error(err);
        }
  };
    return (
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input 
                type="text"
                id="nome"
                className="form-control"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                type="email"
                id="email"
                className="form-control"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                Nunca compartilharemos seu email com mais ninguém.
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input 
                type="password"
                id="senha"
                className="form-control"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary w-100">Registrar</button>
            {mensagem && (
                <div className="alert alert-info text-center mt-3" role="alert">
                {mensagem}
                </div>
            )}
        </form>
    );
}

export default Registro;