import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/auth/login", validateBody(loginSchema), loginController);

export default router;
