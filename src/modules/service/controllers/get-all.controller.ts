import { FastifyRequest, FastifyReply } from "fastify";
import { GetServicesService } from "../services";

class GetServicesController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const services = await new GetServicesService().execute();

    if (!services) {
      return reply.status(404).send({ message: "Serviço não encontrado" });
    }

    return reply.status(200).send(services);
  }
}

export { GetServicesController };
