import { FastifyInstance } from "fastify";
import {
  handleLogin,
  handleLogout,
  handleRegister,
  showLoginPage,
  showRegisterPage,
} from "../controllers/auth.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth-handler";
import { showDashboard } from "../controllers/admin.controller";

export async function authWebRoutes(app: FastifyInstance) {
  // 1. GET: Exibe a página de Login
  app.get("/web/login", showLoginPage);

  // 2. POST: Processa o envio do formulário de Login (Autenticação)
  app.post("/web/login", handleLogin);

  // 3. GET: Exibe a página de Cadastro
  app.get("/web/register", showRegisterPage);

  // 4. POST: Processa o envio do formulário de Cadastro (Criação de User)
  app.post("/web/register", handleRegister);

  // 5. GET: Faz o Logout (apenas limpa a sessão/cookie, se implementado)
  app.get("/web/logout", handleLogout);

  app.get("/admin/dashboard", { preHandler: [authMiddleware] }, showDashboard);
}
