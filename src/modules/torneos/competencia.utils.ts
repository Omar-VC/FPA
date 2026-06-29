import type { Partido } from "./competencia.types";
import type { Torneo } from "./torneo.types";

export function calcularGanador(
  partido: Partido,
): "pareja1" | "pareja2" | null {
  if (!partido.resultado) return null;

  let puntos1 = 0;
  let puntos2 = 0;

  for (const set of partido.resultado.sets) {
    if (set.pareja1 > set.pareja2) puntos1++;
    else puntos2++;
  }

  if (puntos1 === puntos2) return null;

  return puntos1 > puntos2 ? "pareja1" : "pareja2";
}

export function avanzarGanador(
  torneo: Torneo,
  partidoId: string,
  ganador: "pareja1" | "pareja2",
): Torneo {
  if (!torneo.competencia?.playoff) return torneo;

  const partidoCerrado = torneo.competencia.playoff.find(
    (p) => p.id === partidoId,
  );
  if (!partidoCerrado) return torneo;

  // Obtener la pareja ganadora
  const parejaGanadora =
    ganador === "pareja1" ? partidoCerrado.pareja1 : partidoCerrado.pareja2;
    if (!parejaGanadora) return torneo;

  // Buscar partido de la siguiente ronda
  const siguientePartido = torneo.competencia.playoff.find(
    (p) =>
      p.ronda === (partidoCerrado.ronda ?? 0) + 1 && (!p.pareja1 || !p.pareja2),
  );

  if (!siguientePartido) return torneo;

  // Insertar ganador en el slot vacío
  const updatedPlayoff = torneo.competencia.playoff.map((p) =>
    p.id === siguientePartido.id
      ? {
          ...p,
          pareja1: p.pareja1 ?? parejaGanadora,
          pareja2: p.pareja1 ? (p.pareja2 ?? parejaGanadora) : p.pareja2,
        }
      : p,
  );

  return {
    ...torneo,
    competencia: {
      ...torneo.competencia,
      playoff: updatedPlayoff,
    },
  };
}
