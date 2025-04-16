import { FastifyRequest, FastifyReply } from "fastify";
import { createServiceSchema } from "../schema/service";
import { CreateServiceService } from "../services";

class CreateServiceController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = createServiceSchema;

    const { name, description, image, category_id } = bodySchema.parse(
      req.body
    );

    const createService = new CreateServiceService();

    const service = await createService.execute({
      name,
      description,
      image,
      category_id,
    });

    return reply.status(201).send(service);
  }
}

export { CreateServiceController };
