import type { Torneo } from "../torneos/torneo.types";
import { getPlayers } from "../../services/api";

export function applyTournamentResults(torneo: Torneo) {
  const jugadores = getPlayers();

  // ejemplo básico: sumar puntos según posición simulada
  torneo.parejas.forEach((p) => {
    const j1 = jugadores.find((j) => j.dni === p.dni1);
    const j2 = jugadores.find((j) => j.dni === p.dni2);

    if (j1) j1.puntos += 10;
    if (j2) j2.puntos += 10;
  });
}