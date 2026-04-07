// modules/ranking/data.ts

export interface Jugador {
  nombre: string;
  apodo?: string; // opcional
  ciudad: string;
  puntos: number;
  genero: "masculino" | "femenino";
}

// puntos iniciales según nivel
function puntosPorNivel(nivel: "iniciado" | "intermedio" | "avanzado"): number {
  switch (nivel) {
    case "iniciado":
      return 100;
    case "intermedio":
      return 300;
    case "avanzado":
      return 500;
    default:
      return 0;
  }
}

// función para registrar un nuevo jugador
export function registrarJugador({
  nombre,
  apodo,
  ciudad,
  genero,
  nivel,
}: {
  nombre: string;
  apodo?: string;
  ciudad: string;
  genero: "masculino" | "femenino";
  nivel: "iniciado" | "intermedio" | "avanzado";
}) {
  const nuevoJugador: Jugador = {
    nombre: apodo ? `${nombre} (${apodo})` : nombre,
    apodo,
    ciudad,
    genero,
    puntos: puntosPorNivel(nivel),
  };

  jugadores.push(nuevoJugador);
}

// jugadores ficticios (mock data inicial)
export const jugadores: Jugador[] = [
  // Masculino
  { nombre: "Juan Pérez", puntos: 1500, genero: "masculino", ciudad: "Buenos Aires" },
  { nombre: "Carlos Gómez", puntos: 1350, genero: "masculino", ciudad: "Córdoba" },
  { nombre: "Pedro Martínez", puntos: 1250, genero: "masculino", ciudad: "Rosario" },
  { nombre: "Luis Fernández", puntos: 1180, genero: "masculino", ciudad: "Mendoza" },
  { nombre: "Miguel Torres", puntos: 1050, genero: "masculino", ciudad: "Salta" },
  { nombre: "Andrés Suárez", puntos: 980, genero: "masculino", ciudad: "Tucumán" },
  { nombre: "Ricardo Díaz", puntos: 870, genero: "masculino", ciudad: "La Plata" },
  { nombre: "Hernán López", puntos: 820, genero: "masculino", ciudad: "Mar del Plata" },
  { nombre: "Martín Herrera", puntos: 720, genero: "masculino", ciudad: "Santa Fe" },
  { nombre: "Pablo Ramírez", puntos: 650, genero: "masculino", ciudad: "Neuquén" },
  { nombre: "Diego González", puntos: 540, genero: "masculino", ciudad: "San Juan" },
  { nombre: "Esteban Castro", puntos: 460, genero: "masculino", ciudad: "Catamarca" },
  { nombre: "Jorge Molina", puntos: 380, genero: "masculino", ciudad: "Formosa" },
  { nombre: "Sergio Rivas", puntos: 320, genero: "masculino", ciudad: "Chaco" },
  { nombre: "Tomás Aguilar", puntos: 250, genero: "masculino", ciudad: "Misiones" },
  { nombre: "Emilio Vargas", puntos: 180, genero: "masculino", ciudad: "San Luis" },
  { nombre: "Ramiro Soto", puntos: 160, genero: "masculino", ciudad: "Río Negro" },
  { nombre: "Oscar Medina", puntos: 120, genero: "masculino", ciudad: "Jujuy" },
  { nombre: "Nicolás Bravo", puntos: 90, genero: "masculino", ciudad: "Corrientes" },
  { nombre: "Gabriel Ortiz", puntos: 50, genero: "masculino", ciudad: "Entre Ríos" },

  // Femenino
  { nombre: "Ana López", puntos: 1480, genero: "femenino", ciudad: "Buenos Aires" },
  { nombre: "María Díaz", puntos: 1320, genero: "femenino", ciudad: "Córdoba" },
  { nombre: "Sofía Ramírez", puntos: 1210, genero: "femenino", ciudad: "Rosario" },
  { nombre: "Laura González", puntos: 1150, genero: "femenino", ciudad: "Mendoza" },
  { nombre: "Carla Herrera", puntos: 1020, genero: "femenino", ciudad: "Salta" },
  { nombre: "Valeria Torres", puntos: 950, genero: "femenino", ciudad: "Tucumán" },
  { nombre: "Florencia Suárez", puntos: 880, genero: "femenino", ciudad: "La Plata" },
  { nombre: "Camila Rivas", puntos: 810, genero: "femenino", ciudad: "Mar del Plata" },
  { nombre: "Julieta Castro", puntos: 720, genero: "femenino", ciudad: "Santa Fe" },
  { nombre: "Paula Molina", puntos: 640, genero: "femenino", ciudad: "Neuquén" },
  { nombre: "Lucía Ramírez", puntos: 560, genero: "femenino", ciudad: "San Juan" },
  { nombre: "Verónica Soto", puntos: 470, genero: "femenino", ciudad: "Catamarca" },
  { nombre: "Daniela Vargas", puntos: 390, genero: "femenino", ciudad: "Formosa" },
  { nombre: "Mónica Bravo", puntos: 310, genero: "femenino", ciudad: "Chaco" },
  { nombre: "Rocío Aguilar", puntos: 240, genero: "femenino", ciudad: "Misiones" },
  { nombre: "Patricia Ortiz", puntos: 190, genero: "femenino", ciudad: "San Luis" },
  { nombre: "Gabriela Medina", puntos: 150, genero: "femenino", ciudad: "Río Negro" },
  { nombre: "Elena Fernández", puntos: 110, genero: "femenino", ciudad: "Jujuy" },
  { nombre: "Natalia Gómez", puntos: 80, genero: "femenino", ciudad: "Corrientes" },
  { nombre: "Carolina Pérez", puntos: 40, genero: "femenino", ciudad: "Entre Ríos" },
];
