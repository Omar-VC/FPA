// modules/torneos/data.ts

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

  precioInscripcion?: number;

  // 🔥 CLAVE (faltaban)
  parejas: Pareja[];
  puntos: PuntosTorneo;
}

export const torneos: Torneo[] = [
  {
    id: "1",
    nombre: "Torneo Apertura",
    fecha: "12/05/2026",
    lugar: "Añatuya",
    estado: "abierto",
    categoria: "3ra",
    cupoMaximo: 16,
    inscriptos: 4,
    precioInscripcion: 5000,

    parejas: [
      { dni1: "111", dni2: "222" },
      { dni1: "333", dni2: "444" },
    ],

    puntos: {
      campeon: 100,
      finalista: 60,
      semifinal: 30,
      cuartos: 10,
    },
  },
];