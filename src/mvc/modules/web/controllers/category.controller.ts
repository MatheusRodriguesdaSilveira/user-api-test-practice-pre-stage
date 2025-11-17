import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateCategoryService,
  DeleteCategoryService,
  GetCategoriesService,
} from "../../category";
import { AppError } from "../../../../shared/errors/app-error";

const getCategoriesService = new GetCategoriesService();
const createCategoryService = new CreateCategoryService();
const deleteCategoryService = new DeleteCategoryService();

// ----------------------------------------------------------------------
// Rota GET /admin/category/list (Ver Categorias)
// ----------------------------------------------------------------------
export async function showCategoryList(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await getCategoriesService.execute();

    return reply.view("category/list.ejs", {
      title: "Gerenciar Categorias",
      categories: categories,
    });
  } catch (error) {
    console.error("Erro ao carregar lista de categorias:", error);
    return reply
      .status(500)
      .send({ message: "Erro interno ao carregar dados." });
  }
}

// ----------------------------------------------------------------------
// Rota GET /admin/category/create (Mostrar Formulário)
// ----------------------------------------------------------------------
export async function showCategoryForm(
  req: FastifyRequest,
  reply: FastifyReply
) {
  return reply.view("category/create-category.ejs", {
    title: "Criar Nova Categoria",
    error: undefined,
    formData: undefined,
    message: undefined,
  });
}

// ----------------------------------------------------------------------
// Rota POST /admin/category/create (Processar Criação)
// ----------------------------------------------------------------------
export async function createCategory(req: FastifyRequest, reply: FastifyReply) {
  const data = req.body as { name: string; description?: string };

  try {
    await createCategoryService.execute(data); // Sucesso: Redireciona para a lista para ver a nova categoria

    return reply.redirect("/admin/category/list");
  } catch (error) {
    // Falha: Re-renderiza o formulário com o erro e os dados preenchidos
    let errorMessage = "Erro ao processar criação.";

    if (error instanceof AppError) {
      errorMessage = error.message;
    } else {
      console.error(error);
    }

    return reply.view("category/create-category.ejs", {
      title: "Criar Nova Categoria",
      error: errorMessage,
      formData: data,
      message: undefined,
    });
  }
}

// ----------------------------------------------------------------------
// Rota DELETE /admin/category/:id/delete (Excluir Categoria)
// ----------------------------------------------------------------------
export async function deleteCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    // 1. Chama o serviço que executa a exclusão em cascata
    await deleteCategoryService.execute(id); // 2. Sucesso: Redireciona para a lista de categorias

    return reply.redirect("/admin/category/list");
  } catch (error) {
    // 3. Falha: Loga o erro e redireciona para a lista (para recarregar)
    console.error("Erro ao deletar categoria:", error); // Redireciona de volta para a lista. Você pode adicionar um tratamento de erro mais // visível se o seu sistema de views suportar parâmetros de query ou flash messages.

    return reply.redirect("/admin/category/list");
  }
}
