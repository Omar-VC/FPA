import type { Pareja } from "./torneo.types";

export interface Partido {
  id: string;

  pareja1: Pareja | null;
  pareja2: Pareja | null;

  resultado?: ResultadoPartido;
  ganador?: "pareja1" | "pareja2";

  estado: "pendiente" | "jugado" | "finalizado";

  ronda?: number; // 🔹 útil para playoff
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

  cantidadSets: 1 | 3 | 5;
}
