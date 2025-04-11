import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateCategoryController } from "../../controllers";

export const createCategoryRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/category",
    {
      schema: {
        summary: "Create Category",
        description: "Create a new category",
        operationId: "createCategory",
        tags: ["category"],
        body: z.object({
          name: z.string().min(1).max(100),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    new CreateCategoryController().handle as any
  );
};
