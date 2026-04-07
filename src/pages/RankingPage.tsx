import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { jugadores } from "../modules/ranking/data";

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

export default function RankingPage() {
  const { gender } = useParams<{ gender: "masculino" | "femenino" }>();
  const generoSeleccionado = gender ?? "masculino"; // default masculino

  const filtrados = jugadores
    .filter((j) => j.genero === generoSeleccionado)
    .sort((a, b) => b.puntos - a.puntos);

  let categoriaActual = "";

  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">
          Ranking {generoSeleccionado === "masculino" ? "Masculino" : "Femenino"}
        </h1>

        <table className="w-3/4 text-left border-collapse">
          <thead>
            <tr className="bg-primary text-light">
              <th className="px-4 py-2">Posición</th>
              <th className="px-4 py-2">Jugador</th>
              <th className="px-4 py-2">Apodo</th>
              <th className="px-4 py-2">Ciudad</th>
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
                      <td colSpan={5} className="text-center text-primary font-semibold py-2">
                        —— {categoria} ——
                      </td>
                    </tr>
                  )}
                  <tr key={j.nombre} className="border-b border-accent">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{j.nombre}</td>
                    <td className="px-4 py-2">{j.apodo ?? "-"}</td>
                    <td className="px-4 py-2">{j.ciudad}</td>
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
