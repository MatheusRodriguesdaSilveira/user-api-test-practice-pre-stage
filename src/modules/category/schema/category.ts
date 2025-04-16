import { z } from "zod";

export const ParamsSchema = z.object({
  user_id: z.string(),
});

export const CreateCategorySchema = z.object({
  name: z.string(),
});
