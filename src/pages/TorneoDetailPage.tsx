import { useState } from "react";
import { useParams } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import {
  getTournaments,
  getPlayers,
  removePairFromTournament,
  addPairToTournament,
  updateTournamentStatus,
} from "../services/api";

import { generarZonas } from "../modules/torneos/torneo.utils";

import {
  isOrganizer,
  validatePair,
  validateOrganizerCode,
  logoutOrganizer,
} from "../modules/torneos/rules";

export default function TorneoDetailPage() {
  const torneos = getTournaments();

  const jugadoresFederados = getPlayers();

  const organizerMode = isOrganizer();

  const [codigo, setCodigo] = useState("");

  const [dni1, setDni1] = useState("");

  const [dni2, setDni2] = useState("");

  const { id } = useParams<{
    id: string;
  }>();

  const torneo = torneos.find((t) => t.id === id);

  if (!torneo) {
    return (
      <PublicLayout>
        <div className="text-center py-10">
          <h1
            className="text-xl font-bold"
            style={{
              color: "var(--color-accent)",
            }}
          >
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
    .filter((j): j is NonNullable<typeof j> => Boolean(j))
    .sort((a, b) => b.puntos - a.puntos);

  const handleAgregarPareja = () => {
    if (
      torneo.estado === "cerrado" ||
      torneo.estado === "en juego" ||
      torneo.estado === "finalizado"
    ) {
      alert("El torneo no acepta más inscripciones");

      return;
    }

    if (torneo.inscriptos >= torneo.cupoMaximo) {
      alert("No hay más cupos disponibles");

      return;
    }

    const validation = validatePair(torneo, dni1, dni2);

    if (!validation.valid) {
      alert(validation.reason);

      return;
    }

    addPairToTournament(torneo.id, {
      dni1,
      dni2,
    });

    alert("Pareja agregada");

    setDni1("");
    setDni2("");

    window.location.reload();
  };

  const handleLoginOrganizer = () => {
    const valid = validateOrganizerCode(codigo);

    if (!valid) {
      alert("Código inválido");

      return;
    }

    alert("Modo organizador activado");

    window.location.reload();
  };

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

          <div className="flex justify-between items-start gap-6 mt-3 flex-wrap">
            {/* IZQUIERDA */}
            <div className="flex flex-col gap-2">
              <div className="text-sm opacity-70 flex flex-col">
                <span>📅 {torneo.fecha}</span>

                <span>📍 {torneo.lugar}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span
                  className="inline-block px-3 py-1 text-xs rounded"
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

                <span
                  className="inline-block px-3 py-1 text-xs rounded"
                  style={{
                    background: "var(--color-surface-2)",
                  }}
                >
                  {(torneo.genero ?? "masculino").toUpperCase()}
                </span>

                <span
                  className="inline-block px-3 py-1 text-xs rounded"
                  style={{
                    background: "var(--color-surface-2)",
                  }}
                >
                  {torneo.categoria.toUpperCase()}
                </span>
              </div>
            </div>

            {/* DERECHA */}
            <div className="flex gap-4 flex-wrap">
              <div
                className="px-4 py-2 rounded-lg"
                style={{
                  background: "var(--color-primary)",

                  color: "#000",
                }}
              >
                <div className="text-xs font-semibold">INSCRIPCIÓN</div>

                <div className="text-lg font-bold">
                  ${torneo.precioInscripcion}
                </div>
              </div>

              <div
                className="px-4 py-2 rounded-lg"
                style={{
                  background: "var(--color-surface-2)",
                }}
              >
                <div className="text-xs font-semibold">CUPOS</div>

                <div className="text-lg font-bold">
                  {torneo.inscriptos}/{torneo.cupoMaximo}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN ORGANIZADOR */}
        {!organizerMode && (
          <div className="card">
            <h3 className="card-title">Acceso organizador</h3>

            <div className="flex gap-2">
              <input
                type="password"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ingresar código"
                className="input"
              />

              <button
                onClick={handleLoginOrganizer}
                className="px-4 py-2 rounded-md font-semibold"
                style={{
                  background: "var(--color-primary)",

                  color: "#000",
                }}
              >
                Soy organizador
              </button>
            </div>
          </div>
        )}

        {/* PANEL ORGANIZADOR */}
        {organizerMode && (
          <div className="card flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="card-title">Panel organizador</h3>

              <button
                onClick={() => {
                  logoutOrganizer();

                  window.location.reload();
                }}
                className="px-3 py-1 rounded-md text-sm font-semibold"
                style={{
                  background: "#ff4d4d",

                  color: "#fff",
                }}
              >
                Cerrar modo organizador
              </button>
            </div>

            {/* AGREGAR PAREJA */}
            <div className="flex gap-2 flex-wrap">
              <input
                value={dni1}
                onChange={(e) => setDni1(e.target.value)}
                placeholder="DNI jugador 1"
                className="input"
              />

              <input
                value={dni2}
                onChange={(e) => setDni2(e.target.value)}
                placeholder="DNI jugador 2"
                className="input"
              />

              <button
                onClick={handleAgregarPareja}
                disabled={
                  torneo.estado === "cerrado" ||
                  torneo.estado === "en juego" ||
                  torneo.estado === "finalizado" ||
                  torneo.inscriptos >= torneo.cupoMaximo
                }
                className="px-4 py-2 rounded-md font-semibold disabled:opacity-50"
                style={{
                  background: "var(--color-primary)",

                  color: "#000",
                }}
              >
                Agregar
              </button>
            </div>

            {/* ESTADOS */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  updateTournamentStatus(torneo.id, "abierto");

                  window.location.reload();
                }}
                className="px-3 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: "var(--color-primary)",

                  color: "#000",
                }}
              >
                Abrir torneo
              </button>

              <button
                onClick={() => {
                  updateTournamentStatus(torneo.id, "cerrado");

                  window.location.reload();
                }}
                className="px-3 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: "var(--color-surface-2)",
                }}
              >
                Cerrar torneo
              </button>

              <button
                onClick={() => {
                  updateTournamentStatus(torneo.id, "en juego");

                  window.location.reload();
                }}
                className="px-3 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: "var(--color-accent)",

                  color: "#000",
                }}
              >
                En juego
              </button>

              <button
                onClick={() => {
                  updateTournamentStatus(torneo.id, "finalizado");

                  window.location.reload();
                }}
                className="px-3 py-2 rounded-md text-sm font-semibold"
                style={{
                  background: "#ff4d4d",

                  color: "#fff",
                }}
              >
                Finalizar
              </button>
            </div>
          </div>
        )}

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
            <p
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              Aún no hay jugadores.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {rankingParcial.map((j, i) => (
                <div
                  key={j.dni}
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
                  <span>
                    #{i + 1} {j.nombre}
                  </span>

                  <span>{j.puntos} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAREJAS */}
        <div className="card">
          <h3 className="card-title">Parejas inscriptas</h3>

          {torneo.parejas.length === 0 ? (
            <p
              style={{
                color: "var(--color-text-muted)",
              }}
            >
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
                    className="px-3 py-2 rounded-md flex justify-between items-center"
                    style={{
                      background: "var(--color-surface-2)",
                    }}
                  >
                    <div>
                      <div className="font-semibold">Pareja {idx + 1}</div>

                      <div className="text-sm">
                        {j1?.nombre ?? p.dni1} & {j2?.nombre ?? p.dni2}
                      </div>
                    </div>

                    {organizerMode && (
                      <button
                        onClick={() => {
                          removePairFromTournament(torneo.id, p.dni1, p.dni2);

                          window.location.reload();
                        }}
                        className="px-3 py-1 rounded-md text-sm font-semibold"
                        style={{
                          background: "#ff4d4d",

                          color: "#fff",
                        }}
                      >
                        Eliminar
                      </button>
                    )}
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
                        style={{
                          background: "var(--color-surface-2)",
                        }}
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
          href={`https://wa.me/${torneo.telefonoOrganizador.replace(/\D/g, "")}?text=Hola, quiero inscribirme al torneo ${torneo.nombre}`}
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
