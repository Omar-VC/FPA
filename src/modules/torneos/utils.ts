// utils.ts

// Mock de llaves válidas
const llavesValidas: string[] = ["A2431S", "B9821X"];

export function validarLlave(codigo: string) {
  return llavesValidas.includes(codigo);
}

export function crearTorneo(
  codigo: string,
  nombre: string,
  fecha: string,
  lugar: string
) {
  if (!validarLlave(codigo)) return null;

  return {
    id: `torneo-${Date.now()}`,
    nombre,
    fecha,
    lugar,
    estado: "abierto" as "abierto", // 👈 literal para TypeScript
    llave: codigo,
    parejas: [],
    puntos: { campeon: 200, finalista: 150, semifinal: 100, cuartos: 50 },
  };
}

// Función para generar zonas (si la necesitás en detalle de torneo)
export function generarZonas(parejas: { dni1: string; dni2: string }[]) {
  const zonas: { nombre: string; parejas: { dni1: string; dni2: string }[] }[] = [];
  const cantidadZonas = 4;
  const parejasPorZona = 5;

  for (let i = 0; i < cantidadZonas; i++) {
    zonas.push({
      nombre: `Zona ${String.fromCharCode(65 + i)}`, // A, B, C, D
      parejas: parejas.slice(i * parejasPorZona, (i + 1) * parejasPorZona),
    });
  }

  return zonas;
}
