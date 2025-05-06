import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '280px', height: '100vh' }}>
      <span className="fs-4 mb-3">💬</span>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active">Página inicial</a>
        </li>
        <li>
          <a href="#" className="nav-link">Explorar</a>
        </li>
        <li>
          <a href="#" className="nav-link">Comunidade</a>
        </li>
        <li>
          <a href="#" className="nav-link">Notificações</a>
        </li>
        <li>
          <a href="#" className="nav-link">Configurações</a>
        </li>
      </ul>
      <div className="mt-auto">
        <strong>Usuario</strong>
        <p className="mb-0">Membro</p>
      </div>
    </div>
  );
}

export default Header;