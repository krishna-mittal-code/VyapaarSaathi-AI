import { generateAiAnswer } from "../services/ai.service.js";
import { buildTtsUrl, transcribeAudio } from "../services/voice.service.js";
import { fail, ok } from "../utils/response.util.js";

export async function voiceProcessController(req, res, next) {
  try {
    const language = (req.body?.language || "English").trim();
    const textFromBody = (req.body?.text || "").trim();

    let transcript = textFromBody;

    if (!transcript) {
      if (!req.file) return fail(res, 400, "Either text or audio file is required");
      transcript = await transcribeAudio(req.file.buffer, req.file.originalname);
    }

    if (!transcript) return fail(res, 400, "No speech detected");

    const { answer } = await generateAiAnswer(transcript, language);
    const ttsUrl = buildTtsUrl(answer, language);

    return ok(res, {
      transcript,
      answer,
      tts_url: ttsUrl,
    });
  } catch (err) {
    return next(err);
  }
}
