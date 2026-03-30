import { z } from "zod";

export const paymentEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().trim().min(1),
  text: z.string().trim().min(1),
});
