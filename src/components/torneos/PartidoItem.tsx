import { applyMatchResult } from "../../modules/torneos/applyMatchResult";

type Props = {
  partido: any;
  calcularGanador: any;
  avanzarGanador: any;
  buscarJugador: (dni: string) => any;
  torneoState: any;
  setTorneoState: any;
  organizerMode: boolean;
};

export default function PartidoItem({
  partido,
  buscarJugador,
  torneoState,
  setTorneoState,
  organizerMode,
}: Props) {
  const p = partido;

  const j1a = p.pareja1 ? buscarJugador(p.pareja1.dni1) : null;
  const j1b = p.pareja1 ? buscarJugador(p.pareja1.dni2) : null;

  const j2a = p.pareja2 ? buscarJugador(p.pareja2.dni1) : null;
  const j2b = p.pareja2 ? buscarJugador(p.pareja2.dni2) : null;

  return (
    <div
      style={{
        padding: "8px 0",
        fontSize: "13px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* INFO PARTIDO */}
      <div>
        <span>
          {j1a?.nombre ?? p.pareja1?.dni1 ?? "Por definir"} &{" "}
          {j1b?.nombre ?? p.pareja1?.dni2 ?? "Por definir"}
        </span>

        <span style={{ margin: "0 8px" }}>vs</span>

        <span>
          {j2a?.nombre ?? p.pareja2?.dni1 ?? "Por definir"} &{" "}
          {j2b?.nombre ?? p.pareja2?.dni2 ?? "Por definir"}
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

      {/* RESULTADOS (solo view) */}
      {!organizerMode && (
        <div style={{ marginTop: "6px" }}>
          {p.resultado?.sets?.map((set: any, idx: number) => (
            <div key={idx}>
              {set.pareja1} - {set.pareja2}
            </div>
          ))}
        </div>
      )}

      {/* EDICIÓN ORGANIZADOR */}
      {organizerMode && p.pareja1 && p.pareja2 && p.estado !== "finalizado" && (
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
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
                type="text"
                inputMode="numeric"
                value={p.resultado?.sets?.[setIndex]?.pareja1 ?? set.pareja1}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  setTorneoState((prev: any) => {
                    const updatedSets = [...(p.resultado?.sets ?? [])];

                    updatedSets[setIndex] = {
                      pareja1: val,
                      pareja2: updatedSets[setIndex]?.pareja2 ?? set.pareja2,
                    };

                    const newState = structuredClone(prev);

                    const partido = newState.competencia.zonas
                      .flatMap((z: any) => z.partidos)
                      .find((partido: any) => partido.id === p.id);

                    if (partido) {
                      partido.resultado = { sets: updatedSets };
                    }

                    return newState;
                  });
                }}
                style={{ width: 60 }}
              />

              <span>-</span>

              <input
                type="text"
                inputMode="numeric"
                value={p.resultado?.sets?.[setIndex]?.pareja2 ?? set.pareja2}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  setTorneoState((prev: any) => {
                    const updatedSets = [...(p.resultado?.sets ?? [])];

                    updatedSets[setIndex] = {
                      pareja1: updatedSets[setIndex]?.pareja1 ?? set.pareja1,
                      pareja2: val,
                    };

                    const newState = structuredClone(prev);

                    const partido = newState.competencia.zonas
                      .flatMap((z: any) => z.partidos)
                      .find((partido: any) => partido.id === p.id);

                    if (partido) {
                      partido.resultado = { sets: updatedSets };
                    }

                    return newState;
                  });
                }}
                style={{ width: 60 }}
              />
            </div>
          ))}

          {/* ACCIONES ORGANIZADOR */}
          <div style={{ marginTop: "6px", display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                const sets = p.resultado?.sets ?? [];

                const updatedTournament = applyMatchResult({
                  torneo: torneoState,
                  match: p,
                  sets,
                });

                setTorneoState(updatedTournament);
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
