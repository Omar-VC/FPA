import type { Partido } from "./competencia.types";
import type { Pareja } from "./torneo.types"; 

export function generarPlayoff(parejas: Pareja[], cantidadSets: 1 | 3 | 5): Partido[] {
  const partidos: Partido[] = [];

  for (let i = 0; i < parejas.length; i += 2) {
    partidos.push({
      id: `${parejas[i].dni1}-${parejas[i+1].dni1}`,
      pareja1: parejas[i],
      pareja2: parejas[i+1],
      estado: "pendiente",
      resultado: {
        sets: Array.from({ length: cantidadSets }).map(() => ({
          pareja1: 0,
          pareja2: 0,
        })),
      },
    });
  }

  return partidos;
}
