import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/navbar.css"; // ahora todo está centralizado aquí

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 bg-dark text-light">
      {/* Logo + Nombre */}
      <Link to="/" className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="logo-img" />
        <span className="logo-text text-green">FPA</span>
      </Link>

      {/* Botón hamburguesa en móvil */}
      <button
        className="md:hidden text-light text-2xl focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Overlay para cerrar al hacer click fuera */}
      {open && <div className="overlay" onClick={closeMenu}></div>}

      {/* Links */}
      <ul
        className={`menu-links ${
          open ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } flex flex-col md:flex-row md:space-x-6 md:static md:bg-transparent md:border-0 md:backdrop-filter-none`}
      >
        <li>
          <NavLink
            to="/ranking/masculino"
            className="nav-link big-link"
            onClick={closeMenu}
          >
            Ranking Masculino
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ranking/femenino"
            className="nav-link big-link"
            onClick={closeMenu}
          >
            Ranking Femenino
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/torneos"
            className="nav-link big-link"
            onClick={closeMenu}
          >
            Torneos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/inscribirse"
            className="nav-link big-link"
            onClick={closeMenu}
          >
            Inscripción
          </NavLink>
        </li>

        {/* Logo al final del menú hamburguesa */}
        <div className="menu-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </ul>
    </nav>
  );
}
