import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { GetUsersController } from "../../controllers";

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/users/list",
    {
      schema: {
        summary: "Get Users",
        description: "Get a list of users",
        operationId: "getUsers",
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
    new GetUsersController().handle as any
  );
};
