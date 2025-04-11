import { FastifyReply, FastifyRequest } from "fastify";
import { AuthUserService } from "../../services";
import { AuthUserSchema } from "../../shared/schema/user";

class AuthUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const bodySchema = AuthUserSchema;

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
