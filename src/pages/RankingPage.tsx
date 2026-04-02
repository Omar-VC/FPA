import PublicLayout from "../layouts/PublicLayout";

export default function RankingPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">Ranking FPA</h1>

        {/* Tabla de ejemplo */}
        <table className="w-3/4 text-left border-collapse">
          <thead>
            <tr className="bg-primary text-light">
              <th className="px-4 py-2">Posición</th>
              <th className="px-4 py-2">Jugador</th>
              <th className="px-4 py-2">Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-accent">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Juan Pérez</td>
              <td className="px-4 py-2">1200</td>
            </tr>
            <tr className="border-b border-accent">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">Carlos Gómez</td>
              <td className="px-4 py-2">1150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PublicLayout>
  );
}
