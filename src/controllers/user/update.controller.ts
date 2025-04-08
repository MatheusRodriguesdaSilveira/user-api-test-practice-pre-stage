import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateUserService } from "../../services";

class UpdateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string(),
    });

    const { name } = bodySchema.parse(req.body);

    const paramsSchema = z.object({
      user_id: z.string(),
    });

    const { user_id } = paramsSchema.parse(req.params);

    try {
      const user = await new UpdateUserService().execute({
        user_id,
        name,
      });

      return reply.status(200).send(user);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { UpdateUserController };
