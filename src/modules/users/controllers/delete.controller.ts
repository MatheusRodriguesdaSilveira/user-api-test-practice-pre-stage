import { FastifyReply, FastifyRequest } from "fastify";
import { ParamsSchema } from "../schema/user";
import { DeleteUserService } from "../services";

class DeleteUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = ParamsSchema;

    const { user_id } = paramsSchema.parse(req.params);

    try {
      const user = await new DeleteUserService().execute(user_id);

      return reply.status(200).send(user);
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error);
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { DeleteUserController };
