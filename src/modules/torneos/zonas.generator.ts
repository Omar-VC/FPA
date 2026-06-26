import type { Pareja } from "./torneo.types";
import type { Partido, Zona } from "./competencia.types";

export function generarZonas(
  parejas: Pareja[],
  tamanoZona: 3 | 4 | "automatico",
  _clasifican: number,
  cantidadSets: 1 | 3 | 5,
): Zona[] {
  const parejasMezcladas = [...parejas].sort(() => Math.random() - 0.5);

  const size =
    tamanoZona === "automatico" ? (parejas.length >= 16 ? 4 : 3) : tamanoZona;

  const cantidadZonas = Math.ceil(parejasMezcladas.length / size);

  const zonas: Zona[] = [];

  for (let i = 0; i < cantidadZonas; i++) {
    zonas.push({
      nombre: `Zona ${String.fromCharCode(65 + i)}`,
      parejas: [],
      partidos: [],
    });
  }

  parejasMezcladas.forEach((pareja, index) => {
    zonas[index % cantidadZonas].parejas.push(pareja);
  });

  // 🔥 generar partidos por zona
  zonas.forEach((zona) => {
    zona.partidos = generarPartidosZona(zona.parejas, cantidadSets);


  });

  return zonas;
}

function generarPartidosZona(parejas: Pareja[], cantidadSets: 1 | 3 | 5): Partido[] {
  const partidos: Partido[] = [];

  for (let i = 0; i < parejas.length; i++) {
    for (let j = i + 1; j < parejas.length; j++) {
      partidos.push({
        id: `${parejas[i].dni1}-${parejas[j].dni1}`,
        pareja1: parejas[i],
        pareja2: parejas[j],
        estado: "pendiente",
        resultado: {
          sets: Array.from({ length: cantidadSets }).map(() => ({
            pareja1: 0,
            pareja2: 0,
          })),
        },
      });
    }
  }

  return partidos;
}


