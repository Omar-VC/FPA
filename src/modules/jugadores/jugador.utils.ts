import { findPlayerByDni } from "./jugador.service";

export function getPlayerNameByDni(
  dni: string
) {
  const jugador = findPlayerByDni(dni);

  if (!jugador) {
    return "Jugador desconocido";
  }

  return jugador.nombre;
}