import type { Partido } from "./competencia.types";
import type { Pareja } from "./torneo.types"; 

export function generarPlayoff(parejas: Pareja[], cantidadSets: 1 | 3 | 5): Partido[] {
  const partidos: Partido[] = [];

  // 🔹 Ronda 1: Cuartos (si hay 8 parejas)
  for (let i = 0; i < parejas.length; i += 2) {
    partidos.push({
      id: `R1-${i / 2}`,
      ronda: 1,
      pareja1: parejas[i],
      pareja2: parejas[i + 1],
      estado: "pendiente",
      resultado: {
        sets: Array.from({ length: cantidadSets }).map(() => ({
          pareja1: 0,
          pareja2: 0,
        })),
      },
    });
  }

  // 🔹 Ronda 2: Semifinales (2 partidos, sin parejas aún)
  partidos.push(
    {
      id: "R2-0",
      ronda: 2,
      pareja1: null as any,
      pareja2: null as any,
      estado: "pendiente",
      resultado: {
        sets: Array.from({ length: cantidadSets }).map(() => ({
          pareja1: 0,
          pareja2: 0,
        })),
      },
    },
    {
      id: "R2-1",
      ronda: 2,
      pareja1: null as any,
      pareja2: null as any,
      estado: "pendiente",
      resultado: {
        sets: Array.from({ length: cantidadSets }).map(() => ({
          pareja1: 0,
          pareja2: 0,
        })),
      },
    }
  );

  // 🔹 Ronda 3: Final (1 partido, sin parejas aún)
  partidos.push({
    id: "R3-0",
    ronda: 3,
    pareja1: null as any,
    pareja2: null as any,
    estado: "pendiente",
    resultado: {
      sets: Array.from({ length: cantidadSets }).map(() => ({
        pareja1: 0,
        pareja2: 0,
      })),
    },
  });

  return partidos;
}

