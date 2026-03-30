import { sendPaymentEmail } from "../services/email.service.js";
import { ok } from "../utils/response.util.js";

export async function sendPaymentEmailController(req, res, next) {
  try {
    const result = await sendPaymentEmail(req.validatedBody);
    return ok(res, {
      success: true,
      ...result,
    });
  } catch (err) {
    return next(err);
  }
}
