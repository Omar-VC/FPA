import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark text-light flex flex-col">
      {/* Header */}
      <header className="flex flex-col items-center py-6">
        <img src={logo} alt="FPA Logo" className="h-36 mb-8" />
        <nav className="flex gap-10">
          {["Ranking", "Torneos", "Inscribirse"].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-lg font-semibold transition-colors ${
                  isActive ? "text-accent" : "text-light"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] transition-all duration-300 ${
                      isActive ? "bg-accent shadow-[0_0_8px_#408A71]" : "bg-transparent"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
