import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ Navigate import kiya
import { PremiumPageLoader } from "./components/PremiumLoader";

// Layout Components import kar liye
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ FIX: Landing page should NOT be lazy
import LandingPage from "./pages/LandingPage";

// ✅ Lazy load only secondary pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const AISummaryPage = lazy(() => import("./pages/AISummaryPage"));

// ✅ Naya CSV Analysis Page Lazy Load kar liya
const TransactionAnalysis = lazy(() => import("./pages/TransactionAnalysis"));

function App() {
  return (
    <BrowserRouter>
      {/* ✅ YEH HAI MAGIC WALA CONTAINER 
        flex-col aur min-h-screen footer ko hamesha niche rakhega.
        Light mode: bg-gray-50, text-gray-900 (Pehle jaisa default)
        Dark mode: bg-slate-900, text-gray-100
      */}
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Navbar hamesha top par */}
        <Navbar />

        {/* ✅ flex-grow isko stretch karega aur footer ko bottom me push karega */}
        <main className="flex-grow w-full">
          <Routes>
            {/* ✅ Fast initial load */}
            <Route path="/" element={<LandingPage />} />

            {/* ✅ Only wrap lazy routes in Suspense */}
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PremiumPageLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />

            <Route
              path="/insights"
              element={
                <Suspense fallback={<PremiumPageLoader />}>
                  <InsightsPage />
                </Suspense>
              }
            />

            <Route
              path="/recommendations"
              element={
                <Suspense fallback={<PremiumPageLoader />}>
                  <RecommendationsPage />
                </Suspense>
              }
            />

            <Route
              path="/ai-summary"
              element={
                <Suspense fallback={<PremiumPageLoader />}>
                  <AISummaryPage />
                </Suspense>
              }
            />

            {/* ✅ Naya CSV Route add kar diya */}
            <Route
              path="/csv-analysis"
              element={
                <Suspense fallback={<PremiumPageLoader />}>
                  <TransactionAnalysis />
                </Suspense>
              }
            />

            {/* ✅ CATCH-ALL ROUTE (Wrong URL Fallback) */}
            {/* Agar koi galat URL dalega toh wapas Home ("/") par bhej dega */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>

        {/* Footer hamesha bottom par */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;