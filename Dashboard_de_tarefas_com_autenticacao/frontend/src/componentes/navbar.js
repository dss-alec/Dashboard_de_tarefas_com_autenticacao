import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const paginasSemNavbar = ["/inicial", "/criar", "/editar", "/listar", "/remover"];

  if (paginasSemNavbar.includes(location.pathname)) return null;

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/registro">Registro</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
