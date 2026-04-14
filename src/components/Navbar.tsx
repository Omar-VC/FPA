import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="logo-img" />
        <span className="logo-text">FPA</span>
      </Link>

      {/* Botón hamburguesa (solo mobile) */}
      <button
        className="md:hidden text-2xl text-[var(--color-text)]"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && <div className="overlay" onClick={closeMenu}></div>}

      {/* MENU DESKTOP */}
      <ul className="menu-desktop hidden md:flex">
        <li>
          <NavLink to="/ranking/masculino" className="nav-link">
            Ranking Masculino
          </NavLink>
        </li>
        <li>
          <NavLink to="/ranking/femenino" className="nav-link">
            Ranking Femenino
          </NavLink>
        </li>
        <li>
          <NavLink to="/torneos" className="nav-link">
            Torneos
          </NavLink>
        </li>
        <li>
          <NavLink to="/inscribirse" className="nav-link nav-cta">
            Inscripción
          </NavLink>
        </li>
      </ul>

      {/* MENU MOBILE (sidebar real) */}
      <div
        className={`menu-mobile ${
          open ? "open" : ""
        } md:hidden`}
      >
        <ul>
          <li>
            <NavLink to="/ranking/masculino" className="nav-link" onClick={closeMenu}>
              Ranking Masculino
            </NavLink>
          </li>
          <li>
            <NavLink to="/ranking/femenino" className="nav-link" onClick={closeMenu}>
              Ranking Femenino
            </NavLink>
          </li>
          <li>
            <NavLink to="/torneos" className="nav-link" onClick={closeMenu}>
              Torneos
            </NavLink>
          </li>
          <li>
            <NavLink to="/inscribirse" className="nav-link nav-cta" onClick={closeMenu}>
              Inscripción
            </NavLink>
          </li>
        </ul>

        <div className="menu-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </nav>
  );
}