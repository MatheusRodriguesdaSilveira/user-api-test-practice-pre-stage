import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class DeleteCategoryService {
  async execute(category_id: string) {
    // 1. Verificar se a categoria existe
    const categoryExists = await db.category.findUnique({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new AppError("Category not found", 404);
    } // 2. 🚨 TRATAR RELACIONAMENTOS (Foreign Key Constraint) // Antes de deletar a categoria, todos os Serviços associados // a ela devem ser tratados (deletados ou ter o campo category_id setado para NULL). // Se você tentar deletar uma categoria que tem serviços, o Prisma/Postgres // irá barrar a ação com um erro de Foreign Key.

    // Opção Recomendada: Deletar todos os serviços associados à categoria.
    // A. Deletar Serviços (e consequentemente, os Itens relacionados ao Serviço)
    // Para um DELETE em cascata, primeiro precisamos dos IDs dos serviços.
    const servicesToDelete = await db.service.findMany({
      where: {
        category_id: category_id,
      },
      select: {
        id: true,
      },
    });

    const serviceIds = servicesToDelete.map((service) => service.id);

    if (serviceIds.length > 0) {
      // B. Deletar Itens (agendamentos) relacionados a estes Serviços
      await db.item.deleteMany({
        where: {
          service_id: {
            in: serviceIds,
          },
        },
      });

      // C. Deletar todos os Serviços
      await db.service.deleteMany({
        where: {
          category_id: category_id,
        },
      });
    } // 3. Deletar a Categoria

    const category = await db.category.delete({
      where: {
        id: category_id,
      },
    });

    return { category };
  }
}

export { DeleteCategoryService };
