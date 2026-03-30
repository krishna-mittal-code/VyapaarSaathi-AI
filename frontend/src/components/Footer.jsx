import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center">
          VyapaarSaathi AI | All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;