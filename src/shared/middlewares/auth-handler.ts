import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../../validators/env.schema";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply,
  next: () => void
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return reply.status(401).send({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    // Validando o Token
    const { sub } = verify(token, env.JWT_SECRET) as PayLoad;

    req.user_id = sub;

    return next();
  } catch (err) {
    return reply.status(401).send({
      message: "Invalid token",
    });
  }
}
