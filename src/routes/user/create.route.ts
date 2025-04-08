import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateUserController } from "../../controllers";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        summary: "Create User",
        description: "Create a new user",
        operationId: "createUser",
        tags: ["user"],
        body: z.object({
          name: z.string().min(1).max(100),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
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
    new CreateUserController().handle as any
  );
};
