import { FastifyReply, FastifyRequest } from "fastify";
import { ParamsSchema } from "../schema/service";
import { DeleteServiceService } from "../services";

class DeleteServiceController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = ParamsSchema;

    const { service_id } = paramsSchema.parse(req.params);

    try {
      const service = await new DeleteServiceService().execute(service_id);

      return reply.status(200).send(service);
    } catch (error: any) {
      console.error("Error try delete service:", error);
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { DeleteServiceController };
