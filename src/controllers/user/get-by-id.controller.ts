import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetUserByIdService } from "../../services/user/get-by-id.service";

class GetUserByIdController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      user_id: z.string(),
    });

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
