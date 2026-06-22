import type { Competencia } from "./competencia.types";

export type EstadoTorneo = "abierto" | "cerrado" | "en juego" | "finalizado";
export type GeneroTorneo = "masculino" | "femenino" | "mixto";
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

  tipoFormato: "eliminacion-directa" | "zonas-playoff";

  tamanoZona: 3 | 4 | "automatico";

  clasificanPorZona: number;

  cupoMaximo: number;
  precioInscripcion: number;
  telefonoOrganizador: string;
  inscriptos: number;

  parejas: Pareja[];

  puntos: PuntosTorneo;

  competencia?: Competencia;
  formatoPartido: "1-set" | "3-sets";
}
