type Props = {
  torneo: any;
};

export default function TournamentHeader({ torneo }: Props) {
  return (
    <>
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
                      <span
                        className="inline-block px-3 py-1 text-xs rounded"
                        style={{
                          background: "var(--color-surface-2)",
                        }}
                      >
                        {torneo.tipoFormato === "zonas-playoff"
                          ? "ZONAS + PLAYOFF"
                          : "ELIMINACIÓN DIRECTA"}
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
      
                      <div
                        className="text-xs mt-1 font-semibold"
                        style={{
                          color:
                            torneo.inscriptos >= torneo.cupoMaximo
                              ? "#ff4d4d"
                              : "var(--color-primary)",
                        }}
                      >
                        {torneo.inscriptos >= torneo.cupoMaximo
                          ? "COMPLETO"
                          : `${
                              torneo.cupoMaximo - torneo.inscriptos
                            } lugares disponibles`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  );
}