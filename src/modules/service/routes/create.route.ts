import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateServiceController } from "../controllers";

export const createServiceRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/service",
    {
      schema: {
        summary: "Create Service",
        description: "Create a new service",
        operationId: "createService",
        tags: ["service"],
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            image: z.string(),
            category_id: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    new CreateServiceController().handle as any
  );
};
