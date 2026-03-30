import googleTTS from "google-tts-api";
import { env } from "../config/env.js";
import { LANGUAGE_CODE_MAP } from "../config/constants.js";

async function transcribeWithGroq(audioBuffer, filename = "audio.wav") {
  if (!env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is required for transcription");
  }

  const form = new FormData();
  const blob = new Blob([audioBuffer], { type: "audio/wav" });
  form.append("file", blob, filename);
  form.append("model", env.GROQ_STT_MODEL);

  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
    },
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Transcription failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return data?.text?.trim() || "";
}

export async function transcribeAudio(audioBuffer, filename) {
  return transcribeWithGroq(audioBuffer, filename);
}

export function buildTtsUrl(text, language = "English") {
  const langCode = LANGUAGE_CODE_MAP[language] || "en";
  return googleTTS.getAudioUrl(text, {
    lang: langCode,
    slow: false,
    host: "https://translate.google.com",
  });
}
