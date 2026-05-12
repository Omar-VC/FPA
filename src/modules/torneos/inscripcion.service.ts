import { getTournaments } from "../../services/api";

import {
  validatePair,
  validateTournamentRules,
} from "./rules";

export function inscribirPareja(
  torneoId: string,
  dni1: string,
  dni2: string
) {
  const torneos = getTournaments();

  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) {
    return {
      ok: false,
      msg: "Torneo no encontrado",
    };
  }

  // reglas del torneo
  const tournamentValidation =
    validateTournamentRules(torneo);

  if (!tournamentValidation.valid) {
    return {
      ok: false,
      msg: tournamentValidation.reason,
    };
  }

  // reglas de pareja
  const pairValidation = validatePair(
    torneo,
    dni1,
    dni2
  );

  if (!pairValidation.valid) {
    return {
      ok: false,
      msg: pairValidation.reason,
    };
  }

  // inscripción válida
  torneo.parejas.push({
    dni1,
    dni2,
  });

  return {
    ok: true,
    msg: "Pareja inscripta correctamente",
  };
}