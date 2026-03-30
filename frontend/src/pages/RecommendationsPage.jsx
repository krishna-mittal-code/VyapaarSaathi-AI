import React from "react";
import merchantData from "../data/merchantData";
import { generateRecommendations } from "../utils/insightUtils";

function RecommendationsPage() {
  const recommendations = generateRecommendations(merchantData);

  return (
    // Navbar tag yahan se hata diya hai taaki double header na aaye
    // Container ko dark mode ready aur App.jsx ke layout ke hisaab se set kiya hai
    <div className="w-full  transition-colors duration-300 py-12 lg:py-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with subtle float animation */}
        <div className="text-center mb-16 animate-float" style={{ animationDuration: '4s' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
            Growth <span className="text-green-600 dark:text-green-500">Recommendations</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
              Based on your business data, here are some AI-generated recommendations to help you grow and optimize your operations.
          </p>
        </div>
        
        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl p-8 border-l-4 border-green-500 hover:border-green-400 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Glow Effect for Hover */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-in-out pointer-events-none"></div>

              <div className="text-4xl mb-5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10">
                💡
              </div>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed relative z-10 transition-colors duration-300">
                {recommendation}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RecommendationsPage;