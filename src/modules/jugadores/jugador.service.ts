import { getPlayers } from "../../services/api";
import type { Jugador } from "./jugador.types";

export function getAllPlayers(): Jugador[] {
  return getPlayers();
}

export function findPlayerByDni(dni: string) {
  return getPlayers().find((j) => j.dni === dni);
}