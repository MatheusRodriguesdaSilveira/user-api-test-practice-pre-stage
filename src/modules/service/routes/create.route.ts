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
    new CreateServiceController().handle as any
  );
};
