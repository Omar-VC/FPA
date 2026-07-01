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

  let partidoCerrado: Partido | undefined;
  let rondaActual = 0;
  let indiceActual = 0;

  // Buscar el partido dentro de las fases
  for (const fase of torneo.competencia.playoff) {
    const indice = fase.partidos.findIndex((p) => p.id === partidoId);

    if (indice !== -1) {
      partidoCerrado = fase.partidos[indice];
      rondaActual = fase.ronda;
      indiceActual = indice;
      break;
    }
  }

  if (!partidoCerrado) return torneo;

  const parejaGanadora =
    ganador === "pareja1"
      ? partidoCerrado.pareja1
      : partidoCerrado.pareja2;

  if (!parejaGanadora) return torneo;

  const rondaSiguiente = rondaActual + 1;

  const indiceSiguiente = Math.floor(indiceActual / 2);

  const updatedPlayoff = torneo.competencia.playoff.map((fase) => {
    if (fase.ronda !== rondaSiguiente) return fase;

    return {
      ...fase,
      partidos: fase.partidos.map((partido, index) => {
        if (index !== indiceSiguiente) return partido;

        return {
          ...partido,
          pareja1: indiceActual % 2 === 0 ? parejaGanadora : partido.pareja1,
          pareja2: indiceActual % 2 === 1 ? parejaGanadora : partido.pareja2,
        };
      }),
    };
  });

  return {
    ...torneo,
    competencia: {
      ...torneo.competencia,
      playoff: updatedPlayoff,
    },
  };
}
