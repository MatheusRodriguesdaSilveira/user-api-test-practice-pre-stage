import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateAppointmentController } from "../controllers/create.controller";
import { CreateAppointmentSchema } from "../schema/appointment";

export const createAppointmentRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/appointment",
    {
      schema: {
        summary: "Create Appointment",
        description: "Create a new Appointment",
        operationId: "createAppointment",
        tags: ["appointment"],
        body: CreateAppointmentSchema,
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
    new CreateAppointmentController().handle as any
  );
};
