export type EstadoTorneo = "abierto" | "en juego" | "finalizado";

export interface Pareja {
  dni1: string;
  dni2: string;
}

export interface PuntosTorneo {
  campeon: number;
  finalista: number;
  semifinal: number;
  cuartos: number;
}

export interface Torneo {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;

  estado: EstadoTorneo;

  categoria: string;
  cupoMaximo: number;
  inscriptos: number;

  parejas: Pareja[];

  puntos: PuntosTorneo;
}