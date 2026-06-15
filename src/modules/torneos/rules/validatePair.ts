import { getAllPlayers } from "../../jugadores/jugador.service";

import type { Torneo } from "../torneo.types";

import { canPlayerJoinTournament } from "./canPlayerJoinTournament";

const nivelOrden = {
  iniciado: 1,
  intermedio: 2,
  avanzado: 3,
};

export function validatePair(torneo: Torneo, dni1: string, dni2: string) {
  // mismo jugador
  if (dni1 === dni2) {
    return {
      valid: false,
      reason: "No puedes inscribirte contigo mismo",
    };
  }

  // validar jugadores activos
  const player1Validation = canPlayerJoinTournament(dni1);

  if (!player1Validation.valid) {
    return player1Validation;
  }

  const player2Validation = canPlayerJoinTournament(dni2);

  if (!player2Validation.valid) {
    return player2Validation;
  }

  const players = getAllPlayers();

  const jugador1 = players.find((j) => j.dni === dni1);

  const jugador2 = players.find((j) => j.dni === dni2);

  if (!jugador1 || !jugador2) {
    return {
      valid: false,
      reason: "Jugador no encontrado",
    };
  }

  // validar género del torneo

  if (torneo.genero === "masculino") {
    if (jugador1.genero !== "masculino" || jugador2.genero !== "masculino") {
      return {
        valid: false,
        reason: "El torneo es solo masculino",
      };
    }
  }

  if (torneo.genero === "femenino") {
    if (jugador1.genero !== "femenino" || jugador2.genero !== "femenino") {
      return {
        valid: false,
        reason: "El torneo es solo femenino",
      };
    }
  }

  if (torneo.genero === "mixto") {
    const mezclaCorrecta =
      (jugador1.genero === "masculino" && jugador2.genero === "femenino") ||
      (jugador1.genero === "femenino" && jugador2.genero === "masculino");

    if (!mezclaCorrecta) {
      return {
        valid: false,
        reason: "El torneo mixto requiere un hombre y una mujer",
      };
    }
  }

  // validar categoría
  const categoriaTorneo = nivelOrden[torneo.categoria];

  const nivelJugador1 = nivelOrden[jugador1.nivel];

  const nivelJugador2 = nivelOrden[jugador2.nivel];

  if (nivelJugador1 > categoriaTorneo) {
    return {
      valid: false,
      reason: `${jugador1.nombre} excede la categoría`,
    };
  }

  if (nivelJugador2 > categoriaTorneo) {
    return {
      valid: false,
      reason: `${jugador2.nombre} excede la categoría`,
    };
  }

  // pareja duplicada
  const alreadyExists = torneo.parejas.some(
    (p) =>
      (p.dni1 === dni1 && p.dni2 === dni2) ||
      (p.dni1 === dni2 && p.dni2 === dni1),
  );

  if (alreadyExists) {
    return {
      valid: false,
      reason: "La pareja ya está inscripta",
    };
  }

  //jugador inscripto

  const jugadorYaInscripto = torneo.parejas.some(
    (p) =>
      p.dni1 === dni1 || p.dni2 === dni1 || p.dni1 === dni2 || p.dni2 === dni2,
  );

  if (jugadorYaInscripto) {
    return {
      valid: false,
      reason: "Uno de los jugadores ya está inscripto en el torneo",
    };
  }

  // torneo lleno
  if (torneo.inscriptos >= torneo.cupoMaximo) {
    return {
      valid: false,
      reason: "El torneo ya alcanzó el cupo máximo",
    };
  }

  return {
    valid: true,
  };
}
