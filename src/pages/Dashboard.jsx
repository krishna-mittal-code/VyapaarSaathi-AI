import merchantData from "../data/merchantData";
import {
  getTodaySales,
  getWeeklySales,
  getTransactionCount,
  getPeakHour,
} from "../utils/dashboardUtils";
import { getWeeklyAverage, generateAISummary } from "../utils/insightUtils";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const todaySales = getTodaySales(merchantData.transactions);
  const weeklySales = getWeeklySales(merchantData.dailySales);
  const transactionCount = getTransactionCount(merchantData.transactions);
  const peakHour = getPeakHour(merchantData.transactions);
  const weeklyAverage = getWeeklyAverage(merchantData.dailySales);
  const aiSummary = generateAISummary(todaySales, weeklyAverage, peakHour);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Merchant Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">Today's Sales</h2>
            <p className="text-2xl font-bold mt-2">₹{todaySales}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">Weekly Sales</h2>
            <p className="text-2xl font-bold mt-2">₹{weeklySales}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">Transactions</h2>
            <p className="text-2xl font-bold mt-2">{transactionCount}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">Peak Payment Hour</h2>
            <p className="text-2xl font-bold mt-2">{peakHour}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            AI Summary
          </h2>
          <p className="text-gray-700 text-lg">{aiSummary}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Sales Trend</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={merchantData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;