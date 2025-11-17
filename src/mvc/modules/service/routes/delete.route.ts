import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { DeleteServiceController } from "../controllers";

export const deleteServiceRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/service/:service_id",
    {
      schema: {
        summary: "Delete Service",
        description: "Delete a service by ID",
        operationId: "deleteService",
        tags: ["service"],
        params: z.object({
          service_id: z.string(),
        }),
        response: {
          200: z.object({
            service: z.object({
              message: z.string().default("Service deleted successfully"),
              id: z.string(),
              name: z.string(),
            }),
          }),
          400: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    new DeleteServiceController().handle as any
  );
};
