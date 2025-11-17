import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { AuthUserController } from "../controllers";

export const authUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/login",
    {
      schema: {
        summary: "Auth User",
        description: "Authenticate a user",
        operationId: "authUser",
        tags: ["auth"],
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
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
    new AuthUserController().handle as any
  );
};
