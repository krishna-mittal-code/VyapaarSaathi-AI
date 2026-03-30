import React, { useState } from 'react';

const TransactionAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resultData, setResultData] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // File selection handle karna
  const handleFileChange = (e) => {
    setErrorMsg("");
    const selectedFile = e.target.files && e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // Drag & Drop features
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // CSV Validation
  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith('.csv')) {
      setErrorMsg("Galat file format! Kripya sirf CSV file upload karein.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  // Backend API Call
  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("select a CSV file!");
      return;
    }
    
    setLoading(true);
    setErrorMsg("");
    setResultData(null);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error!");

      const data = await response.json();
      if(data.error) throw new Error(data.error);
      
      setResultData(data);
    } catch (err) {
      setErrorMsg(err.message || "Network error. please check your backend ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-4 animate-float" style={{ animationDuration: '6s' }}>
      
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm mb-3">
          AI Transaction Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
          please upload your transaction CSV file. AI will analyze it and provide you with insights and a downloadable report!
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-slate-700 transition-all duration-300">
        
        {/* Elegant Error Handling (No Alerts) */}
        {errorMsg && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50 animate-pulse">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p className="font-semibold">{errorMsg}</p>
          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        <div 
          className={`relative group flex flex-col items-center justify-center p-12 border-3 border-dashed rounded-2xl transition-all duration-300 ${
            dragActive 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-slate-700/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={loading}
          />
          
          <div className="text-center pointer-events-none">
            <svg className={`mx-auto h-16 w-16 mb-4 transition-colors duration-300 ${file ? "text-green-500" : "text-blue-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {file ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              )}
            </svg>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-1">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {file ? "File selected and ready to analyze!" : "CSV (Max 10MB)"}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleUpload}
            disabled={loading || !file}
            className={`relative overflow-hidden group px-8 py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 w-full md:w-auto min-w-[200px] ${
              loading || !file 
                ? "bg-gray-400 dark:bg-slate-600 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing AI Data...
              </span>
            ) : "Analyze Transactions"}
            
            {/* Custom loader bar animation when loading */}
            {loading && <div className="absolute bottom-0 left-0 h-1 bg-white/40 animate-loaderbar rounded-b-xl"></div>}
          </button>
        </div>

        {/* Dashboard Results Section */}
        {resultData && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700 animate-float" style={{ animationDuration: '4s' }}>
            <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <span>📊</span> Analysis Dashboard
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Stat Card 1 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1 text-sm uppercase tracking-wider">Total Transactions</p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{resultData.total_rows}</p>
              </div>
              
              {/* Stat Card 2 */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800/50 hover:shadow-md transition-shadow">
                <p className="text-green-600 dark:text-green-400 font-semibold mb-1 text-sm uppercase tracking-wider">Total Revenue Detected</p>
                <p className="text-4xl font-black text-gray-900 dark:text-white">₹{resultData.total_revenue}</p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <a 
                href={`data:text/csv;charset=utf-8,${encodeURIComponent(resultData.downloadable_csv)}`} 
                download="AI_Processed_Report.csv"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-bold rounded-lg border-2 border-gray-200 dark:border-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Processed Report
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TransactionAnalysis;