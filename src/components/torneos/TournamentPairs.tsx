type Props = {
  torneo: any;
  organizerMode: boolean;
  buscarJugador: (dni: string) => any;
  removePairFromTournament: (id: string, dni1: string, dni2: string) => void;
  refreshTournament: () => void;
};

export default function TournamentPairs({
  torneo,
  organizerMode,
  buscarJugador,
  removePairFromTournament,
  refreshTournament,
}: Props) {
  return (
    <div className="card">
      <h3 className="card-title">Parejas inscriptas</h3>

      {torneo.parejas.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>
          Sin inscripciones.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {torneo.parejas.map((p: any, idx: number) => {
            const j1 = buscarJugador(p.dni1);
            const j2 = buscarJugador(p.dni2);

            return (
              <div
                key={`${p.dni1}-${p.dni2}`}
                className="px-3 py-2 rounded-md flex justify-between items-center"
                style={{ background: "var(--color-surface-2)" }}
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
                      removePairFromTournament(
                        torneo.id,
                        p.dni1,
                        p.dni2,
                      );

                      refreshTournament();
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
  );
}