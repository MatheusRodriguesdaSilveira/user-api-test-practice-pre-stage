import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserByIdService } from "../../services/user/get-by-id.service";
import { ParamsSchema } from "../../shared/schema/user";

class GetUserByIdController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = ParamsSchema;

    const { user_id } = paramsSchema.parse(req.params);

    try {
      const user = new GetUserByIdService().execute(user_id);

      return reply.status(200).send(user);
    } catch (error: any) {
      console.error("Error fetching user by ID:", error);
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { GetUserByIdController };
