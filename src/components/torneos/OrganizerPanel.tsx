type Props = {
  torneo: any;

  dni1: string;
  dni2: string;
  setDni1: React.Dispatch<React.SetStateAction<string>>;
  setDni2: React.Dispatch<React.SetStateAction<string>>;

  handleAgregarPareja: () => void;
  setOrganizerMode: React.Dispatch<React.SetStateAction<boolean>>;

  onChangeEstado: (
    estado: "abierto" | "cerrado" | "en juego" | "finalizado"
  ) => void;

  updateTournamentStatus: (
    id: string,
    status: "abierto" | "cerrado" | "en juego" | "finalizado"
  ) => void;

  handleGenerarCompetencia: () => void;
};

export default function OrganizerPanel({
  torneo,
  dni1,
  dni2,
  setDni1,
  setDni2,
  handleAgregarPareja,
  setOrganizerMode,
  updateTournamentStatus,
  handleGenerarCompetencia,
  onChangeEstado,
}: Props){
  if (!torneo) return null;

  return (
    <>
     <div className="card flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="card-title">Panel organizador</h3>

            <button
              onClick={() => {
                setOrganizerMode(false);
                localStorage.removeItem("organizerMode");
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
                onChangeEstado("abierto");
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
                onChangeEstado("cerrado");
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
                onChangeEstado("en juego");
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
                onChangeEstado("finalizado");
              }}
              className="px-3 py-2 rounded-md text-sm font-semibold"
              style={{
                background: "#ff4d4d",
                color: "#fff",
              }}
            >
              Finalizar
            </button>

            <button
              onClick={handleGenerarCompetencia}
              className="px-3 py-2 rounded-md text-sm font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "#000",
              }}
            >
              Generar competencia
            </button>
          </div>
        </div>
    </>
  );
}
