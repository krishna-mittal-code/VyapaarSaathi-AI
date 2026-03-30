import { env } from "../config/env.js";
import { SUPPORTED_LANGUAGES } from "../config/constants.js";

// Normalize language
function normalizeLanguage(language) {
  const target = (language || "English").trim();
  const found = SUPPORTED_LANGUAGES.find(
    (l) => l.toLowerCase() === target.toLowerCase()
  );
  return found || "English";
}

// Build messages
function buildMessages(question, language) {
  return [
    {
      role: "system",
      content:
        "You are a merchant business assistant. Keep responses concise, practical, and accurate.",
    },
    {
      role: "user",
      content: `Answer in ${language}. Question: ${question}`,
    },
  ];
}

// 🔥 Groq AI call
async function askGroq(messages) {
  if (!env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Groq error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return (
    data?.choices?.[0]?.message?.content?.trim() ||
    "No response generated."
  );
}

// 🔥 MAIN FUNCTION (clean + no fallback)
export async function generateAiAnswer(question, languageInput) {
  const language = normalizeLanguage(languageInput);
  const messages = buildMessages(question, language);

  try {
    console.log("Using Groq...");
    const answer = await askGroq(messages);
    return { answer, language };
  } catch (err) {
    console.error("Groq failed:");
    console.error(err);
    throw err;
  }
}