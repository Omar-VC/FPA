import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/navbar.css";
import "../styles/menu.css";
import "../styles/responsive.css"; // último

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar flex items-center justify-between px-6 py-3">
      {/* Logo + Nombre */}
      <Link to="/" className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="logo-img" />
        <span className="logo-text">FPA</span>
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
        className={`menu-links flex flex-col md:flex-row md:space-x-6 fixed md:static top-0 right-0 h-full md:h-auto w-3/4 md:w-auto transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
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
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>
      </ul>
    </nav>
  );
}
