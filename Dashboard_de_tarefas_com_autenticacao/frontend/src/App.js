import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import Registro from "./paginas/registro";
import Login from "./paginas/login";
import Inicial from "./paginas/inicial";
import Criar from "./CRUD/criar";
import Listar from "./CRUD/listar";
import Editar from "./CRUD/editar";
import Remover from "./CRUD/remover";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1>Bem-vindo ao Organizador de Tarefas</h1>
                <p className="lead">
                  Aqui você pode gerenciar suas tarefas de forma prática e organizada.
                </p>
              </div>
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicial" element={<Inicial />} />
          <Route path="/criar" element={<Criar />} />
          <Route path="/listar" element={<Listar />} />
          <Route path="/editar" element={<Editar />} />
          <Route path="/remover" element={<Remover />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
