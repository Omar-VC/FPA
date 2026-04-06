export interface Jugador {
  nombre: string;
  puntos: number;
  genero: "masculino" | "femenino";
}

export const jugadores: Jugador[] = [
  // Masculino
  { nombre: "Juan Pérez", puntos: 1500, genero: "masculino" },
  { nombre: "Carlos Gómez", puntos: 1350, genero: "masculino" },
  { nombre: "Pedro Martínez", puntos: 1250, genero: "masculino" },
  { nombre: "Luis Fernández", puntos: 1180, genero: "masculino" },
  { nombre: "Miguel Torres", puntos: 1050, genero: "masculino" },
  { nombre: "Andrés Suárez", puntos: 980, genero: "masculino" },
  { nombre: "Ricardo Díaz", puntos: 870, genero: "masculino" },
  { nombre: "Hernán López", puntos: 820, genero: "masculino" },
  { nombre: "Martín Herrera", puntos: 720, genero: "masculino" },
  { nombre: "Pablo Ramírez", puntos: 650, genero: "masculino" },
  { nombre: "Diego González", puntos: 540, genero: "masculino" },
  { nombre: "Esteban Castro", puntos: 460, genero: "masculino" },
  { nombre: "Jorge Molina", puntos: 380, genero: "masculino" },
  { nombre: "Sergio Rivas", puntos: 320, genero: "masculino" },
  { nombre: "Tomás Aguilar", puntos: 250, genero: "masculino" },
  { nombre: "Emilio Vargas", puntos: 180, genero: "masculino" },
  { nombre: "Ramiro Soto", puntos: 160, genero: "masculino" },
  { nombre: "Oscar Medina", puntos: 120, genero: "masculino" },
  { nombre: "Nicolás Bravo", puntos: 90, genero: "masculino" },
  { nombre: "Gabriel Ortiz", puntos: 50, genero: "masculino" },

  // Femenino
  { nombre: "Ana López", puntos: 1480, genero: "femenino" },
  { nombre: "María Díaz", puntos: 1320, genero: "femenino" },
  { nombre: "Sofía Ramírez", puntos: 1210, genero: "femenino" },
  { nombre: "Laura González", puntos: 1150, genero: "femenino" },
  { nombre: "Carla Herrera", puntos: 1020, genero: "femenino" },
  { nombre: "Valeria Torres", puntos: 950, genero: "femenino" },
  { nombre: "Florencia Suárez", puntos: 880, genero: "femenino" },
  { nombre: "Camila Rivas", puntos: 810, genero: "femenino" },
  { nombre: "Julieta Castro", puntos: 720, genero: "femenino" },
  { nombre: "Paula Molina", puntos: 640, genero: "femenino" },
  { nombre: "Lucía Ramírez", puntos: 560, genero: "femenino" },
  { nombre: "Verónica Soto", puntos: 470, genero: "femenino" },
  { nombre: "Daniela Vargas", puntos: 390, genero: "femenino" },
  { nombre: "Mónica Bravo", puntos: 310, genero: "femenino" },
  { nombre: "Rocío Aguilar", puntos: 240, genero: "femenino" },
  { nombre: "Patricia Ortiz", puntos: 190, genero: "femenino" },
  { nombre: "Gabriela Medina", puntos: 150, genero: "femenino" },
  { nombre: "Elena Fernández", puntos: 110, genero: "femenino" },
  { nombre: "Natalia Gómez", puntos: 80, genero: "femenino" },
  { nombre: "Carolina Pérez", puntos: 40, genero: "femenino" },
];
