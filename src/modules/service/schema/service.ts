import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  category_id: z.string().uuid("Categoria inválida"),
});

export type CreateServiceDTO = z.infer<typeof createServiceSchema>;
