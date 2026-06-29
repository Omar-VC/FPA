import PartidoItem from "./PartidoItem";

type Props = {
  zona: any;
  organizerMode: boolean;

  buscarJugador: (dni: string) => any;

  resultados: Record<string, any[]>;
  setResultados: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;

  calcularGanador: (p: any) => any;
  avanzarGanador: (torneo: any, partidoId: string, ganador: any) => any;

  torneoState: any;
  setTorneoState: React.Dispatch<React.SetStateAction<any>>;
};

export default function ZonasSection({
  zona,
  organizerMode,
  buscarJugador,
  resultados,
  setResultados,
  calcularGanador,
  avanzarGanador,
  torneoState,
  setTorneoState,
}: Props) {
  return (
    <div
      className="p-3 rounded-md"
      style={{ background: "var(--color-surface-2)" }}
    >
      <h4 className="font-semibold mb-2">{zona.nombre}</h4>

      {/* PAREJAS */}
      {zona.parejas.map((pareja: any, index: number) => {
        const j1 = buscarJugador(pareja.dni1);
        const j2 = buscarJugador(pareja.dni2);

        return (
          <div key={index}>
            {j1?.nombre ?? pareja.dni1} & {j2?.nombre ?? pareja.dni2}
          </div>
        );
      })}

      {/* PARTIDOS */}
      <div style={{ marginTop: "10px" }}>
        <div style={{ fontWeight: "bold", fontSize: "14px" }}>Partidos</div>

        {zona.partidos.map((p: any) => (
          <PartidoItem
            key={p.id}
            partido={p}
            resultados={resultados}
            setResultados={setResultados}
            calcularGanador={calcularGanador}
            avanzarGanador={avanzarGanador}
            buscarJugador={buscarJugador}
            torneoState={torneoState}
            setTorneoState={setTorneoState}
            organizerMode={organizerMode}
          />
        ))}
      </div>
    </div>
  );
}
