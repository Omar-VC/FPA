import type { Partido, Fase } from "./competencia.types";
import type { Pareja } from "./torneo.types"; 

export function generarPlayoff(parejas: Pareja[], cantidadSets: 1 | 3 | 5): Fase[] {
  const fases: Fase[] = [];
  const totalRondas = Math.log2(parejas.length); // ej: 8 → 3 rondas, 16 → 4 rondas

  let partidosEnRonda = parejas.length / 2;

  for (let ronda = 1; ronda <= totalRondas; ronda++) {
    const partidos: Partido[] = [];
    for (let i = 0; i < partidosEnRonda; i++) {
      partidos.push({
        id: `R${ronda}-${i}`,
        ronda,
        pareja1: ronda === 1 ? parejas[i * 2] : null,
        pareja2: ronda === 1 ? parejas[i * 2 + 1] : null,
        estado: "pendiente",
        resultado: {
          sets: Array.from({ length: cantidadSets }).map(() => ({
            pareja1: 0,
            pareja2: 0,
          })),
        },
      });
    }
     fases.push({
      ronda,
      partidos,
    });
    
    partidosEnRonda = partidosEnRonda / 2; // la siguiente ronda tiene la mitad de partidos
  }

  return fases;
}

