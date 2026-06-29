import type { Pareja } from "./torneo.types";

export interface Partido {
  id: string;

  pareja1: Pareja | null;
  pareja2: Pareja | null;

  resultado?: ResultadoPartido;
  ganador?: "pareja1" | "pareja2";

  estado: EstadoPartido;

  ronda?: number; // 🔹 útil para playoff
}


export type EstadoPartido =
  | "pendiente"
  | "jugado"
  | "finalizado";


export type SetResultado = {
  pareja1: number;
  pareja2: number;
};




export interface ResultadoPartido {
  sets: SetResultado[];
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
