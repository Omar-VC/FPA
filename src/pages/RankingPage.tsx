import PublicLayout from "../layouts/PublicLayout";

interface Jugador {
  nombre: string;
  puntos: number;
  genero: "masculino" | "femenino";
}

// Función para determinar categoría según puntos
function obtenerCategoria(puntos: number): string {
  if (puntos >= 1400) return "1ra Categoría";
  if (puntos >= 1200) return "2da Categoría";
  if (puntos >= 1000) return "3ra Categoría";
  if (puntos >= 800) return "4ta Categoría";
  if (puntos >= 600) return "5ta Categoría";
  if (puntos >= 400) return "6ta Categoría";
  if (puntos >= 200) return "7ma Categoría";
  return "8va Categoría";
}

interface RankingPageProps {
  gender: "masculino" | "femenino";
}

export default function RankingPage({ gender }: RankingPageProps) {
  // Datos ficticios más grandes
  const jugadores: Jugador[] = [
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

  // Filtrar por género y ordenar por puntos
  const filtrados = jugadores
    .filter((j) => j.genero === gender)
    .sort((a, b) => b.puntos - a.puntos);

  // Detectar cambios de categoría para insertar separadores
  let categoriaActual = "";

  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">
          Ranking {gender === "masculino" ? "Masculino" : "Femenino"}
        </h1>

        <table className="w-3/4 text-left border-collapse">
          <thead>
            <tr className="bg-primary text-light">
              <th className="px-4 py-2">Posición</th>
              <th className="px-4 py-2">Jugador</th>
              <th className="px-4 py-2">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((j, i) => {
              const categoria = obtenerCategoria(j.puntos);
              const mostrarSeparador = categoria !== categoriaActual;
              categoriaActual = categoria;

              return (
                <>
                  {mostrarSeparador && (
                    <tr key={`sep-${categoria}`} className="bg-dark">
                      <td colSpan={3} className="text-center text-primary font-semibold py-2">
                        —— {categoria} ——
                      </td>
                    </tr>
                  )}
                  <tr key={j.nombre} className="border-b border-accent">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{j.nombre}</td>
                    <td className="px-4 py-2">{j.puntos}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </PublicLayout>
  );
}
