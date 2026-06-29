import type { Torneo } from "./torneo.types";
import type {
  Partido,
  SetResultado,
} from "./competencia.types";

import {
  updateMatchResult,
  updateMatchInTournament,
} from "./match.utils";

import {
  calcularGanador,
  avanzarGanador,
} from "./competencia.utils";

type ApplyMatchResultParams = {
  torneo: Torneo;
  match: Partido;
  sets: SetResultado[];
};

export function applyMatchResult({
  torneo,
  match,
  sets,
}: ApplyMatchResultParams): Torneo {
  const updatedMatch = updateMatchResult(match, sets);

  const ganador = calcularGanador({
    ...match,
    resultado: { sets },
  });

  const matchWithWinner: Partido = {
    ...updatedMatch,
    ganador: ganador ?? undefined,
  };

  let updatedTournament = updateMatchInTournament(
    torneo,
    match.id,
    matchWithWinner,
  );

  if (ganador && torneo.competencia) {
    updatedTournament = avanzarGanador(
      updatedTournament,
      match.id,
      ganador,
    );
  }

  return updatedTournament;
}