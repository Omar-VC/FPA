import { BrowserRouter, Routes, Route } from "react-router-dom";
import RankingPage from "../pages/RankingPage";
import TorneosPage from "../pages/TorneosPage";
import TorneoDetailPage from "../pages/TorneoDetailPage";
import InscripcionPage from "../pages/InscripcionPage";
import CrearTorneoPage from "../pages/CrearTorneoPage"; // 👈 nueva importación

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ranking con parámetro dinámico */}
        <Route path="/ranking/:gender" element={<RankingPage />} />

        {/* Torneos */}
        <Route path="/torneos" element={<TorneosPage />} />
        <Route path="/torneos/:id" element={<TorneoDetailPage />} />

        {/* Crear torneo */}
        <Route path="/crear-torneo" element={<CrearTorneoPage />} />

        {/* Inscripción */}
        <Route path="/inscribirse" element={<InscripcionPage />} />

        {/* Default */}
        <Route path="/" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
