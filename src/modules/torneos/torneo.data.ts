import type { Torneo } from "./torneo.types";

export const torneos: Torneo[] = [
  {
    id: "1",
    nombre: "Torneo Apertura",
    fecha: "12/05/2026",
    lugar: "Añatuya",
    estado: "abierto",

    categoria: "3ra",
    cupoMaximo: 16,
    inscriptos: 2,

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