import { generateAiAnswer } from "../services/ai.service.js";
import { ok } from "../utils/response.util.js";

export async function askController(req, res, next) {
  try {
    const { question, language } = req.validatedBody;
    const { answer } = await generateAiAnswer(question, language);
    return ok(res, { answer });
  } catch (err) {
    return next(err);
  }
}

export async function aiGenerateController(req, res, next) {
  try {
    const { prompt, language } = req.validatedBody;
    const { answer } = await generateAiAnswer(prompt, language);
    return ok(res, { answer });
  } catch (err) {
    return next(err);
  }
}
