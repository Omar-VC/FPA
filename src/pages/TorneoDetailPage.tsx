import { useState } from "react";
import { useParams } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import {
  getTournaments,
  getPlayers,
  removePairFromTournament,
  addPairToTournament,
  updateTournamentStatus,
} from "../services/api";

import { validatePair, validateOrganizerCode } from "../modules/torneos/rules";
import { generarCompetencia } from "../modules/torneos/competencia.generator";
import { saveTournamentCompetition } from "../services/api";
import {
  calcularGanador,
  avanzarGanador,
} from "../modules/torneos/competencia.utils";
import TournamentHeader from "../components/torneos/TournamentHeader";
import OrganizerLogin from "../components/torneos/OrganizerLogin";
import TournamentRanking from "../components/torneos/TournamentRanking";
import TournamentPairs from "../components/torneos/TournamentPairs";
import OrganizerPanel from "../components/torneos/OrganizerPanel";
import ZonasSection from "../components/torneos/ZonasSection";
import PlayoffSection from "../components/torneos/PlayoffSection";

export default function TorneoDetailPage() {
  const jugadoresFederados = getPlayers();

  const [organizerMode, setOrganizerMode] = useState(
    localStorage.getItem("organizerMode") === "true",
  );

  type SetResult = {
    pareja1: number;
    pareja2: number;
  };

  const [resultados, setResultados] = useState<Record<string, SetResult[]>>({});

  const [codigo, setCodigo] = useState("");

  const [dni1, setDni1] = useState("");

  const [dni2, setDni2] = useState("");

  const { id } = useParams<{
    id: string;
  }>();

  const torneoInicial = getTournaments().find((t) => t.id === id);

  const [torneoState, setTorneoState] = useState(torneoInicial);

  const torneo = torneoState!;

  const refreshTournament = () => {
    const torneoActualizado = getTournaments().find((t) => t.id === torneo.id);

    if (torneoActualizado) {
      setTorneoState({
        ...torneoActualizado,
      });
    }
  };

  const handleChangeEstado = (
    estado: "abierto" | "cerrado" | "en juego" | "finalizado",
  ) => {
    setTorneoState((prev) => (prev ? { ...prev, estado } : prev));
  };

  if (!torneoState) {
    return (
      <PublicLayout>
        <div className="text-center py-10">
          <h1
            className="text-xl font-bold"
            style={{
              color: "var(--color-accent)",
            }}
          >
            Torneo no encontrado
          </h1>
        </div>
      </PublicLayout>
    );
  }

  const buscarJugador = (dni: string) =>
    jugadoresFederados.find((j) => j.dni === dni);

  const rankingParcial = torneo.parejas
    .flatMap((p) => [buscarJugador(p.dni1), buscarJugador(p.dni2)])
    .filter((j): j is NonNullable<typeof j> => Boolean(j))
    .sort((a, b) => b.puntos - a.puntos);

  const handleAgregarPareja = () => {
    if (
      torneoState?.estado === "cerrado" ||
      torneoState?.estado === "en juego" ||
      torneoState?.estado === "finalizado"
    ) {
      alert("El torneo no acepta más inscripciones");

      return;
    }

    if (torneo.inscriptos >= torneo.cupoMaximo) {
      alert("No hay más cupos disponibles");

      return;
    }

    const validation = validatePair(torneo, dni1, dni2);

    if (!validation.valid) {
      alert(validation.reason);

      return;
    }

    {
      /* AGREGAR PAREJA*/
    }

    addPairToTournament(torneo.id, {
      dni1,
      dni2,
    });

    refreshTournament();

    alert("Pareja agregada");

    setDni1("");
    setDni2("");
  };

  {
    /* GENERAR COMPETENCIA*/
  }

  const handleGenerarCompetencia = () => {
    const competencia = generarCompetencia({
      parejas: torneo.parejas,
      tipoFormato: torneo.tipoFormato,
      tamanoZona: torneo.tamanoZona,
      clasificanPorZona: torneo.clasificanPorZona,
      cantidadSets: torneo.cantidadSets,
    });

    saveTournamentCompetition(torneo.id, competencia);

    refreshTournament();

    alert("Competencia generada");
  };

  const handleLoginOrganizer = () => {
    const valid = validateOrganizerCode(codigo);

    if (!valid) {
      alert("Código inválido");
      return;
    }

    setOrganizerMode(true);

    localStorage.setItem("organizerMode", "true");

    alert("Modo organizador activado");
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <TournamentHeader torneo={torneo} />

        {/* LOGIN ORGANIZADOR */}
        <OrganizerLogin
          organizerMode={organizerMode}
          codigo={codigo}
          setCodigo={setCodigo}
          handleLoginOrganizer={handleLoginOrganizer}
        />

        {/* PANEL ORGANIZADOR */}
        {organizerMode && (
          <OrganizerPanel
            torneo={torneo}
            dni1={dni1}
            dni2={dni2}
            setDni1={setDni1}
            setDni2={setDni2}
            handleAgregarPareja={handleAgregarPareja}
            setOrganizerMode={setOrganizerMode}
            updateTournamentStatus={updateTournamentStatus}
            handleGenerarCompetencia={handleGenerarCompetencia}
            onChangeEstado={handleChangeEstado}
          />
        )}

        {/* PUNTAJE */}
        <div className="card">
          <h3 className="card-title">Puntaje del torneo</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>🏆 Campeón: {torneo.puntos.campeon}</div>

            <div>🥈 Finalista: {torneo.puntos.finalista}</div>

            <div>🥉 Semi: {torneo.puntos.semifinal}</div>

            <div>🎾 Cuartos: {torneo.puntos.cuartos}</div>
          </div>
        </div>

        {/* RANKING */}
        <TournamentRanking rankingParcial={rankingParcial} />

        {/* PAREJAS */}
        <TournamentPairs
          torneo={torneo}
          organizerMode={organizerMode}
          buscarJugador={buscarJugador}
          removePairFromTournament={removePairFromTournament}
          refreshTournament={refreshTournament}
        />

        {/* COMPETENCIA */}
        {torneo.competencia && (
          <div className="card">
            <h3 className="card-title">Competencia</h3>

            <div className="flex flex-col gap-4">
              {/* 🔹 ZONAS */}
              {torneo.competencia?.zonas?.map((zona) => (
                <ZonasSection
                  key={zona.nombre}
                  zona={zona}
                  organizerMode={organizerMode}
                  buscarJugador={buscarJugador}
                  resultados={resultados}
                  setResultados={setResultados}
                  calcularGanador={calcularGanador}
                  avanzarGanador={avanzarGanador}
                  torneoState={torneoState}
                  setTorneoState={setTorneoState}
                />
              ))}

              {/* 🔹 PLAYOFF */}
              <PlayoffSection
                playoff={torneo.competencia.playoff}
                organizerMode={organizerMode}
                buscarJugador={buscarJugador}
                torneoState={torneoState}
                setTorneoState={setTorneoState}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={`https://wa.me/${torneo.telefonoOrganizador.replace(/\D/g, "")}?text=Hola, quiero inscribirme al torneo ${torneo.nombre}`}
          target="_blank"
          className="text-center py-3 rounded-lg font-semibold"
          style={{
            background: "var(--color-accent)",

            color: "#000",
          }}
        >
          Contactar organizador
        </a>
      </div>
    </PublicLayout>
  );
}
