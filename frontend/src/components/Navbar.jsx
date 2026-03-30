import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  // Default to false (Light mode) on first load
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Dark mode toggle effect (Force manual control)
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <nav className="sticky top-0 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm px-4 md:px-8 py-4 z-50 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent italic tracking-tight drop-shadow-sm">
          VyapaarSathi AI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/insights" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Insights</Link>
          <Link to="/recommendations" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Recommendations</Link>
          <Link to="/ai-summary" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Ask AI</Link>
          <Link to="/csv-analysis" className="hover:text-blue-600 dark:hover:text-blue-400 transition">CSV Analysis</Link>
          
          {/* Dark Mode Toggle - Desktop */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition ml-2 border border-gray-200 dark:border-gray-700 shadow-sm"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Controls (Dark Mode Toggle + Hamburger) */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Dark Mode Toggle - Mobile */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 text-lg rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition p-2 rounded focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out origin-top ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-4 text-gray-700 dark:text-gray-200 font-medium">
          <Link onClick={() => setOpen(false)} to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          <Link onClick={() => setOpen(false)} to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Dashboard</Link>
          <Link onClick={() => setOpen(false)} to="/insights" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Insights</Link>
          <Link onClick={() => setOpen(false)} to="/recommendations" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Recommendations</Link>
          <Link onClick={() => setOpen(false)} to="/ai-summary" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Ask AI</Link>
          <Link onClick={() => setOpen(false)} to="/csv-analysis" className="hover:text-blue-600 dark:hover:text-blue-400 transition pb-2">CSV Analysis</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;