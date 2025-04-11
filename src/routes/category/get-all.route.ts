import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetCategoriesController } from "../../controllers";

export const getCategoriesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/categories",
    {
      schema: {
        summary: "Get Categories",
        description: "Get a list of categories",
        operationId: "getCategories",
        tags: ["category"],
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
          }),
        },
      },
    },
    new GetCategoriesController().handle as any
  );
};
