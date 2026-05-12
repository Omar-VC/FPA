import {
  createTournament,
  getTournaments,
} from "../../services/api";

import { applyTournamentResults } from "../ranking/ranking.service";
import type { Torneo } from "./torneo.types";

type CreateTournamentInput = {
  codigo: string;
  nombre: string;
  fecha: string;
  lugar: string;
  categoria: "iniciado" | "intermedio" | "avanzado";
  puntos: Torneo["puntos"];
  parejas: { dni1: string; dni2: string }[];
};

// ==========================
// CREAR TORNEO
// ==========================
export function createTournamentService(data: CreateTournamentInput) {
  return createTournament({
    nombre: data.nombre,
    fecha: data.fecha,
    lugar: data.lugar,

    puntos: data.puntos,

    parejas: data.parejas,

    categoria: data.categoria,

    cupoMaximo: 16,
  });
}
// ==========================
// OBTENER TORNEOS
// ==========================
export function getAllTournamentsService() {
  return getTournaments();
}

// ==========================
// CERRAR TORNEO
// ==========================
export function closeTournament(torneoId: string) {
  const torneos = getTournaments();
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  torneo.estado = "en juego";
}

// ==========================
// FINALIZAR + APLICAR PUNTOS
// ==========================
export function approveTournament(torneoId: string) {
  const torneos = getTournaments();
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  torneo.estado = "finalizado";

  applyTournamentResults(torneo);
}

// ==========================
// ELIMINAR TORNEO
// ==========================
export function rejectTournament(torneoId: string) {
  const torneos = getTournaments();
  const index = torneos.findIndex((t) => t.id === torneoId);

  if (index !== -1) {
    torneos.splice(index, 1);
  }
}