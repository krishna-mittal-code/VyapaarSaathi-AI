import { lazy, Suspense, useEffect, useState } from "react";
import { PremiumSectionLoader } from "../components/PremiumLoader";
import merchantData from "../data/merchantData";
import {
  getTodaySales,
  getWeeklySales,
  getTransactionCount,
  getPeakHour,
} from "../utils/dashboardUtils";
import { getWeeklyAverage, generateAISummary } from "../utils/insightUtils";

// ✅ Keep above-the-fold content eager
import DashboardMetrics from "../components/DashboardMetrics";
import AISummaryPanel from "../components/AISummaryPanel";

// ✅ Lazy load only heavy below-the-fold content
const WeeklySalesChart = lazy(() => import("../components/WeeklySalesChart"));
const ReportsTable = lazy(() => import("../components/ReportsTable"));

function Dashboard() {
  const [showHeavySections, setShowHeavySections] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeavySections(true);
    }, 250); // small delay so first paint stays fast

    return () => clearTimeout(timer);
  }, []);

  const todaySales = getTodaySales(merchantData.transactions);
  const weeklySales = getWeeklySales(merchantData.dailySales);
  const transactionCount = getTransactionCount(merchantData.transactions);
  const peakHour = getPeakHour(merchantData.transactions);
  const weeklyAverage = getWeeklyAverage(merchantData.dailySales);
  const aiSummary = generateAISummary(todaySales, weeklyAverage, peakHour);

  return (
    // Navbar hata diya gaya hai. Background aur transition set kar diye.
    <div className="w-full min-h-full  transition-colors duration-300 py-8 md:py-10">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 animate-float" style={{ animationDuration: '4s' }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            Merchant <span className="text-blue-600 dark:text-blue-500">Dashboard</span>
          </h1>
        </div>

        {/* ✅ Instant visible content */}
        <div className="space-y-6">
          <DashboardMetrics
            todaySales={todaySales}
            weeklySales={weeklySales}
            transactionCount={transactionCount}
            peakHour={peakHour}
          />

          <AISummaryPanel aiSummary={aiSummary} />
        </div>

        {/* ✅ Heavy content delayed */}
        {showHeavySections && (
          <div className="mt-8">
            <Suspense fallback={<PremiumSectionLoader />}>
              <div className="space-y-8 animate-float" style={{ animationDuration: '6s' }}>
                <WeeklySalesChart data={merchantData.dailySales} />
                <ReportsTable data={merchantData.transactions} />
              </div>
            </Suspense>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default Dashboard;