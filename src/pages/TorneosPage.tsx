import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { TrophyIcon } from "@heroicons/react/24/solid";
import { getTournaments, addPairToTournament } from "../services/api";
import { validatePair } from "../modules/torneos/rules";

export default function TorneosPage() {
  const [selectedTorneo, setSelectedTorneo] = useState<string | null>(null);
  const [dni1, setDni1] = useState("");
  const [dni2, setDni2] = useState("");

  const torneos = getTournaments();

  const handleInscripcion = () => {
    if (!dni1 || !dni2 || !selectedTorneo) {
      alert("Completá los DNIs");
      return;
    }

    const torneo = torneos.find((t) => t.id === selectedTorneo);

    if (!torneo) {
      alert("Torneo no encontrado");
      return;
    }

    const validation = validatePair(torneo, dni1, dni2);

    if (!validation.valid) {
      alert(validation.reason);
      return;
    }

    addPairToTournament(selectedTorneo, {
      dni1,
      dni2,
    });

    alert("Inscripción enviada");

    setDni1("");
    setDni2("");
    setSelectedTorneo(null);
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {/* HEADER */}
        <div
          className="rounded-xl p-6 shadow-md flex items-center gap-4"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <TrophyIcon className="h-10 w-10 text-[var(--color-primary)]" />

          <div>
            <h1 className="text-2xl font-bold mb-1">Torneos FPA</h1>
            <p className="text-sm opacity-70 mb-3">
              Explorá los torneos disponibles y anotate con tu pareja.
            </p>

            <Link
              to="/crear-torneo"
              className="inline-block px-4 py-2 rounded-lg font-semibold"
              style={{
                background: "var(--color-accent)",
                color: "#000",
              }}
            >
              Crear torneo
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-semibold">Próximos eventos</h2>

        {/* LISTA */}
        {torneos.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>
            Aún no hay torneos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {torneos.map((t) => (
              <div
                key={t.id}
                className="rounded-xl p-5 flex flex-col gap-3 transition hover:scale-[1.01]"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <h3 className="text-lg font-semibold">{t.nombre}</h3>

                <p className="text-sm opacity-70">
                  {t.fecha} • {t.lugar}
                </p>

                <span
                  className="text-xs font-semibold px-2 py-1 rounded w-fit"
                  style={{
                    background:
                      t.estado === "abierto"
                        ? "var(--color-primary)"
                        : t.estado === "en juego"
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    color: t.estado === "finalizado" ? "#fff" : "#000",
                  }}
                >
                  {t.estado.toUpperCase()}
                </span>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setSelectedTorneo(t.id)}
                    className="px-3 py-1.5 rounded-md text-sm font-semibold"
                    style={{
                      background: "var(--color-primary)",
                      color: "#000",
                    }}
                  >
                    Inscribirse
                  </button>

                  <Link
                    to={`/torneos/${t.id}`}
                    className="px-3 py-1.5 rounded-md text-sm font-semibold"
                    style={{
                      background: "var(--color-surface-2)",
                      color: "var(--color-text)",
                    }}
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FORM */}
        {selectedTorneo && (
          <div
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h2 className="font-semibold text-lg">Inscripción de pareja</h2>

            <input
              type="text"
              value={dni1}
              onChange={(e) => setDni1(e.target.value)}
              placeholder="DNI Jugador 1"
              className="p-2 rounded-md bg-transparent border"
              style={{ borderColor: "var(--color-border)" }}
            />

            <input
              type="text"
              value={dni2}
              onChange={(e) => setDni2(e.target.value)}
              placeholder="DNI Jugador 2"
              className="p-2 rounded-md bg-transparent border"
              style={{ borderColor: "var(--color-border)" }}
            />

            <button
              onClick={handleInscripcion}
              className="mt-2 px-4 py-2 rounded-md font-semibold"
              style={{
                background: "var(--color-accent)",
                color: "#000",
              }}
            >
              Confirmar inscripción
            </button>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
