import { z } from "zod";

export const ParamsSchema = z.object({
  user_id: z.string(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UpdateUserSchema = z.object({
  name: z.string(),
});
