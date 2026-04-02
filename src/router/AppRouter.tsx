import { BrowserRouter, Routes, Route } from "react-router-dom";
import RankingPage from "../pages/RankingPage";
import TorneosPage from "../pages/TorneosPage";
import InscripcionPage from "../pages/InscripcionPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RankingPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/torneos" element={<TorneosPage />} />
        <Route path="/inscribirse" element={<InscripcionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
