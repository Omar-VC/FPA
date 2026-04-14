import { torneos } from "./torneo.data";
import type { Torneo } from "./torneo.types";

export function agregarTorneo(torneo: Torneo) {
  torneos.push(torneo);
}

export function obtenerTorneo(id: string) {
  return torneos.find((t) => t.id === id);
}