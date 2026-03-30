function AISummaryHealthCards({ insightCards, lowStockCount }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Today's Business Health</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg transition-colors">
          <span className="text-2xl">
            {insightCards[0].value.includes("₹") && parseFloat(insightCards[0].value.replace("₹", "").replace(/,/g, "")) > 10000
              ? "🟢"
              : insightCards[0].value.includes("₹") && parseFloat(insightCards[0].value.replace("₹", "").replace(/,/g, "")) > 5000
              ? "🟡"
              : "🔴"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Sales</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{insightCards[0].value}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg transition-colors">
          <span className="text-2xl">{lowStockCount > 0 ? "⚠️" : "✅"}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Low Stock</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{lowStockCount} items</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg transition-colors">
          <span className="text-2xl">⏰</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Peak Hour</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{insightCards[1].value}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg transition-colors">
          <span className="text-2xl">🔁</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Repeat Cust</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{insightCards[3].value}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default AISummaryHealthCards;