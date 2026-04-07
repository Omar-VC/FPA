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
        <div className="flex flex-col items-center py-8">
          <h1 className="text-2xl font-bold text-accent mb-6">Torneo no encontrado</h1>
        </div>
      </PublicLayout>
    );
  }

  const zonas = generarZonas(torneo.parejas);

  const buscarJugador = (dni: string) =>
    jugadoresFederados.find((j) => j.dni === dni);

  // Ranking parcial: jugadores inscriptos ordenados por puntos actuales
  const rankingParcial = torneo.parejas
    .map((p) => {
      const j1 = buscarJugador(p.dni1);
      const j2 = buscarJugador(p.dni2);
      return [j1, j2].filter(Boolean);
    })
    .flat()
    .sort((a, b) => (b?.puntos ?? 0) - (a?.puntos ?? 0));

  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">{torneo.nombre}</h1>
        <p className="text-light mb-4">{torneo.fecha} - {torneo.lugar}</p>
        <p className="text-sm text-light mb-4">Estado: {torneo.estado}</p>

        {/* Tabla de puntajes */}
        <div className="w-3/4 bg-dark border border-accent rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-primary font-semibold mb-2">Puntaje del torneo</h3>
          <ul className="space-y-1 text-light">
            <li>Campeón: {torneo.puntos.campeon} pts</li>
            <li>Finalista: {torneo.puntos.finalista} pts</li>
            <li>Semifinal: {torneo.puntos.semifinal} pts</li>
            <li>Cuartos: {torneo.puntos.cuartos} pts</li>
          </ul>
        </div>

        {/* Ranking parcial */}
        <div className="w-3/4 bg-dark border border-accent rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-primary font-semibold mb-2">Ranking parcial de inscriptos</h3>
          {rankingParcial.length === 0 ? (
            <p className="text-light">Aún no hay jugadores inscriptos.</p>
          ) : (
            <ul className="space-y-2">
              {rankingParcial.map((j, idx) => (
                <li
                  key={j?.dni}
                  className="flex justify-between items-center border-b border-accent pb-1"
                >
                  <span className="text-light">#{idx + 1} {j?.nombre}</span>
                  <span className="text-accent">{j?.puntos} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Parejas inscriptas */}
        <div className="w-3/4 bg-dark border border-accent rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-primary font-semibold mb-2">Parejas inscriptas</h3>
          {torneo.parejas.length === 0 ? (
            <p className="text-light">Aún no hay inscripciones.</p>
          ) : (
            <ul className="space-y-2">
              {torneo.parejas.map((p, idx) => {
                const jugador1 = buscarJugador(p.dni1);
                const jugador2 = buscarJugador(p.dni2);
                return (
                  <li
                    key={`${p.dni1}-${p.dni2}`}
                    className="flex justify-between items-center border-b border-accent pb-1"
                  >
                    <span className="text-light">Pareja {idx + 1}</span>
                    <span className="text-accent">
                      {jugador1 ? jugador1.nombre : p.dni1} ({jugador1?.ciudad}) 
                      & {jugador2 ? jugador2.nombre : p.dni2} ({jugador2?.ciudad})
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Zonas */}
        {torneo.parejas.length >= 20 && (
          <div className="w-3/4 bg-dark border border-accent rounded-lg shadow-lg p-6 space-y-6">
            {zonas.map((zona) => (
              <div key={zona.nombre} className="mb-6">
                <h3 className="text-primary font-semibold mb-2">{zona.nombre}</h3>
                <ul className="space-y-2">
                  {zona.parejas.map((p, idx) => {
                    const jugador1 = buscarJugador(p.dni1);
                    const jugador2 = buscarJugador(p.dni2);
                    return (
                      <li
                        key={`${p.dni1}-${p.dni2}`}
                        className="flex justify-between items-center border-b border-accent pb-1"
                      >
                        <span className="text-light">Pareja {idx + 1}</span>
                        <span className="text-accent">
                          {jugador1 ? jugador1.nombre : p.dni1} & {jugador2 ? jugador2.nombre : p.dni2}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Botón de inscripción/contacto */}
        <div className="mt-6">
          <a
            href={`https://wa.me/549xxxxxxxxxx?text=Hola, quiero inscribirme al torneo ${torneo.nombre}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-light rounded-md hover:bg-accent"
          >
            Contactar organizador
          </a>
        </div>
      </div>
    </PublicLayout>
  );
}
