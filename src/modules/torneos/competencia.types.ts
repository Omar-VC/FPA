import type { Pareja } from "./torneo.types";

// PARTIDO
export interface Partido {
  id: string;

  pareja1: Pareja | null;
  pareja2: Pareja | null;

  resultado?: ResultadoPartido;
  ganador?: "pareja1" | "pareja2";

  estado: EstadoPartido;

  ronda?: number; // 🔹 útil para playoff
}

// ESTADO DEL PARTIDO

export type EstadoPartido =
  | "pendiente"
  | "jugado"
  | "finalizado";

// SET RESULTADO

export type SetResultado = {
  pareja1: number;
  pareja2: number;
};


// RESULTADO PARTIDO

export interface ResultadoPartido {
  sets: SetResultado[];
}



// ZONA

export interface Zona {
  nombre: string;
  parejas: Pareja[];
  partidos: Partido[];
}


//COMPETENCIA
export interface Competencia {
  zonas?: Zona[];

  playoff?: Fase[];

  formato: "eliminacion-directa" | "zonas-playoff";

  cantidadSets: 1 | 3 | 5;
}


//  FASE DE LA COMPTENCIA

export interface Fase {
  ronda: number;

  partidos: Partido[];
}
