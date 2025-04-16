import { FastifyReply, FastifyRequest } from "fastify";
import { ParamsSchema, UpdateUserSchema } from "../schema/user";
import { UpdateUserService } from "../services";

class UpdateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = UpdateUserSchema;

    const { name } = bodySchema.parse(req.body);

    const paramsSchema = ParamsSchema;

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
