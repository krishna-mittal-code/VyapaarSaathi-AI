import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import InsightsPage from "./pages/InsightsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import AISummaryPage from "./pages/AISummaryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/ai-summary" element={<AISummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;