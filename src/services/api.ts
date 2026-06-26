import type { Torneo } from "../modules/torneos/torneo.types";

import { jugadoresMock } from "../modules/jugadores/jugador.mock";
import type { Jugador } from "../modules/jugadores/jugador.types";

import type { Competencia } from "../modules/torneos/competencia.types";
import { generarCompetencia } from "../modules/torneos/competencia.generator";

/**
 * =========================
 * LOCAL STORAGE KEYS
 * =========================
 */

const PLAYERS_KEY = "fpa_players";
const TOURNAMENTS_KEY = "fpa_tournaments";

/**
 * =========================
 * HELPERS
 * =========================
 */

function loadPlayers(): Jugador[] {
  const data = localStorage.getItem(PLAYERS_KEY);

  if (data) {
    return JSON.parse(data);
  }

  localStorage.setItem(PLAYERS_KEY, JSON.stringify(jugadoresMock));

  return [...jugadoresMock];
}

function loadTournaments(): Torneo[] {
  const data = localStorage.getItem(TOURNAMENTS_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

function savePlayers(players: Jugador[]) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

function saveTournaments(torneos: Torneo[]) {
  localStorage.setItem(TOURNAMENTS_KEY, JSON.stringify(torneos));
}

/**
 * =========================
 * MOCK DB
 * =========================
 */

let players: Jugador[] = loadPlayers();

let torneos: Torneo[] = loadTournaments();

/**
 * =========================
 * JUGADORES
 * =========================
 */

export function getPlayers() {
  return players;
}

export function addPlayer(player: Partial<Jugador>) {
  players.push({
    ...player,
    id: crypto.randomUUID(),
    puntos: player.puntos ?? 0,
    estado: player.estado ?? "pendiente",
  } as Jugador);

  savePlayers(players);
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
  data: Omit<Torneo, "id" | "estado" | "inscriptos">,
): Torneo {
  const newTournament: Torneo = {
    id: crypto.randomUUID(),

    estado: "abierto",

    inscriptos: data.parejas.length,

    nombre: data.nombre,
    fecha: data.fecha,
    lugar: data.lugar,
    categoria: data.categoria,
    genero: data.genero,
    tipoFormato: data.tipoFormato,
    tamanoZona: data.tamanoZona,
    clasificanPorZona: data.clasificanPorZona,
    cupoMaximo: data.cupoMaximo,
    precioInscripcion: data.precioInscripcion,
    telefonoOrganizador: data.telefonoOrganizador,
    parejas: data.parejas,
    puntos: data.puntos,
    cantidadSets: data.cantidadSets,

    // 🔥 acá generás la competencia
    competencia: generarCompetencia({
      parejas: data.parejas,
      tipoFormato: data.tipoFormato,
      tamanoZona: data.tamanoZona,
      clasificanPorZona: data.clasificanPorZona,
      cantidadSets: data.cantidadSets,
    }),
  };

  torneos.push(newTournament);
  saveTournaments(torneos);

  return newTournament;
}

/**
 * =========================
 * INSCRIPCIÓN
 * =========================
 */

export function addPairToTournament(
  torneoId: string,
  pareja: {
    dni1: string;
    dni2: string;
  },
) {
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  const existe = torneo.parejas.some(
    (p) =>
      (p.dni1 === pareja.dni1 && p.dni2 === pareja.dni2) ||
      (p.dni1 === pareja.dni2 && p.dni2 === pareja.dni1),
  );

  if (existe) return;

  torneo.parejas.push(pareja);

  torneo.inscriptos = torneo.parejas.length;

  if (torneo.inscriptos >= torneo.cupoMaximo) {
    torneo.estado = "cerrado";
  }

  if (torneo.inscriptos >= torneo.cupoMaximo) {
    torneo.estado = "cerrado";
  }

  saveTournaments(torneos);
}

export function removePairFromTournament(
  torneoId: string,
  dni1: string,
  dni2: string,
) {
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  torneo.parejas = torneo.parejas.filter(
    (p) =>
      !(
        (p.dni1 === dni1 && p.dni2 === dni2) ||
        (p.dni1 === dni2 && p.dni2 === dni1)
      ),
  );

  torneo.inscriptos = torneo.parejas.length;

  if (torneo.estado === "cerrado") {
    torneo.estado = "abierto";
  }

  saveTournaments(torneos);
}

export function updateTournamentStatus(
  torneoId: string,
  estado: "abierto" | "cerrado" | "en juego" | "finalizado",
) {
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  torneo.estado = estado;

  saveTournaments(torneos);
}

/**
 * =========================
 * ELIMINAR TORNEO
 * =========================
 */

export function deleteTournament(id: string) {
  torneos = torneos.filter((t) => t.id !== id);

  saveTournaments(torneos);
}

/** SAVE TOURNAMENTS COMPETITION */

export function saveTournamentCompetition(
  torneoId: string,
  competencia: Competencia,
) {
  const torneo = torneos.find((t) => t.id === torneoId);

  if (!torneo) return;

  torneo.competencia = competencia;

  saveTournaments(torneos);
}
