import { Router } from "express";
import { sendPaymentEmailController } from "../controllers/payment.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { paymentEmailSchema } from "../validators/payment.validator.js";

const router = Router();

router.post("/payment/send-email", validateBody(paymentEmailSchema), sendPaymentEmailController);

export default router;
