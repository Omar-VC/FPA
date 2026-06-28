type Props = {
  rankingParcial: any[];
};

export default function TournamentRanking({ rankingParcial }: Props) {
  return (
    <div className="card">
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
    </div>
  );
}