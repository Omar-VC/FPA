import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [rankingOpen, setRankingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-light flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center py-6">
        <img src={logo} alt="FPA Logo" className="h-36 mb-8" />
        <nav className="flex gap-10 relative">
          {/* Ranking con submenu por click */}
          <div className="relative">
            <span
              onClick={() => setRankingOpen(!rankingOpen)}
              className="cursor-pointer text-lg font-semibold text-light"
            >
              Ranking
            </span>
            {rankingOpen && (
              <div className="absolute left-0 mt-2 bg-dark border border-accent rounded-md shadow-lg">
                <NavLink
                  to="/ranking/masculino"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors ${
                      isActive ? "text-accent bg-primary" : "text-light hover:bg-primary"
                    }`
                  }
                  onClick={() => setRankingOpen(false)}
                >
                  Masculino
                </NavLink>
                <NavLink
                  to="/ranking/femenino"
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors ${
                      isActive ? "text-accent bg-primary" : "text-light hover:bg-primary"
                    }`
                  }
                  onClick={() => setRankingOpen(false)}
                >
                  Femenino
                </NavLink>
              </div>
            )}
          </div>

          {/* Otros enlaces */}
          <NavLink
            to="/torneos"
            className={({ isActive }) =>
              `relative text-lg font-semibold transition-colors ${
                isActive ? "text-accent" : "text-light"
              }`
            }
          >
            Torneos
          </NavLink>
          <NavLink
            to="/inscribirse"
            className={({ isActive }) =>
              `relative text-lg font-semibold transition-colors ${
                isActive ? "text-accent" : "text-light"
              }`
            }
          >
            Inscribirse
          </NavLink>
        </nav>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
