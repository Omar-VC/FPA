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

import { validatePair, validateOrganizerCode } from "../modules/torneos/rules";
import { generarCompetencia } from "../modules/torneos/competencia.generator";
import { saveTournamentCompetition } from "../services/api";
import {
  calcularGanador,
  avanzarGanador,
} from "../modules/torneos/competencia.utils";
import TournamentHeader from "../components/torneos/TournamentHeader";
import OrganizerLogin from "../components/torneos/OrganizerLogin";
import TournamentRanking from "../components/torneos/TournamentRanking";
import TournamentPairs from "../components/torneos/TournamentPairs";
import OrganizerPanel from "../components/torneos/OrganizerPanel";
import ZonasSection from "../components/torneos/ZonasSection";

export default function TorneoDetailPage() {
  const jugadoresFederados = getPlayers();

  const [organizerMode, setOrganizerMode] = useState(
    localStorage.getItem("organizerMode") === "true",
  );

  type SetResult = {
    pareja1: number;
    pareja2: number;
  };

  const [resultados, setResultados] = useState<Record<string, SetResult[]>>({});

  const [codigo, setCodigo] = useState("");

  const [dni1, setDni1] = useState("");

  const [dni2, setDni2] = useState("");

  const { id } = useParams<{
    id: string;
  }>();

  const torneoInicial = getTournaments().find((t) => t.id === id);

  const [torneoState, setTorneoState] = useState(torneoInicial);

  const torneo = torneoState!;

  const refreshTournament = () => {
    const torneoActualizado = getTournaments().find((t) => t.id === torneo.id);

    if (torneoActualizado) {
      setTorneoState({
        ...torneoActualizado,
      });
    }
  };

  const handleChangeEstado = (
    estado: "abierto" | "cerrado" | "en juego" | "finalizado",
  ) => {
    setTorneoState((prev) => (prev ? { ...prev, estado } : prev));
  };

  if (!torneoState) {
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

  const buscarJugador = (dni: string) =>
    jugadoresFederados.find((j) => j.dni === dni);

  const rankingParcial = torneo.parejas
    .flatMap((p) => [buscarJugador(p.dni1), buscarJugador(p.dni2)])
    .filter((j): j is NonNullable<typeof j> => Boolean(j))
    .sort((a, b) => b.puntos - a.puntos);

  const handleAgregarPareja = () => {
    if (
      torneoState?.estado === "cerrado" ||
      torneoState?.estado === "en juego" ||
      torneoState?.estado === "finalizado"
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

    {
      /* AGREGAR PAREJA*/
    }

    addPairToTournament(torneo.id, {
      dni1,
      dni2,
    });

    refreshTournament();

    alert("Pareja agregada");

    setDni1("");
    setDni2("");
  };

  {
    /* GENERAR COMPETENCIA*/
  }

  const handleGenerarCompetencia = () => {
    const competencia = generarCompetencia({
      parejas: torneo.parejas,
      tipoFormato: torneo.tipoFormato,
      tamanoZona: torneo.tamanoZona,
      clasificanPorZona: torneo.clasificanPorZona,
      cantidadSets: torneo.cantidadSets,
    });

    saveTournamentCompetition(torneo.id, competencia);

    refreshTournament();

    alert("Competencia generada");
  };

  const handleLoginOrganizer = () => {
    const valid = validateOrganizerCode(codigo);

    if (!valid) {
      alert("Código inválido");
      return;
    }

    setOrganizerMode(true);

    localStorage.setItem("organizerMode", "true");

    alert("Modo organizador activado");
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <TournamentHeader torneo={torneo} />

        {/* LOGIN ORGANIZADOR */}
        <OrganizerLogin
          organizerMode={organizerMode}
          codigo={codigo}
          setCodigo={setCodigo}
          handleLoginOrganizer={handleLoginOrganizer}
        />

        {/* PANEL ORGANIZADOR */}
        {organizerMode && (
          <OrganizerPanel
            torneo={torneo}
            dni1={dni1}
            dni2={dni2}
            setDni1={setDni1}
            setDni2={setDni2}
            handleAgregarPareja={handleAgregarPareja}
            setOrganizerMode={setOrganizerMode}
            updateTournamentStatus={updateTournamentStatus}
            handleGenerarCompetencia={handleGenerarCompetencia}
            onChangeEstado={handleChangeEstado}
          />
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
        <TournamentRanking rankingParcial={rankingParcial} />

        {/* PAREJAS */}
        <TournamentPairs
          torneo={torneo}
          organizerMode={organizerMode}
          buscarJugador={buscarJugador}
          removePairFromTournament={removePairFromTournament}
          refreshTournament={refreshTournament}
        />

        {/* COMPETENCIA */}
        {torneo.competencia && (
          <div className="card">
            <h3 className="card-title">Competencia</h3>
            
            <div className="flex flex-col gap-4">
              {/* 🔹 ZONAS */}
              {torneo.competencia?.zonas?.map((zona) => (
                <ZonasSection
                  key={zona.nombre}
                  zona={zona}
                  organizerMode={organizerMode}
                  buscarJugador={buscarJugador}
                  resultados={resultados}
                  setResultados={setResultados}
                  calcularGanador={calcularGanador}
                  avanzarGanador={avanzarGanador}
                  torneoState={torneoState}
                  setTorneoState={setTorneoState}
                />
              ))}

              {/* 🔹 PLAYOFF */}
              {torneo.competencia?.playoff &&
                torneo.competencia.playoff.length > 0 && (
                  <div
                    className="p-3 rounded-md"
                    style={{ background: "var(--color-surface-2)" }}
                  >
                    <h4 className="font-semibold mb-2">Playoff</h4>

                    {torneo.competencia.playoff.map((p) => {
                      const j1a = p.pareja1
                        ? buscarJugador(p.pareja1.dni1)
                        : null;
                      const j1b = p.pareja1
                        ? buscarJugador(p.pareja1.dni2)
                        : null;
                      const j2a = p.pareja2
                        ? buscarJugador(p.pareja2.dni1)
                        : null;
                      const j2b = p.pareja2
                        ? buscarJugador(p.pareja2.dni2)
                        : null;

                      console.log(
                        "Playoff partidos:",
                        torneo.competencia?.playoff,
                      );

                      return (
                        <div
                          key={p.id}
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            borderBottom: "1px solid var(--color-border)",
                          }}
                        >
                          {/* INFO PARTIDO */}
                          <div>
                            <span>
                              {j1a?.nombre ??
                                (p.pareja1 ? (
                                  p.pareja1.dni1
                                ) : (
                                  <span
                                    style={{
                                      color: "gray",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Por definir
                                  </span>
                                ))}{" "}
                              &{" "}
                              {j1b?.nombre ??
                                (p.pareja1 ? (
                                  p.pareja1.dni2
                                ) : (
                                  <span
                                    style={{
                                      color: "gray",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Por definir
                                  </span>
                                ))}
                            </span>

                            <span style={{ margin: "0 8px" }}>vs</span>

                            <span>
                              {j2a?.nombre ??
                                (p.pareja2 ? (
                                  p.pareja2.dni1
                                ) : (
                                  <span
                                    style={{
                                      color: "gray",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Por definir
                                  </span>
                                ))}{" "}
                              &{" "}
                              {j2b?.nombre ??
                                (p.pareja2 ? (
                                  p.pareja2.dni2
                                ) : (
                                  <span
                                    style={{
                                      color: "gray",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Por definir
                                  </span>
                                ))}
                            </span>

                            <span
                              style={{
                                marginLeft: "10px",
                                opacity: 0.8,
                                color:
                                  p.estado === "pendiente"
                                    ? "gray"
                                    : p.estado === "jugado"
                                      ? "blue"
                                      : "green",
                              }}
                            >
                              ({p.estado})
                            </span>
                          </div>

                          {/* RESULTADOS */}
                          {!organizerMode && (
                            <div style={{ marginTop: "6px" }}>
                              {p.resultado?.sets.map((set, idx) => (
                                <div key={idx}>
                                  {set.pareja1} - {set.pareja2}
                                </div>
                              ))}
                            </div>
                          )}

                          {organizerMode &&
                            p.pareja1 &&
                            p.pareja2 &&
                            p.estado !== "finalizado" && (
                              <div
                                style={{
                                  marginTop: "8px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "6px",
                                }}
                              >
                                {p.resultado?.sets.map((set, setIndex) => (
                                  <div
                                    key={setIndex}
                                    style={{
                                      display: "flex",
                                      gap: "8px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      placeholder="P1"
                                      value={
                                        resultados[p.id]?.[setIndex]?.pareja1 ??
                                        set.pareja1
                                      }
                                      onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setResultados((prev) => {
                                          const prevSets = prev[p.id] ?? [
                                            ...p.resultado!.sets,
                                          ];
                                          const updated = [...prevSets];
                                          updated[setIndex] = {
                                            pareja1: val,
                                            pareja2:
                                              updated[setIndex]?.pareja2 ??
                                              set.pareja2,
                                          };
                                          return { ...prev, [p.id]: updated };
                                        });
                                      }}
                                      style={{ width: 60 }}
                                    />
                                    <span>-</span>
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      placeholder="P2"
                                      value={
                                        resultados[p.id]?.[setIndex]?.pareja2 ??
                                        set.pareja2
                                      }
                                      onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setResultados((prev) => {
                                          const prevSets = prev[p.id] ?? [
                                            ...p.resultado!.sets,
                                          ];
                                          const updated = [...prevSets];
                                          updated[setIndex] = {
                                            pareja1:
                                              updated[setIndex]?.pareja1 ??
                                              set.pareja1,
                                            pareja2: val,
                                          };
                                          return { ...prev, [p.id]: updated };
                                        });
                                      }}
                                      style={{ width: 60 }}
                                    />
                                  </div>
                                ))}

                                {/* BOTÓN GUARDAR */}
                                <button
                                  onClick={() => {
                                    if (!torneoState.competencia?.playoff)
                                      return;

                                    const sets = resultados[p.id] ?? [];
                                    const ganador = calcularGanador({
                                      ...p,
                                      resultado: { sets },
                                    });

                                    const updated = {
                                      ...torneoState,
                                      competencia: {
                                        ...torneoState.competencia,
                                        playoff:
                                          torneoState.competencia.playoff.map(
                                            (partido) =>
                                              partido.id === p.id
                                                ? {
                                                    ...partido,
                                                    resultado: { sets },
                                                    estado: "jugado" as const,
                                                    ganador:
                                                      ganador ?? undefined,
                                                  }
                                                : partido,
                                          ),
                                      },
                                    };

                                    setTorneoState(updated);
                                  }}
                                  style={{
                                    marginTop: "6px",
                                    padding: "6px 10px",
                                    background: "var(--color-primary)",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontWeight: 600,
                                  }}
                                >
                                  Guardar resultado
                                </button>

                                {/* BOTÓN CERRAR */}
                                <button
                                  onClick={() => {
                                    const sets = resultados[p.id] ?? [];
                                    const ganador = calcularGanador({
                                      ...p,
                                      resultado: { sets },
                                    });
                                    if (!ganador) return;

                                    const updated = avanzarGanador(
                                      torneoState,
                                      p.id,
                                      ganador,
                                    );
                                    setTorneoState({
                                      ...updated,
                                      competencia: {
                                        ...updated.competencia!,
                                        playoff:
                                          updated.competencia!.playoff!.map(
                                            (partido) =>
                                              partido.id === p.id
                                                ? {
                                                    ...partido,
                                                    estado:
                                                      "finalizado" as const,
                                                  }
                                                : partido,
                                          ),
                                      },
                                    });
                                  }}
                                  style={{
                                    marginTop: "6px",
                                    padding: "6px 10px",
                                    background: "var(--color-secondary)",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontWeight: 600,
                                  }}
                                >
                                  Cerrar partido
                                </button>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
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
