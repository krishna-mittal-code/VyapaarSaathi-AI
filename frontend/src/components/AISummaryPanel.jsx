function AISummaryPanel({ aiSummary }) {
  return (
    <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl shadow p-6 mb-10 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">AI Summary</h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg">{aiSummary}</p>
    </div>
  );
}

export default AISummaryPanel;