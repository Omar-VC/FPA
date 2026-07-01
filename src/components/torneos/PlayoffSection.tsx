import type {
  SetResultado,
  Fase,
} from "../../modules/torneos/competencia.types";
import { applyMatchResult } from "../../modules/torneos/applyMatchResult";

type Props = {
  organizerMode: boolean;
  buscarJugador: (dni: string) => any;
  torneoState: any;
  setTorneoState: (value: any) => void;
};

export default function PlayoffSection({
  organizerMode,
  buscarJugador,
  torneoState,
  setTorneoState,
}: Props) {
  const playoff: Fase[] = torneoState?.competencia?.playoff ?? [];

  return (
    <div
      className="p-3 rounded-md"
      style={{ background: "var(--color-surface-2)" }}
    >
      <h4 className="font-semibold mb-2">Playoff</h4>

      {playoff.map((fase) => (
        <div key={fase.ronda}>
          <h5 className="font-medium mb-2">Ronda {fase.ronda}</h5>

          {fase.partidos.map((p) => {
            const j1a = p.pareja1 ? buscarJugador(p.pareja1.dni1) : null;
            const j1b = p.pareja1 ? buscarJugador(p.pareja1.dni2) : null;
            const j2a = p.pareja2 ? buscarJugador(p.pareja2.dni1) : null;
            const j2b = p.pareja2 ? buscarJugador(p.pareja2.dni2) : null;

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
                      (p.pareja1 ? p.pareja1.dni1 : "Por definir")}{" "}
                    &{" "}
                    {j1b?.nombre ??
                      (p.pareja1 ? p.pareja1.dni2 : "Por definir")}
                  </span>

                  <span style={{ margin: "0 8px" }}>vs</span>

                  <span>
                    {j2a?.nombre ??
                      (p.pareja2 ? p.pareja2.dni1 : "Por definir")}{" "}
                    &{" "}
                    {j2b?.nombre ??
                      (p.pareja2 ? p.pareja2.dni2 : "Por definir")}
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

                {/* RESULTADO VIEW */}
                {!organizerMode && (
                  <div style={{ marginTop: "6px" }}>
                    {p.resultado?.sets?.map(
                      (set: SetResultado, idx: number) => (
                        <div key={idx}>
                          {set.pareja1} - {set.pareja2}
                        </div>
                      ),
                    )}
                  </div>
                )}

                {/* ORGANIZER MODE */}
                {organizerMode &&
                  p.pareja1 &&
                  p.pareja2 &&
                  p.estado !== "finalizado" && (
                    <div style={{ marginTop: "8px" }}>
                      {p.resultado?.sets?.map((set: any, setIndex: number) => (
                        <div
                          key={setIndex}
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="number"
                            value={set.pareja1 ?? ""}
                            onChange={(e) => {
                              const value = e.target.value;

                              setTorneoState((prev: any) => {
                                const updated = { ...prev };

                                updated.competencia.playoff =
                                  updated.competencia.playoff.map(
                                    (fase: any) => ({
                                      ...fase,
                                      partidos: fase.partidos.map(
                                        (match: any) => {
                                          if (match.id !== p.id) return match;

                                          const sets = [
                                            ...match.resultado.sets,
                                          ];

                                          sets[setIndex] = {
                                            ...sets[setIndex],
                                            pareja1:
                                              value === "" ? 0 : Number(value),
                                          };

                                          return {
                                            ...match,
                                            resultado: { sets },
                                          };
                                        },
                                      ),
                                    }),
                                  );

                                return updated;
                              });
                            }}
                          />

                          <span>-</span>

                          <input
                            type="number"
                            value={set.pareja2 ?? ""}
                            onChange={(e) => {
                              const value = e.target.value;

                              setTorneoState((prev: any) => {
                                const updated = { ...prev };

                                updated.competencia.playoff =
                                  updated.competencia.playoff.map(
                                    (fase: any) => ({
                                      ...fase,
                                      partidos: fase.partidos.map(
                                        (match: any) => {
                                          if (match.id !== p.id) return match;

                                          const sets = [
                                            ...match.resultado.sets,
                                          ];

                                          sets[setIndex] = {
                                            ...sets[setIndex],
                                            pareja2:
                                              value === "" ? 0 : Number(value),
                                          };

                                          return {
                                            ...match,
                                            resultado: { sets },
                                          };
                                        },
                                      ),
                                    }),
                                  );

                                return updated;
                              });
                            }}
                          />
                        </div>
                      ))}

                      {/* BOTÓN */}
                      <button
                        onClick={() => {
                          setTorneoState((prev: any) => {
                            const match = prev.competencia.playoff
                              .flatMap((f: any) => f.partidos)
                              .find((m: any) => m.id === p.id);

                            if (!match) return prev;

                            return applyMatchResult({
                              torneo: prev,
                              match,
                              sets: match.resultado?.sets ?? [],
                            });
                          });
                        }}
                        style={{
                          marginTop: "10px",
                          padding: "6px 12px",
                          background: "var(--color-primary)",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: 600,
                          color: "#000",
                          cursor: "pointer",
                        }}
                      >
                        Guardar resultado
                      </button>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
