import { z } from "zod";

export const askSchema = z.object({
  question: z.string().trim().min(1, "question is required"),
  language: z.string().trim().default("English"),
});

export const aiGenerateSchema = z.object({
  prompt: z.string().trim().min(1, "prompt is required"),
  language: z.string().trim().default("English"),
});
