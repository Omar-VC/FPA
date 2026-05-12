import type { Torneo } from "../torneo.types";

export function validateTournamentRules(torneo: Torneo) {
  if (torneo.estado !== "abierto") {
    return {
      valid: false,
      reason: "El torneo no acepta inscripciones",
    };
  }

  if (torneo.parejas.length >= torneo.cupoMaximo) {
    return {
      valid: false,
      reason: "Cupo completo",
    };
  }

  return {
    valid: true,
  };
}