import type { Pareja } from "../torneo.types";

export interface Partido {
  id: string;

  pareja1: Pareja;
  pareja2: Pareja;

  resultado?: {
    sets: string;
  };

  estado: "pendiente" | "jugado";
}

export interface Zona {
  nombre: string;
  parejas: Pareja[];
  partidos: Partido[];
}

export interface Competencia {
  zonas?: Zona[];

  playoff?: Partido[];

  formato: "eliminacion-directa" | "zonas-playoff";
}