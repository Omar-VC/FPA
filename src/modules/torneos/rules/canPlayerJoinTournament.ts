import { getAllPlayers } from "../../jugadores/jugador.service";
export function canPlayerJoinTournament(dni: string) {
const players = getAllPlayers();

  const jugador = players.find((j) => j.dni === dni);

  if (!jugador) {
    return {
      valid: false,
      reason: "Jugador no encontrado",
    };
  }

  if (jugador.estado !== "activo") {
    return {
      valid: false,
      reason: "Jugador no activo",
    };
  }

  return {
    valid: true,
  };
}