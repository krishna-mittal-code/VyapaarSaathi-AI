import React from "react";
import merchantData from "../data/merchantData";
import { generateInsights } from "../utils/insightUtils";

function InsightsPage() {
  const insights = generateInsights(merchantData);

  return (
    // Navbar yahan se hata diya hai. Container ab Dark Mode ready hai.
    <div className="w-full  transition-colors duration-300 py-12 lg:py-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Float Animation */}
        <div className="text-center mb-16 animate-float" style={{ animationDuration: '5s' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            AI Business <span className="text-blue-600 dark:text-blue-500">Insights</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto transition-colors duration-300">
            Aapke data ko analyze karke AI ne ye kuch zaroori business patterns aur trends nikale hain.
          </p>
        </div>
        
        {/* Insights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl p-8 border-t-4 border-blue-500 hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110 pointer-events-none"></div>

              {/* Icon with Zoom Effect */}
              <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                {insight.icon}
              </div>
              
              {/* Content */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300 relative z-10">
                {insight.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 relative z-10">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default InsightsPage;