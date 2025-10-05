import { useState } from "react";

function Inicial() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Dashboard de Tarefas</h2>
        <p className="lead">Escolha uma opção:</p>
      </div>

      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Criar</h5>
              <p className="card-text">Adicione uma nova tarefa.</p>
              <a href="/criar" className="btn btn-success">Criar</a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Listar</h5>
              <p className="card-text">Veja todas as suas tarefas.</p>
              <a href="/listar" className="btn btn-primary">Listar</a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Editar</h5>
              <p className="card-text">Atualize uma tarefa existente.</p>
              <a href="/editar" className="btn btn-warning">Editar</a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Remover</h5>
              <p className="card-text">Remova uma tarefa.</p>
              <a href="/remover" className="btn btn-danger">Remover</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicial;
