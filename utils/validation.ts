import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const expenseSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  paidById: z.string().min(1),
});
