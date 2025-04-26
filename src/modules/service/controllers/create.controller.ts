import { FastifyRequest, FastifyReply } from "fastify";
import { createServiceSchema } from "../schema/service";
import { CreateServiceService } from "../services";

class CreateServiceController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = createServiceSchema;

    const { name, description, category_id } = bodySchema.parse(req.body);
    const file = (req as any).file;

    if (!file) {
      return reply.status(400).send({ message: "Arquivo é obrigatório" });
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return reply
        .status(400)
        .send({ message: "Tipo de arquivo não permitido" });
    }

    const image = `http://localhost:3333/uploads/${file.filename}`;

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
