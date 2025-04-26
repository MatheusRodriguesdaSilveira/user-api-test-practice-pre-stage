import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetServicesController } from "../controllers";

export const getServicesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/services",
    {
      schema: {
        summary: "Get Services",
        description: "Get all services",
        operationId: "getServices",
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
    new GetServicesController().handle as any
  );
};
