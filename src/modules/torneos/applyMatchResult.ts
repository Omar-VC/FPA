import type { Torneo } from "./torneo.types";
import type {
  Partido,
  SetResultado,
} from "./competencia.types";

import {
  updateMatchInTournament,
} from "./match.utils";

import {
  calcularGanador,
  avanzarGanador,
} from "./competencia.utils";

//AQUI ARRIBA VAN LOS IMPORTS



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

  // 1. actualizar partido con resultado
  const updatedMatch: Partido = {
    ...match,
    resultado: { sets },
    estado: "jugado",
  };
  
  // 2. calcular ganador
  const ganador = calcularGanador(updatedMatch);

  const matchWithWinner: Partido = {
    ...updatedMatch,
    ganador: ganador ?? undefined,
    estado: ganador ? "finalizado" : "jugado",
  };


   // 3. actualizar torneo con partido
  let updatedTournament = updateMatchInTournament(
    torneo,
    match.id,
    matchWithWinner,
  );

  // 4. avanzar si corresponde
  if (ganador && updatedTournament.competencia) {
    updatedTournament = avanzarGanador(
      updatedTournament,
      match.id,
      ganador,
    );
  }

  return updatedTournament;
}