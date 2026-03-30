import React from "react";

function ReportsTable({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 mt-10 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Transactions Report</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400">
              <th className="px-4 py-3 font-semibold text-sm">Transaction ID</th>
              <th className="px-4 py-3 font-semibold text-sm">Amount</th>
              <th className="px-4 py-3 font-semibold text-sm">Time</th>
              <th className="px-4 py-3 font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {data.slice(0, 10).map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{tx.id}</td>
                <td className="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                  ₹{tx.amount?.toLocaleString('en-IN') || tx.amount}
                </td>
                <td className="px-4 py-3 text-sm">{tx.time}</td>
                <td className="px-4 py-3 text-sm">
                  {/* Status ko clean badge design diya hai */}
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                    {tx.status || "Completed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsTable;