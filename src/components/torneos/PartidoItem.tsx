type Props = {
  partido: any;
  resultados: any;
  setResultados: any;
  calcularGanador: any;
  avanzarGanador: any;
  buscarJugador: (dni: string) => any;
  torneoState: any;
  setTorneoState: any;
  organizerMode: boolean;
};

export default function PartidoItem({
  partido,
  resultados,
  setResultados,
  calcularGanador,
  avanzarGanador,
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

  const buildMatchResult = (partido: any) => {
    const sets = resultados[partido.id] ?? partido.resultado?.sets ?? [];
    const ganador = calcularGanador({ ...partido, resultado: { sets } });
    return { sets, ganador };
  };

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
                value={resultados[p.id]?.[setIndex]?.pareja1 ?? set.pareja1}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  setResultados((prev: any) => {
                    const prevSets = prev[p.id] ?? [
                      ...(p.resultado?.sets ?? []),
                    ];
                    const updated = [...prevSets];

                    updated[setIndex] = {
                      pareja1: val,
                      pareja2: updated[setIndex]?.pareja2 ?? set.pareja2,
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
                value={resultados[p.id]?.[setIndex]?.pareja2 ?? set.pareja2}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  setResultados((prev: any) => {
                    const prevSets = prev[p.id] ?? [
                      ...(p.resultado?.sets ?? []),
                    ];
                    const updated = [...prevSets];

                    updated[setIndex] = {
                      pareja1: updated[setIndex]?.pareja1 ?? set.pareja1,
                      pareja2: val,
                    };

                    return { ...prev, [p.id]: updated };
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
                const { sets } = buildMatchResult(p);

                setTorneoState((prev: any) => {
                  if (!prev?.competencia) return prev;

                  return {
                    ...prev,
                    competencia: {
                      ...prev.competencia,
                      zonas: prev.competencia.zonas.map((z: any) => ({
                        ...z,
                        partidos: z.partidos.map((partido: any) =>
                          partido.id === p.id
                            ? {
                                ...partido,
                                resultado: { sets },
                                estado: "jugado",
                              }
                            : partido,
                        ),
                      })),
                    },
                  };
                });
              }}
            >
              Guardar
            </button>

            <button
              onClick={() => {
                const { ganador } = buildMatchResult(p);

                if (!ganador) return;

                const updated = avanzarGanador(torneoState, p.id, ganador);

                setTorneoState((prev: any) => {
                  if (!prev?.competencia) return prev;

                  return {
                    ...updated,
                    competencia: {
                      ...updated.competencia,
                      zonas: updated.competencia.zonas.map((z: any) => ({
                        ...z,
                        partidos: z.partidos.map((partido: any) =>
                          partido.id === p.id
                            ? { ...partido, estado: "finalizado" }
                            : partido,
                        ),
                      })),
                    },
                  };
                });
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
