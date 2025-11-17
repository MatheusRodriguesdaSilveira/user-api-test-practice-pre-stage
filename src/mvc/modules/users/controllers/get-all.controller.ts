import { FastifyReply, FastifyRequest } from "fastify";
import { GetUsersService } from "../services";

class GetUsersController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const users = await new GetUsersService().execute();
    return reply.status(201).send(users);
  }
}

export { GetUsersController };
