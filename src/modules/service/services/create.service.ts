import { db } from "../../../prisma";
import { AppError } from "../../../shared/errors/app-error";
import { ICreateServiceRequest } from "../dtos/service-request";

class CreateServiceService {
  async execute({
    name,
    description,
    image,
    category_id,
  }: ICreateServiceRequest) {
    if (!name || !description || !image || !category_id) {
      throw new AppError("Todos os campos são obrigatórios", 400);
    }

    // Verifica se a categoria existe
    const categoryExists = await db.category.findUnique({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const service = await db.service.create({
      data: {
        name,
        description,
        image,
        category_id,
      },
    });

    return service;
  }
}

export { CreateServiceService };
