import express from "express";
import helmet from "helmet";

import { corsMiddleware } from "./config/cors.js";
import { apiRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

import aiRoutes from "./routes/ai.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import voiceRoutes from "./routes/voice.routes.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRateLimiter);

  app.use("/api", healthRoutes);
  app.use("/api", aiRoutes);
  app.use("/api", uploadRoutes);
  app.use("/api", voiceRoutes);
  app.use("/api", authRoutes);
  app.use("/api", paymentRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
