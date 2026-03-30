import { Router } from "express";
import { aiGenerateController, askController } from "../controllers/ai.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { aiGenerateSchema, askSchema } from "../validators/ai.validator.js";

const router = Router();

router.post("/ask", validateBody(askSchema), askController);
router.post("/ai/generate", validateBody(aiGenerateSchema), aiGenerateController);

export default router;
