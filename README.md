# 🚀 VyapaarSaathi AI – Intelligent Business Intelligence Platform

[![Frontend](https://img.shields.io/badge/Frontend-Live-blue?style=flat-square&logo=vercel)](https://vyapaar-saathi-ai.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-API-green?style=flat-square&logo=fastapi)](http://vyapaar-saathi-ai.vercel.app/health)
[![License](https://img.shields.io/badge/License-Internal-lightgrey?style=flat-square)](#)

VyapaarSaathi AI is a modern, AI-powered business intelligence platform designed for merchants and small businesses to monitor performance, analyze trends, and receive actionable insights in real time.  

Built with a clean dual-architecture system, it combines a high-performance React dashboard with a lightweight FastAPI backend to deliver fast, intelligent, and scalable business analytics.

---

## ✨ Key Features

### 📊 Smart Business Dashboard
- Real-time sales metrics and transaction summaries  
- Clean and responsive UI optimized for performance  
- Visual analytics powered by charts and data models  

### 🧠 AI-Powered Insights & Recommendations
- Intelligent analysis based on merchant data  
- Actionable business recommendations  
- Behavior-driven insights for growth optimization  

### 🤖 AI Assistant (Multilingual + Voice Enabled)
- Ask business-related questions in multiple languages  
- Speech-to-text input and text-to-speech output  
- Fast and lightweight AI response system  

### ⚡ High Performance Architecture
- Fast frontend powered by Vite  
- Optimized backend with minimal latency  
- Seamless frontend-backend communication via API proxy  

### 🔐 Scalable & Developer-Friendly Design
- Clean modular structure  
- Easy to extend and integrate  
- Designed for real-world business use cases  

---

## 🌐 Live Deployment

- **Frontend (Vercel):** https://vyapaar-saathi-ai.vercel.app  
- **Backend (API):** http://localhost:8000  

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router, Recharts, Tailwind CSS, Vite  
- **Backend:** FastAPI, Uvicorn, Pydantic  
- **Data Layer:** Local JSON-based merchant dataset  

## Project Structure (Complete Tree)

~~~text
VyapaarSaathi-AI/
|-- .gitignore
|-- README.md
|-- backend/
|   |-- app.py
|   |-- README.md
|   |-- requirements.txt
|   `-- __pycache__/                    (runtime generated)
`-- frontend/
    |-- eslint.config.js
    |-- index.html
    |-- package-lock.json
    |-- package.json
    |-- vite.config.js
    |-- public/
    |   |-- favicon.svg
    |   `-- icons.svg
    `-- src/
        |-- App.css
        |-- App.jsx
        |-- index.css
        |-- main.jsx
        |-- assets/
        |   |-- hero.png
        |   |-- react.svg
        |   `-- vite.svg
        |-- components/
        |   |-- AISummaryCharts.jsx
        |   |-- AISummaryHealthCards.jsx
        |   |-- AISummaryPanel.jsx
        |   |-- DashboardMetrics.jsx
        |   |-- Navbar.jsx
        |   |-- PremiumLoader.jsx
        |   |-- ReportsTable.jsx
        |   `-- WeeklySalesChart.jsx
        |-- data/
        |   |-- merchantData.js
        |   `-- merchantData.json
        |-- pages/
        |   |-- AISummaryPage.jsx
        |   |-- Dashboard.jsx
        |   |-- InsightsPage.jsx
        |   |-- LandingPage.jsx
        |   `-- RecommendationsPage.jsx
        `-- utils/
            |-- dashboardUtils.js
            `-- insightUtils.js
~~~

## How It Works

### Frontend flow

1. index.html mounts React app at root element
2. src/main.jsx renders src/App.jsx
3. src/App.jsx sets routes:
   - /
   - /dashboard
   - /insights
   - /recommendations
   - /ai-summary
4. Pages consume data from src/data/merchantData.json (directly or via src/data/merchantData.js)
5. AI Summary page sends POST requests to /api/ask

### Backend flow

1. backend/app.py loads merchant data and precomputes summary stats
2. POST /api/ask receives question and language
3. Backend generates a rule-based response and returns translated output
4. GET /health returns service status and supported languages

### Frontend-to-backend connection

- Vite dev server proxy forwards /api requests to http://localhost:8000
- This allows frontend calls like /api/ask without CORS setup during local dev

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.10+
- pip

## Local Setup

### 1) Backend setup

Windows PowerShell:

~~~powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
~~~

macOS/Linux:

~~~bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
~~~

### 2) Frontend setup

Open a second terminal:

~~~bash
cd frontend
npm install
npm run dev
~~~

### 3) Open app

- Frontend: http://localhost:5173
- Backend health: http://localhost:8000/health

## API Reference

### POST /api/ask

Request body:

~~~json
{
  "question": "How is my business doing today?",
  "language": "English"
}
~~~

Response:

~~~json
{
  "answer": "Your business is performing steadily..."
}
~~~

### GET /health

Response includes:
- status
- backend mode
- supported_languages
- ai_mode

## Supported Languages

- English
- Hindi
- Bengali
- Tamil
- Telugu
- French
- Spanish

## NPM Scripts (frontend/package.json)

- dev: Start Vite development server
- build: Build production frontend bundle
- preview: Preview production build
- lint: Run ESLint checks

## Troubleshooting

### Backend cannot find merchant data

If you see an error similar to Merchant data not found, verify the data path in backend/app.py points to the frontend dataset location:

Expected dataset file:
- frontend/src/data/merchantData.json

### API requests fail from AI Summary page

Check that:
- backend is running on port 8000
- frontend is running on port 5173
- Vite proxy is configured in frontend/vite.config.js

### Microphone or speech output not working

Check browser permissions for microphone and audio.

## Build for Production

~~~bash
cd frontend
npm run build
npm run preview
~~~

## License

This project is currently intended for internal/demo use. Add a formal license file if you plan to distribute publicly.
