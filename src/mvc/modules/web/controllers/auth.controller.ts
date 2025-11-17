import { FastifyReply, FastifyRequest } from "fastify";
import { callApi } from "../utils/api-client";

export async function showLoginPage(req: FastifyRequest, reply: FastifyReply) {
  const query = req.query as { error?: string; message?: string };

  return reply.view("auth/login", {
    title: "Login Administrativo",
    error: query.error,
    message: query.message,
  });
}

export async function showRegisterPage(
  req: FastifyRequest,
  reply: FastifyReply
) {
  return reply.view("auth/register", {
    title: "Cadastrar Novo Administrador",
    error: (req.query as any).error,
  });
}

export async function handleLogout(req: FastifyRequest, reply: FastifyReply) {
  return reply.redirect("/web/login");
}

export async function handleLogin(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = req.body as any;

  try {
    const response = await callApi("POST", "/login", { email, password });

    // Sucesso: Redireciona para o Dashboard
    const token = response.token as string;

    reply.setCookie("auth_token", token, {
      path: "/",
      httpOnly: true, // Impedir acesso via JavaScript no navegador
      maxAge: 30 * 24 * 60 * 60, // Exemplo: 30 dias
      // secure: true // Usar em produção com HTTPS
    });

    return reply.redirect("/admin/dashboard");
  } catch (error: any) {
    // Falha: Redireciona de volta para o login com mensagem de erro
    const errorMessage = error.message || "Credenciais inválidas.";
    return reply.redirect(
      `/web/login?error=${encodeURIComponent(errorMessage)}`
    );
  }
}

// Assumindo que seu body de Cadastro API seja: { name, email, password }
export async function handleRegister(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = req.body as any; // Captura dados do formulário

  try {
    // 1. Chama o endpoint de Cadastro da API (POST /users) usando o utilitário callApi
    // Sua API de Backend fará a validação, hash da senha e salvará o User no DB.
    await callApi("POST", "/users", { name, email, password });

    // 2. Sucesso: Redireciona para a página de login com mensagem de sucesso (verde)
    return reply.redirect(
      `/web/login?message=${encodeURIComponent(
        "Usuário criado com sucesso! Faça login."
      )}`
    );
  } catch (error: any) {
    // 3. Falha: Redireciona de volta para a tela de registro com a mensagem de erro
    const errorMessage = error.message || "Erro ao cadastrar usuário.";
    return reply.redirect(
      `/web/register?error=${encodeURIComponent(errorMessage)}`
    );
  }
}
