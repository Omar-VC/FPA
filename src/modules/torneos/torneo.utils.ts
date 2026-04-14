import type { Torneo } from "./torneo.types";

const llavesValidas = ["A2431S", "B9821X"];

export function validarLlave(codigo: string) {
  return llavesValidas.includes(codigo);
}

export function crearTorneo(
  codigo: string,
  nombre: string,
  fecha: string,
  lugar: string
): Torneo | null {
  if (!validarLlave(codigo)) return null;

  return {
    id: crypto.randomUUID(),
    nombre,
    fecha,
    lugar,

    estado: "abierto",

    categoria: "libre",
    cupoMaximo: 16,
    inscriptos: 0,

    parejas: [],

    puntos: {
      campeon: 200,
      finalista: 150,
      semifinal: 100,
      cuartos: 50,
    },
  };
}

export function generarZonas(parejas: Torneo["parejas"]) {
  const zonas: { nombre: string; parejas: Torneo["parejas"] }[] = [];

  const cantidadZonas = 4;
  const porZona = 5;

  for (let i = 0; i < cantidadZonas; i++) {
    zonas.push({
      nombre: `Zona ${String.fromCharCode(65 + i)}`,
      parejas: parejas.slice(i * porZona, (i + 1) * porZona),
    });
  }

  return zonas;
}