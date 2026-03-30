import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function loginWithEnvUser(email, password) {
  const expectedEmail = env.ADMIN_EMAIL;
  const expectedPassword = env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    const err = new Error("Auth is not configured on server");
    err.status = 503;
    throw err;
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign({ email, role: "admin" }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      email,
      role: "admin",
    },
  };
}
