import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Controller responsável por lidar com a rota principal (Home Page).
 * Sua função é apenas renderizar o template 'index.ejs'.
 */
export async function homeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Não precisa de lógica de negócios (Model/Service) aqui, apenas renderização.

  return reply.view("index", {
    appName: "Agendamento de Serviços",
    welcomeMessage: "Simplifique seu agendamento, veja nossos serviços!",
    // Você pode passar dados dinâmicos futuros aqui (ex: nome do usuário logado)
  });
}
