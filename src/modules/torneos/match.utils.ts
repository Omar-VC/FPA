import type { Torneo } from "./torneo.types";
import type {
  Partido,
  SetResultado,
} from "./competencia.types";

export function updateMatchResult(
  match: Partido,
  sets: SetResultado[],
): Partido {
  return {
    ...match,
    resultado: { sets },
    estado: "jugado",
  };
}

export function resolveMatchWinner(
  match: Partido,
  calcularGanador: (match: Partido) => "pareja1" | "pareja2" | null,
): "pareja1" | "pareja2" | null {
  return calcularGanador(match);
}

export function updateMatchInTournament(
  torneo: Torneo,
  matchId: string,
  updatedMatch: Partido,
): Torneo {
  const competencia = torneo.competencia;

  if (!competencia) return torneo;

  return {
    ...torneo,
    competencia: {
      ...competencia,

      zonas: competencia.zonas?.map((zona) => ({
        ...zona,
        partidos: zona.partidos.map((p) =>
          String(p.id) === String(matchId) ? updatedMatch : p
        ),
      })),

      playoff: competencia.playoff?.map((fase) => ({
        ...fase,
        partidos: fase.partidos.map((p) =>
          String(p.id) === String(matchId) ? updatedMatch : p
        ),
      })),
    },
  };
}