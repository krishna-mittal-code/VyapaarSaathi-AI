import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function createTransport() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.SMTP_FROM) {
    const err = new Error("SMTP is not configured");
    err.status = 503;
    throw err;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: Number(env.SMTP_PORT) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

export async function sendPaymentEmail({ to, subject, text }) {
  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: env.SMTP_FROM,
    to,
    subject,
    text,
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
  };
}
