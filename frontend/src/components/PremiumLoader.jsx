import React from "react";

// Shared blue spinner SVG to keep the code clean
const Spinner = ({ className }) => (
  <svg
    className={`animate-spin text-blue-600 dark:text-blue-500 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export function PremiumPageLoader() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center min-h-[50vh]">
      <Spinner className="h-10 w-10 mb-4" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    </div>
  );
}

export function PremiumSectionLoader() {
  return (
    <div className="w-full h-48 flex items-center justify-center bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors duration-300">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export function PremiumInlineLoader() {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Spinner className="h-4 w-4" />
      <span>Loading...</span>
    </div>
  );
}