import { memo } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    // Navbar yahan se hata diya gaya hai kyunki ab wo App.jsx me global hai
    // ✅ Fix: Gradient hata kar default light mode aur proper dark mode background set kiya hai
    <div className="w-full transition-colors duration-300 min-h-[calc(100vh-4rem)] flex items-center py-16">
      <main className="max-w-7xl mx-auto px-6 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="space-y-8 animate-float" style={{ animationDuration: '5s' }}>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
              Welcome to VyapaarSathi AI
            </h1>

            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">
              AI-Powered Business Intelligence for Merchants
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Transform your business with intelligent insights, automated recommendations,
              and real-time analytics. Make data-driven decisions that drive growth and profitability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-center"
              >
                View Dashboard
              </Link>

              <Link
                to="/ai-summary"
                className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 hover:-translate-y-1 shadow-sm transition-all duration-300 text-center"
              >
                Ask AI Assistant
              </Link>
            </div>
          </div>

          {/* Right Side Feature Cards */}
          <div className="space-y-6">
            <article className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-3" aria-hidden="true">📊</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Smart Merchant Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Real-time sales tracking, transaction analytics, and performance metrics at your fingertips.
              </p>
            </article>

            <article className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-3" aria-hidden="true">🤖</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">AI-Powered Insights</h2>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Discover hidden patterns, customer behavior trends, and actionable business intelligence.
              </p>
            </article>

            <article className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-3" aria-hidden="true">🚀</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Growth Recommendations</h2>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Personalized strategies to boost sales, improve customer retention, and scale your business.
              </p>
            </article>
          </div>

        </section>
      </main>
    </div>
  );
}

export default memo(LandingPage);