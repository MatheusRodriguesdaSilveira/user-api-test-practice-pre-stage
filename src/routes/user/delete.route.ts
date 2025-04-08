import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { DeleteUserController } from "../../controllers";

export const deleteUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/user/:user_id",
    {
      schema: {
        summary: "Delete User",
        description: "Delete a user by ID",
        operationId: "deleteUser",
        tags: ["user"],
        params: z.object({
          user_id: z.string(),
        }),
        response: {
          200: z.object({
            user: z.object({
              message: z.string().default("User deleted successfully"),
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
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
    new DeleteUserController().handle as any
  );
};
