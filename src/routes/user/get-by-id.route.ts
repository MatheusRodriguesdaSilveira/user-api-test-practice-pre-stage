import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetUserByIdController } from "../../controllers";

export const getUserByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/users/:user_id",
    {
      schema: {
        summary: "Get User by ID",
        description: "Get a user by ID",
        operationId: "getUserById",
        tags: ["user"],
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    new GetUserByIdController().handle as any
  );
};
