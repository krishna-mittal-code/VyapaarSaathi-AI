import { Router } from "express";
import multer from "multer";
import { voiceProcessController } from "../controllers/voice.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

router.post("/voice/process", upload.single("audio"), voiceProcessController);

export default router;
