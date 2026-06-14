import type { Competencia } from "../../modules/torneos/competencia/competencia.types";

type Props = {
  competencia?: Competencia;
  onGenerar?: () => void;
  isOrganizer: boolean;
};

export default function CompetenciaSection({
  competencia,
  onGenerar,
  isOrganizer,
}: Props) {
  return (
    <div className="card">
      <h3 className="card-title">Competencia</h3>

      {/* ESTADO: SIN COMPETENCIA */}
      {!competencia && (
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">
            No se ha generado la competencia aún.
          </p>

          {isOrganizer && (
            <button
              onClick={onGenerar}
              className="px-4 py-2 rounded-md font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "#000",
              }}
            >
              Generar torneo
            </button>
          )}
        </div>
      )}

      {/* ESTADO: CON COMPETENCIA */}
      {competencia && (
        <div className="flex flex-col gap-6 mt-4">
          {/* HEADER RESUMEN */}
          <div className="text-sm opacity-70 flex flex-col gap-1">
            <span>Formato: {competencia.formato}</span>
          </div>

          {/* ZONAS */}
          {competencia.zonas?.length ? (
            <div className="flex flex-col gap-3">
              {competencia.zonas.map((zona) => (
                <div
                  key={zona.nombre}
                  className="p-3 rounded-md"
                  style={{ background: "var(--color-surface-2)" }}
                >
                  <div className="font-semibold mb-2">
                    {zona.nombre}
                  </div>

                  <div className="flex flex-col gap-1 text-sm">
                    {zona.parejas.map((p, i) => (
                      <div key={i}>
                        {p.dni1} & {p.dni2}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-70">
              Zonas aún no generadas
            </p>
          )}

          {/* PLAYOFF (PLACEHOLDER) */}
          {competencia.playoff && (
            <div className="mt-4">
              <h4 className="font-semibold">Playoff</h4>

              <p className="text-sm opacity-70">
                Próximamente eliminación directa
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}