export interface Jugador {
  dni: string;
  nombre: string;
  apodo?: string;
  ciudad: string;
  puntos: number;
}

export const jugadoresFederados: Jugador[] = [
  { dni: "1001", nombre: "Juan Pérez", ciudad: "Añatuya", puntos: 1200 },
  { dni: "1002", nombre: "Carlos Gómez", ciudad: "Santiago", puntos: 980 },
  { dni: "1003", nombre: "Luis Díaz", ciudad: "La Banda", puntos: 1100 },
  // ... más jugadores mock
];
