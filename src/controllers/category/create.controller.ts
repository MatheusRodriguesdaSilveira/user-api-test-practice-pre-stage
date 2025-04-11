import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCategoryService } from "../../services/category/create.service";
import { CreateCategorySchema } from "../../shared/schema/category";

class CreateCategoryController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const bodySchema = CreateCategorySchema;

      const { name } = bodySchema.parse(req.body);

      const createCategoryService = new CreateCategoryService();
      const category = await createCategoryService.execute({
        name,
      });

      return reply.status(201).send(category);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateCategoryController };
