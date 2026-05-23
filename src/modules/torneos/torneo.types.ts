export type EstadoTorneo = "abierto" |"cerrado"| "en juego" | "finalizado";
export type GeneroTorneo =
  | "masculino"
  | "femenino"
  | "mixto";
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

  categoria: "iniciado" | "intermedio" | "avanzado";
  genero: GeneroTorneo;
  cupoMaximo: 16;
  precioInscripcion: number;
  inscriptos: number;

  parejas: Pareja[];

  puntos: PuntosTorneo;
}