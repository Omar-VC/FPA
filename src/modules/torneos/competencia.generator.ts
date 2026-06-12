import type { Pareja } from "../torneo.types";

import { generarZonas } from "./zonas.generator";
import { generarPlayoff } from "./playoff.generator";

export function generarCompetencia(input: {
  parejas: Pareja[];
  tipoFormato: "eliminacion-directa" | "zonas-playoff";
  tamanoZona: 3 | 4 | "automatico";
  clasificanPorZona: number;
}) {
  if (input.tipoFormato === "zonas-playoff") {
    const zonas = generarZonas(
      input.parejas,
      input.tamanoZona,
      input.clasificanPorZona,
    );

    return {
      zonas,
      playoff: [],
    };
  }

  return {
    zonas: [],
    playoff: [],
  };
}