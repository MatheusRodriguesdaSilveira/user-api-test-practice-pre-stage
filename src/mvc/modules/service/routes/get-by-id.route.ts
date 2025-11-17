import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetServiceByIdController } from "../controllers/get-by-id.controller";

export const getServiceIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/services/:service_id",
    {
      schema: {
        summary: "Get Service by ID",
        description: "Get a Service by ID",
        operationId: "getServiceById",
        tags: ["service"],
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            image: z.string(),
            items: z.any(),
            category_id: z.string(),
            created_at: z.string(),
            updated_at: z.string(),
          }),
          400: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    new GetServiceByIdController().handle as any
  );
};
