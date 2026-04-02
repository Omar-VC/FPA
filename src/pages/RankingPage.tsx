import PublicLayout from "../layouts/PublicLayout";

interface RankingPageProps {
  gender: "masculino" | "femenino";
}

export default function RankingPage({ gender }: RankingPageProps) {
  // Ejemplo de datos mockeados
  const jugadores = [
    { nombre: "Juan Pérez", puntos: 1200, genero: "masculino" },
    { nombre: "Carlos Gómez", puntos: 1150, genero: "masculino" },
    { nombre: "Ana López", puntos: 980, genero: "femenino" },
    { nombre: "María Díaz", puntos: 870, genero: "femenino" },
  ];

  // Filtrar por género
  const filtrados = jugadores
    .filter((j) => j.genero === gender)
    .sort((a, b) => b.puntos - a.puntos);

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
            {filtrados.map((j, i) => (
              <tr key={j.nombre} className="border-b border-accent">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{j.nombre}</td>
                <td className="px-4 py-2">{j.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PublicLayout>
  );
}
