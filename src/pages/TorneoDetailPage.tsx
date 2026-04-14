import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { torneos } from "../modules/torneos/data";
import { jugadoresFederados } from "../modules/jugadores/data";
import { generarZonas } from "../modules/torneos/utils";

export default function TorneoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const torneo = torneos.find((t) => t.id === id);

  if (!torneo) {
    return (
      <PublicLayout>
        <div className="text-center py-10">
          <h1 className="text-xl font-bold" style={{ color: "var(--color-accent)" }}>
            Torneo no encontrado
          </h1>
        </div>
      </PublicLayout>
    );
  }

  const zonas = generarZonas(torneo.parejas);

  const buscarJugador = (dni: string) =>
    jugadoresFederados.find((j) => j.dni === dni);

  const rankingParcial = torneo.parejas
    .flatMap((p) => [buscarJugador(p.dni1), buscarJugador(p.dni2)])
    .filter(Boolean)
    .sort((a, b) => (b?.puntos ?? 0) - (a?.puntos ?? 0));

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h1 className="text-2xl font-bold mb-2">{torneo.nombre}</h1>
          <p className="text-sm opacity-70">
            {torneo.fecha} • {torneo.lugar}
          </p>

          <span
            className="inline-block mt-3 px-3 py-1 text-xs rounded"
            style={{
              background:
                torneo.estado === "abierto"
                  ? "var(--color-primary)"
                  : torneo.estado === "en juego"
                  ? "var(--color-accent)"
                  : "var(--color-border)",
              color: torneo.estado === "finalizado" ? "#fff" : "#000",
            }}
          >
            {torneo.estado.toUpperCase()}
          </span>
        </div>

        {/* PUNTAJE */}
        <div className="card">
          <h3 className="card-title">Puntaje del torneo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>🏆 Campeón: {torneo.puntos.campeon}</div>
            <div>🥈 Finalista: {torneo.puntos.finalista}</div>
            <div>🥉 Semi: {torneo.puntos.semifinal}</div>
            <div>🎾 Cuartos: {torneo.puntos.cuartos}</div>
          </div>
        </div>

        {/* RANKING */}
        <div className="card">
          <h3 className="card-title">Ranking de inscriptos</h3>

          {rankingParcial.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)" }}>
              Aún no hay jugadores.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {rankingParcial.map((j, i) => (
                <div
                  key={j?.dni}
                  className="flex justify-between px-3 py-2 rounded-md"
                  style={{
                    background:
                      i === 0
                        ? "var(--color-primary)"
                        : i === 1
                        ? "var(--color-accent)"
                        : "var(--color-surface-2)",
                    color: i <= 1 ? "#000" : "var(--color-text)",
                  }}
                >
                  <span>#{i + 1} {j?.nombre}</span>
                  <span>{j?.puntos} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAREJAS */}
        <div className="card">
          <h3 className="card-title">Parejas inscriptas</h3>

          {torneo.parejas.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)" }}>
              Sin inscripciones.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {torneo.parejas.map((p, idx) => {
                const j1 = buscarJugador(p.dni1);
                const j2 = buscarJugador(p.dni2);

                return (
                  <div
                    key={`${p.dni1}-${p.dni2}`}
                    className="px-3 py-2 rounded-md flex justify-between"
                    style={{ background: "var(--color-surface-2)" }}
                  >
                    <span>Pareja {idx + 1}</span>
                    <span className="text-sm">
                      {j1?.nombre ?? p.dni1} & {j2?.nombre ?? p.dni2}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ZONAS */}
        {torneo.parejas.length >= 20 && (
          <div className="card">
            <h3 className="card-title">Zonas</h3>

            {zonas.map((zona) => (
              <div key={zona.nombre} className="mb-4">
                <h4 className="font-semibold mb-2">{zona.nombre}</h4>

                <div className="flex flex-col gap-2">
                  {zona.parejas.map((p, idx) => {
                    const j1 = buscarJugador(p.dni1);
                    const j2 = buscarJugador(p.dni2);

                    return (
                      <div
                        key={`${p.dni1}-${p.dni2}`}
                        className="px-3 py-2 rounded-md flex justify-between"
                        style={{ background: "var(--color-surface-2)" }}
                      >
                        <span>Pareja {idx + 1}</span>
                        <span>
                          {j1?.nombre ?? p.dni1} & {j2?.nombre ?? p.dni2}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={`https://wa.me/549xxxxxxxxxx?text=Hola, quiero inscribirme al torneo ${torneo.nombre}`}
          target="_blank"
          className="text-center py-3 rounded-lg font-semibold"
          style={{
            background: "var(--color-accent)",
            color: "#000",
          }}
        >
          Contactar organizador
        </a>
      </div>
    </PublicLayout>
  );
}