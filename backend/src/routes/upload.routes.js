import { Router } from "express";
import multer from "multer";
import { uploadCsvController } from "../controllers/upload.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload-csv", upload.single("file"), uploadCsvController);

export default router;
