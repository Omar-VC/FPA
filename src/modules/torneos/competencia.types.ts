import type { Pareja } from "./torneo.types";

export interface Partido {
  id: string;

  pareja1: Pareja;
  pareja2: Pareja;

  resultado?: ResultadoPartido;
  ganador?: "pareja1" | "pareja2";

  estado: "pendiente" | "jugado";
}

export interface ResultadoPartido {
  sets: {
    pareja1: number;
    pareja2: number;
  }[];
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

  formatoPartido?: "1-set" | "3-sets";
}
