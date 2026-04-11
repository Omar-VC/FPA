import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { jugadores } from "../modules/ranking/data";
import { ChartBarIcon } from '@heroicons/react/24/solid'



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
      <div className="w-full md:w-3/4 mx-auto py-10 flex flex-col items-center gap-6">
        <div className="w-full md:w-3/4 mx-auto mb-0 rounded-t-md shadow-md bg-gradient-to-r from-green-200 via-green-400 to-dark">
          <div className="flex items-center justify-center gap-3 py-4">
            {/* Icono de trofeo de Heroicons */}
           <ChartBarIcon className="h-8 w-8 text-dark" />
            <h1 className="text-3xl font-bold text-dark capitalize tracking-wide text-center py-4">
              Ranking{" "}
              {generoSeleccionado === "masculino" ? "Masculino" : "Femenino"}
            </h1>
          </div>
        </div>
        <div className="w-full h-2 bg-accent/30 rounded-t-md shadow-md"></div>
        <table className="w-full text-left border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-dark text-light">
              <th className="px-4 py-3">Posición</th>
              <th className="px-4 py-3">Jugador</th>
              <th className="px-4 py-3">Apodo</th>
              <th className="px-4 py-3">Ciudad</th>
              <th className="px-4 py-3">Puntos</th>
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
                      <td
                        colSpan={5}
                        className="text-center text-primary font-semibold py-3 uppercase tracking-wider border-t border-b border-accent"
                      >
                        ★ {categoria} ★
                      </td>
                    </tr>
                  )}
                  <tr
                    key={j.nombre}
                    className={`border-b border-accent transition duration-200
                        ${i === 0 ? "bg-primary text-light font-bold hover:bg-primary/80" : ""}
                        ${i === 1 ? "bg-accent text-dark font-semibold hover:bg-accent/80 hover:text-light" : ""}
                        ${i === 2 ? "bg-light text-dark font-semibold hover:bg-light/80 hover:text-dark" : ""}
                        ${i > 2 ? "hover:bg-primary/20" : ""}`}
                  >
                    <td className="px-4 py-2 flex items-center gap-2">
                      {i === 0 && <span>🥇</span>}
                      {i === 1 && <span>🥈</span>}
                      {i === 2 && <span>🥉</span>}
                      {i + 1}
                    </td>
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
