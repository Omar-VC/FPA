import { BrowserRouter, Routes, Route } from "react-router-dom";
import RankingPage from "../pages/RankingPage";
import TorneosPage from "../pages/TorneosPage";
import InscripcionPage from "../pages/InscripcionPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ranking con parámetro dinámico */}
        <Route path="/ranking/:gender" element={<RankingPage />} />

        {/* Otras páginas */}
        <Route path="/torneos" element={<TorneosPage />} />
        <Route path="/inscribirse" element={<InscripcionPage />} />

        {/* Default */}
        <Route path="/" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
