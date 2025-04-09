import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthUserService } from "../../services";

class AuthUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const { email, password } = bodySchema.parse(req.body);

      const auth = await new AuthUserService().execute({ email, password });

      return reply.status(200).send(auth);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { AuthUserController };
