import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { torneos } from "../modules/torneos/data";
import { TrophyIcon } from "@heroicons/react/24/solid";

export default function TorneosPage() {
  const [selectedTorneo, setSelectedTorneo] = useState<string | null>(null);

  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        {/* Banner con Heroicon */}
        <div className="w-full bg-gradient-to-r from-dark via-primary to-accent text-light py-8 mb-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center text-center gap-6">
            {/* Ícono Heroicon */}
            <TrophyIcon className="w-12 h-12 text-light" />

            {/* Texto y botón */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2">
                ¡Bienvenidos a los Torneos FPA!
              </h1>
              <p className="text-lg max-w-2xl">
                Bienvenido a la sección de torneos de la Federación de Pádel
                Añatuya. Aquí encontrarás los próximos eventos disponibles
                para jugadores y el acceso para organizadores.
              </p>
              <Link
                to="/crear-torneo"
                className="mt-4 px-6 py-2 bg-light text-dark font-semibold rounded-md hover:bg-accent hover:text-light transition"
              >
                ¿Eres organizador? Crear torneo
              </Link>
            </div>
          </div>
        </div>

        {/* Subtítulo */}
        <h2 className="text-xl font-semibold text-light mb-6">
          Próximos eventos
        </h2>

        {/* Listado de torneos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4">
          {torneos.length === 0 ? (
            <p className="text-light">Aún no hay torneos disponibles.</p>
          ) : (
            torneos.map((t) => (
              <div
                key={t.id}
                className="bg-dark border border-accent rounded-lg p-4 shadow-md"
              >
                <h3 className="text-light font-semibold">{t.nombre}</h3>
                <p className="text-accent">
                  {t.fecha} - {t.lugar}
                </p>
                <p className="text-sm text-light">Estado: {t.estado}</p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setSelectedTorneo(t.id)}
                    className="px-4 py-1 bg-primary text-light rounded-md hover:bg-accent"
                  >
                    Inscribirse
                  </button>
                  <Link
                    to={`/torneos/${t.id}`}
                    className="px-4 py-1 bg-secondary text-light rounded-md hover:bg-accent"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Formulario de inscripción rápida */}
        {selectedTorneo && (
          <div className="mt-6 w-3/4 bg-dark border border-accent rounded-lg p-4">
            <h2 className="text-light font-semibold mb-2">
              Inscripción de pareja
            </h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="DNI Jugador 1"
                className="p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="DNI Jugador 2"
                className="p-2 rounded-md"
              />
              <button className="mt-2 px-4 py-2 bg-primary text-light rounded-md hover:bg-accent">
                Confirmar inscripción
              </button>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
