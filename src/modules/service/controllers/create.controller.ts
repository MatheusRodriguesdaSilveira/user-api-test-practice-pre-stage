import { FastifyRequest, FastifyReply } from "fastify";
import { createServiceSchema } from "../schema/service";
import { CreateServiceService } from "../services";

class CreateServiceController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const createService = new CreateServiceService();
    const bodySchema = createServiceSchema;

    const { name, description, category_id } = bodySchema.parse(req.body);
    const file = (req as any).file;

    if (!file) {
      return reply.status(400).send({ message: "Arquivo é obrigatório" });
    }

    const imageUrl = `http://localhost:3333/uploads/${file.filename}`;

    const service = await createService.execute({
      name,
      description,
      image: imageUrl,
      category_id,
    });

    return reply.status(201).send(service);
  }
}

export { CreateServiceController };
