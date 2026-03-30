import { memo } from "react";

function DashboardMetrics({ todaySales, weeklySales, transactionCount, peakHour }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      
      {/* Today's Sales Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Today's Sales</h2>
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            💰
          </div>
        </div>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
          ₹{todaySales?.toLocaleString('en-IN') || 0}
        </p>
      </div>

      {/* Weekly Sales Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Weekly Sales</h2>
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
            📈
          </div>
        </div>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
          ₹{weeklySales?.toLocaleString('en-IN') || 0}
        </p>
      </div>

      {/* Transactions Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Transactions</h2>
          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            🧾
          </div>
        </div>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
          {transactionCount || 0}
        </p>
      </div>

      {/* Peak Hour Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Peak Hour</h2>
          <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
            ⏰
          </div>
        </div>
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
          {peakHour || 'N/A'}
        </p>
      </div>

    </section>
  );
}

export default memo(DashboardMetrics);