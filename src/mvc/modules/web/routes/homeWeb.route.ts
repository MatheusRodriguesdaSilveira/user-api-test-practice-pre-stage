import { FastifyInstance } from "fastify";
import { homeController } from "../controllers/home.controller";

export async function homeWebRoutes(app: FastifyInstance) {
  // Rota GET para a página inicial (Home Page)
  app.get("/", homeController);
}
