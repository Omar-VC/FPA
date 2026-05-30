import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { getTournaments } from "../services/api";

export default function TorneosPage() {
  const torneos = getTournaments();

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {/* HEADER */}
        <div
          className="rounded-xl p-6 shadow-md flex items-center gap-4"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <TrophyIcon className="h-10 w-10 text-[var(--color-primary)]" />

          <div>
            <h1 className="text-2xl font-bold mb-1">Torneos FPA</h1>
            <p className="text-sm opacity-70 mb-3">
              Explorá los torneos disponibles y anotate con tu pareja.
            </p>

            <Link
              to="/crear-torneo"
              className="inline-block px-4 py-2 rounded-lg font-semibold"
              style={{
                background: "var(--color-accent)",
                color: "#000",
              }}
            >
              Crear torneo
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-semibold">Próximos eventos</h2>

        {/* LISTA */}
        {torneos.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>
            Aún no hay torneos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {torneos.map((t) => (
              <div
                key={t.id}
                className="rounded-xl p-5 flex flex-col gap-3 transition hover:scale-[1.01]"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h3 className="text-lg font-semibold">{t.nombre}</h3>

                <div
                  className="w-fit px-2 py-1 rounded text-xs font-semibold"
                  style={{
                    background:
                      t.genero === "masculino"
                        ? "var(--color-primary)"
                        : t.genero === "femenino"
                          ? "#ff4fa3"
                          : "var(--color-accent)",
                    color: "#000",
                  }}
                >
                  {t.genero.toUpperCase()}
                </div>

                <div className="text-sm opacity-70 flex flex-col gap-1">
                  <span>
                    {t.fecha} • {t.lugar}
                  </span>

                  <span>Categoría: {t.categoria}</span>

                  <span>
                    Modalidad: {(t.genero ?? "masculino").toUpperCase()}
                  </span>

                  <span>
                    Formato:{" "}
                    {t.tipoFormato === "zonas-playoff"
                      ? "Zonas + Playoff"
                      : "Eliminación Directa"}
                  </span>

                  <span>
                    Cupos: {t.inscriptos}/{t.cupoMaximo}
                  </span>

                  <span>Inscripción: ${t.precioInscripcion ?? 0}</span>
                </div>

                <span
                  className="text-xs font-semibold px-2 py-1 rounded w-fit"
                  style={{
                    background:
                      t.estado === "abierto"
                        ? "var(--color-primary)"
                        : t.estado === "en juego"
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    color: t.estado === "finalizado" ? "#fff" : "#000",
                  }}
                >
                  {t.estado.toUpperCase()}
                </span>

                <div className="flex gap-3 mt-2">
                  <Link
                    to={`/torneos/${t.id}`}
                    className="px-3 py-1.5 rounded-md text-sm font-semibold"
                    style={{
                      background: "var(--color-surface-2)",
                      color: "var(--color-text)",
                    }}
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
