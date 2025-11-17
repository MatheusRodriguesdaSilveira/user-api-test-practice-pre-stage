import { FastifyRequest, FastifyReply } from "fastify";
import { GetServicesByIdService } from "../services/get-by-id.service";
import { ParamsSchema } from "../schema/service";

class GetServiceByIdController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { service_id } = ParamsSchema.parse(req.params);

    const getServiceById = new GetServicesByIdService();
    const service = await getServiceById.execute(service_id);

    if (!service) {
      return reply.status(404).send({ message: "Service not found" });
    }

    return reply.status(200).send(service);
  }
}
export { GetServiceByIdController };
