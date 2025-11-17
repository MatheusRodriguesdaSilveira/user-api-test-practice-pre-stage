import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../../validators/env.schema";

interface PayLoad {
  sub: string;
  name: string;
}

export function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
  next: () => void
) {
  // 1. Tenta obter o token do COOKIE (Padrão para Web MVC)
  // Assumimos que o token é salvo no cookie 'auth_token' pelo handleLogin.
  const token = req.cookies.auth_token;

  if (!token) {
    // 2. Falha: Redireciona para o login se não houver token
    return reply.redirect(
      "/web/login?error=" + encodeURIComponent("Acesso negado. Faça login.")
    );
  }

  try {
    // 3. Validando o Token
    const decoded = verify(token, env.JWT_SECRET) as PayLoad;

    // Anexa o ID e Nome do usuário na requisição para uso no Controller
    (req as any).user_id = decoded.sub;
    (req as any).user = { id: decoded.sub, name: decoded.name };

    return next(); // 4. Sucesso: Continua para o Controller showDashboard
  } catch (err) {
    // 5. Falha: Limpa o cookie e redireciona (token inválido/expirado)
    reply.clearCookie("auth_token");
    return reply.redirect(
      "/web/login?error=" + encodeURIComponent("Sessão expirada ou inválida.")
    );
  }
}
