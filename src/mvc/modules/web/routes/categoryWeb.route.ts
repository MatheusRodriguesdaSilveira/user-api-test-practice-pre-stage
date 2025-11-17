import { FastifyInstance } from "fastify";
import {
  showCategoryList,
  showCategoryForm,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller";

// A função de rotas DEVE ser exportada como async
export async function categoryWebRoutes(app: FastifyInstance) {
  // Rota 1: GET /admin/category/list -> Ver a lista
  app.get("/admin/category/list", showCategoryList); // <--- A rota que está dando 404

  // Rota 2: GET /admin/category/create -> Mostrar o formulário de criação
  app.get("/admin/category/create", showCategoryForm);

  // Rota 3: POST /admin/category/create -> Processar o formulário
  app.post("/admin/category/create", createCategory);

  // Rota 4: POST /admin/category/:id/delete -> Processar a exclusão
  app.post("/admin/category/:id/delete", deleteCategory);
}
