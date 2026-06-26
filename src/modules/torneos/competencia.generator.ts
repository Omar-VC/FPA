import type { Pareja } from "./torneo.types";

import { generarZonas } from "./zonas.generator";
import { generarPlayoff } from "./playoff.generator";

export function generarCompetencia(input: {
  parejas: Pareja[];
  tipoFormato: "eliminacion-directa" | "zonas-playoff";
  tamanoZona: 3 | 4 | "automatico";
  clasificanPorZona: number;
  cantidadSets: 1 | 3 | 5; 
}) {
  if (input.tipoFormato === "zonas-playoff") {
    const zonas = generarZonas(
      input.parejas,
      input.tamanoZona,
      input.clasificanPorZona,
      input.cantidadSets
    );

    return {
      zonas,
      playoff: [],
      formato: input.tipoFormato,
      cantidadSets: input.cantidadSets,
    };
  }

  if (input.tipoFormato === "eliminacion-directa") {
    const playoff = generarPlayoff(input.parejas, input.cantidadSets);

    return {
      zonas: [],
      playoff,
      formato: input.tipoFormato,
      cantidadSets: input.cantidadSets,
    };
  }

  // fallback por si acaso
  return {
    zonas: [],
    playoff: [],
    formato: input.tipoFormato,
    cantidadSets: input.cantidadSets,
  };
}


