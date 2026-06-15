import type { Pareja } from "./torneo.types";
import type { Zona } from "./competencia.types";

export function generarZonas(
  parejas: Pareja[],
  tamanoZona: 3 | 4 | "automatico",
  _clasifican: number,
): Zona[] {
  const parejasMezcladas = [...parejas].sort(
    () => Math.random() - 0.5,
  );

  const size =
    tamanoZona === "automatico"
      ? parejas.length >= 16
        ? 4
        : 3
      : tamanoZona;

  const cantidadZonas = Math.ceil(
    parejasMezcladas.length / size,
  );

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

  return zonas;
}