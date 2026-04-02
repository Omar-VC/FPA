import { BrowserRouter, Routes, Route } from "react-router-dom";
import RankingPage from "../pages/RankingPage";
import TorneosPage from "../pages/TorneosPage";
import InscripcionPage from "../pages/InscripcionPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Ranking */}
        <Route path="/ranking/masculino" element={<RankingPage gender="masculino" />} />
        <Route path="/ranking/femenino" element={<RankingPage gender="femenino" />} />

        {/* Default: Ranking masculino */}
        <Route path="/" element={<RankingPage gender="masculino" />} />

        {/* Otras páginas */}
        <Route path="/torneos" element={<TorneosPage />} />
        <Route path="/inscribirse" element={<InscripcionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
