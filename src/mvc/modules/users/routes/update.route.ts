import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { UpdateUserController } from "../controllers";

export const updateUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/user/:user_id",
    {
      schema: {
        summary: "Update User",
        description: "Update a user by ID",
        operationId: "updateUser",
        tags: ["user"],
        params: z.object({
          user_id: z.string(),
        }),
        body: z.object({
          name: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    new UpdateUserController().handle as any
  );
};
