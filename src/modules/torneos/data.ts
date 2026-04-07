// data.ts

export interface Torneo {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  estado: "abierto" | "pendiente" | "oficializado" | "rechazado";
  llave: string; // código único que habilita el torneo
  parejas: { dni1: string; dni2: string }[];
  puntos: {
    campeon: number;
    finalista: number;
    semifinal: number;
    cuartos: number;
  };
}

// Inicialmente vacío, se irán agregando torneos creados con crearTorneo()
export const torneos: Torneo[] = [];

