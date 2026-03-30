import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function AISummaryCharts({ dailySales, categoryChartData }) {
  // Yeh ek chota function hai jo graph ke text color ko mode ke hisaab se handle karega
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#f8fafc' : '#374151'; // Slate-50 for dark, Gray-700 for light
  const bgColor = isDark ? '#1e293b' : '#ffffff'; // Slate-800 for dark, White for light

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 transition-colors duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Weekly Sales Trend</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySales} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="day" tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: bgColor, 
                  borderColor: "#e5e7eb",
                  color: textColor
                }} 
              />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 transition-colors duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Revenue by Category</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: bgColor, 
                  borderColor: "#e5e7eb",
                  color: textColor
                }} 
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AISummaryCharts;