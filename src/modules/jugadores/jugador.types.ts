export interface Jugador {
  id: string;
  nombre: string;
  apodo?: string;
  dni: string;
  ciudad: string;

  genero: "masculino" | "femenino";
  nivel: "iniciado" | "intermedio" | "avanzado";

  puntos: number;
  estado: "pendiente" | "activo";
}