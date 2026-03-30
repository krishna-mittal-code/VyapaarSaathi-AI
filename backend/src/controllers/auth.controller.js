import { loginWithEnvUser } from "../services/auth.service.js";
import { ok } from "../utils/response.util.js";

export function loginController(req, res, next) {
  try {
    const { email, password } = req.validatedBody;
    const data = loginWithEnvUser(email, password);
    return ok(res, data);
  } catch (err) {
    return next(err);
  }
}
