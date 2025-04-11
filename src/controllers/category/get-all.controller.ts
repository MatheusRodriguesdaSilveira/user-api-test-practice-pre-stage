import { FastifyReply, FastifyRequest } from "fastify";
import { GetCategoriesService } from "../../services";

class GetCategoriesController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const categories = await new GetCategoriesService().execute();
    return reply.status(201).send(categories);
  }
}

export { GetCategoriesController };
