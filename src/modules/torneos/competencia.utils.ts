import type { Partido } from "./competencia.types";

export function calcularGanador(
  partido: Partido,
): "pareja1" | "pareja2" | null {
  if (!partido.resultado) return null;

  let puntos1 = 0;
  let puntos2 = 0;

  partido.resultado.sets.forEach((set) => {
    if (set.pareja1 > set.pareja2) puntos1++;
    else puntos2++;
  });

  if (puntos1 === puntos2) return null;

  return puntos1 > puntos2 ? "pareja1" : "pareja2";
}