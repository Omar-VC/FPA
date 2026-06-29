import { applyMatchResult } from "../../modules/torneos/applyMatchResult";
import type { SetResultado } from "../../modules/torneos/competencia.types";
import type { Partido } from "../../modules/torneos/competencia.types";


type Props = {
  playoff?: Partido[];
  organizerMode: boolean;
  buscarJugador: (dni: string) => any;
  torneoState: any;
  setTorneoState: (value: any) => void;
};

export default function PlayoffSection({
  playoff = [],
  organizerMode,
  buscarJugador,
  torneoState,
  setTorneoState,
}: Props) {
  return (
    <div
      className="p-3 rounded-md"
      style={{ background: "var(--color-surface-2)" }}
    >
      <h4 className="font-semibold mb-2">Playoff</h4>

      {playoff.map((p) => {
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
                {j1a?.nombre ?? (p.pareja1 ? p.pareja1.dni1 : "Por definir")}{" "}
                &{" "}
                {j1b?.nombre ?? (p.pareja1 ? p.pareja1.dni2 : "Por definir")}
              </span>

              <span style={{ margin: "0 8px" }}>vs</span>

              <span>
                {j2a?.nombre ?? (p.pareja2 ? p.pareja2.dni1 : "Por definir")}{" "}
                &{" "}
                {j2b?.nombre ?? (p.pareja2 ? p.pareja2.dni2 : "Por definir")}
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
                {p.resultado?.sets.map((set: SetResultado, idx: number) => (
                  <div key={idx}>
                    {set.pareja1} - {set.pareja2}
                  </div>
                ))}
              </div>
            )}

            {/* ORGANIZER MODE */}
            {organizerMode &&
              p.pareja1 &&
              p.pareja2 &&
              p.estado !== "finalizado" && (
                <div style={{ marginTop: "8px" }}>
                  {p.resultado?.sets?.map((set: SetResultado, setIndex: number) => (
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
                        inputMode="numeric"
                        value={set.pareja1}
                        onChange={(e) => {
                          const val = Number(e.target.value);

                          const updatedSets = [...(p.resultado?.sets ?? [])];
                          updatedSets[setIndex] = {
                            ...updatedSets[setIndex],
                            pareja1: val,
                          };

                          // NO mutamos p → solo preparamos data local
                          p.resultado = { sets: updatedSets };
                        }}
                        style={{ width: 60 }}
                      />

                      <span>-</span>

                      <input
                        type="number"
                        inputMode="numeric"
                        value={set.pareja2}
                        onChange={(e) => {
                          const val = Number(e.target.value);

                          const updatedSets = [...(p.resultado?.sets ?? [])];
                          updatedSets[setIndex] = {
                            ...updatedSets[setIndex],
                            pareja2: val,
                          };

                          p.resultado = { sets: updatedSets };
                        }}
                        style={{ width: 60 }}
                      />
                    </div>
                  ))}

                  {/* GUARDAR + RESOLVER MATCH */}
                  <button
                    onClick={() => {
                      setTorneoState(
                        applyMatchResult({
                          torneo: torneoState,
                          match: p,
                          sets: p.resultado?.sets ?? [],
                        }),
                      );
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
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}