import type { Torneo } from "../modules/torneos/torneo.types";
import { jugadoresMock } from "../modules/jugadores/jugador.mock";

/**
 * =========================
 * MOCK DB EN MEMORIA
 * =========================
 */

let torneos: Torneo[] = [];
let players = [...jugadoresMock];

/**
 * =========================
 * JUGADORES
 * =========================
 */

export function getPlayers() {
  return players;
}

export function addPlayer(player: any) {
  players.push({
    ...player,
    id: crypto.randomUUID(),
    puntos: player.puntos ?? 0,
    estado: player.estado ?? "pendiente",
  });
}

/**
 * =========================
 * TORNEOS
 * =========================
 */

export function getTournaments(): Torneo[] {
  return torneos;
}

export function createTournament(
  data: Omit<Torneo, "id" | "estado" | "inscriptos">
): Torneo {
  const newTournament: Torneo = {
    id: crypto.randomUUID(),

    estado: "abierto",
    inscriptos: data.parejas.length,

    nombre: data.nombre,
    fecha: data.fecha,
    lugar: data.lugar,

    categoria: data.categoria ?? "libre",
    cupoMaximo: data.cupoMaximo ?? 999,

    parejas: data.parejas,

    puntos: data.puntos,
  };

  torneos.push(newTournament);
  return newTournament;
}

/**
 * =========================
 * INSCRIPCIÓN A TORNEO
 * =========================
 */

export function addPairToTournament(
  torneoId: string,
  pareja: { dni1: string; dni2: string }
) {
  const torneo = torneos.find((t) => t.id === torneoId);
  if (!torneo) return;

  // evitar duplicados
  const existe = torneo.parejas.some(
    (p) => p.dni1 === pareja.dni1 && p.dni2 === pareja.dni2
  );

  if (existe) return;

  torneo.parejas.push(pareja);
  torneo.inscriptos = torneo.parejas.length;
}

/**
 * =========================
 * OPCIONAL: LIMPIAR TORNEO
 * =========================
 */

export function deleteTournament(id: string) {
  torneos = torneos.filter((t) => t.id !== id);
}