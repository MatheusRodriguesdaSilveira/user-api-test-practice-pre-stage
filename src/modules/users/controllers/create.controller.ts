import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserSchema } from "../schema/user";
import { CreateUserService } from "../services";

class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const bodySchema = CreateUserSchema;

      const { name, email, password } = bodySchema.parse(req.body);

      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ name, email, password });

      return reply.status(201).send(user);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }
}

export { CreateUserController };
