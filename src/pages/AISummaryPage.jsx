import { useState } from "react";
import Navbar from "../components/Navbar";
import merchantData from "../data/merchantData";
import { getAIResponse } from "../utils/insightUtils";

function AISummaryPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(
    "Ask VyapaarSathi AI about your business performance."
  );

  const handleAsk = (customQuestion = question) => {
    const answer = getAIResponse(customQuestion, merchantData);
    setResponse(answer);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ask VyapaarSathi AI</h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ask about your business..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />
            <button
              onClick={() => handleAsk()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Ask AI
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => handleAsk("How is my business doing today?")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            How is my business doing today?
          </button>

          <button
            onClick={() => handleAsk("When do I get most customers?")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            When do I get most customers?
          </button>

          <button
            onClick={() => handleAsk("What should I improve?")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            What should I improve?
          </button>

          <button
            onClick={() => handleAsk("What should I stock more?")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            What should I stock more?
          </button>

          <button
            onClick={() => handleAsk("How are repeat customers doing?")}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            How are repeat customers doing?
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">AI Response</h2>
          <p className="text-gray-700 text-lg">{response}</p>
        </div>
      </div>
    </div>
  );
}

export default AISummaryPage;