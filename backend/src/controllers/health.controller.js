import { env } from "../config/env.js";
import { SUPPORTED_LANGUAGES } from "../config/constants.js";

const startedAt = Date.now();

export function healthController(req, res) {
  res.json({
    status: "ok",
    backend: "running",
    ai_mode: "api_provider",
    ai_provider: env.AI_PROVIDER,
    uptime_seconds: Math.round((Date.now() - startedAt) / 1000),
    supported_languages: SUPPORTED_LANGUAGES,
  });
}
