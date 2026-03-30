import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary' // ✅ Import karo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary> {/* ✅ Yahan wrap kar do */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)