import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function WeeklySalesChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Weekly Sales Trend</h2>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" className="opacity-30 dark:opacity-20" />
            
            {/* CSS Variables use kiye hain taaki Dark Mode me axis colors auto-change ho */}
            <XAxis 
              dataKey="day" 
              stroke="var(--global-text)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            
            <YAxis 
              stroke="var(--global-text)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `₹${val}`} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--global-bg)', 
                borderColor: 'var(--global-text)', 
                color: 'var(--global-text)', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#2563eb" 
              strokeWidth={4} 
              dot={{ r: 4, strokeWidth: 2, fill: "var(--global-bg)" }} 
              activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklySalesChart;