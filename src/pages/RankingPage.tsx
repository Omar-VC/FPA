import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { jugadores } from "../modules/ranking/data";
import { ChartBarIcon } from "@heroicons/react/24/solid";

function obtenerCategoria(puntos: number): string {
  if (puntos >= 1400) return "1ra Categoría";
  if (puntos >= 1200) return "2da Categoría";
  if (puntos >= 1000) return "3ra Categoría";
  if (puntos >= 800) return "4ta Categoría";
  if (puntos >= 600) return "5ta Categoría";
  if (puntos >= 400) return "6ta Categoría";
  if (puntos >= 200) return "7ma Categoría";
  return "8va Categoría";
}

export default function RankingPage() {
  const { gender } = useParams<{ gender: "masculino" | "femenino" }>();
  const generoSeleccionado = gender ?? "masculino";

  const filtrados = jugadores
    .filter((j) => j.genero === generoSeleccionado)
    .sort((a, b) => b.puntos - a.puntos);

  let categoriaActual = "";

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div
          className="rounded-xl p-6 shadow-md flex items-center gap-3"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <ChartBarIcon className="h-7 w-7 text-[var(--color-primary)]" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Ranking {generoSeleccionado === "masculino" ? "Masculino" : "Femenino"}
          </h1>
        </div>

        {/* LISTA DE RANKING */}
        <div className="flex flex-col gap-3">
          {filtrados.map((j, i) => {
            const categoria = obtenerCategoria(j.puntos);
            const mostrarSeparador = categoria !== categoriaActual;
            categoriaActual = categoria;

            return (
              <div key={j.nombre}>
                {/* SEPARADOR */}
                {mostrarSeparador && (
                  <div
                    className="text-center text-xs md:text-sm py-2 my-3 rounded-lg"
                    style={{
                      background: "var(--color-bg)",
                      color: "var(--color-primary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    ★ {categoria} ★
                  </div>
                )}

                {/* CARD JUGADOR */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition hover:scale-[1.01]"
                  style={{
                    background:
                      i === 0
                        ? "var(--color-primary)"
                        : i === 1
                        ? "var(--color-accent)"
                        : "var(--color-surface)",
                    color: i <= 1 ? "#000" : "var(--color-text)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {/* IZQUIERDA */}
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg flex items-center gap-1">
                      {i === 0 && "🥇"}
                      {i === 1 && "🥈"}
                      {i === 2 && "🥉"}
                      {i + 1}
                    </div>

                    <div>
                      <div className="font-semibold">{j.nombre}</div>
                      <div className="text-sm opacity-70">
                        {j.apodo ?? "-"} • {j.ciudad}
                      </div>
                    </div>
                  </div>

                  {/* DERECHA */}
                  <div className="text-right">
                    <div className="text-lg font-bold">{j.puntos}</div>
                    <div className="text-xs opacity-70">pts</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </PublicLayout>
  );
}