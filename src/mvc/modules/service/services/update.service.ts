import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";
import { IUpdateServiceRequest } from "../dtos/service-request";
class UpdateServiceService {
  async execute({
    service_id,
    name,
    description,
    price,
    image,
    category_id,
  }: IUpdateServiceRequest) {
    if (!service_id) {
      throw new AppError("ID do serviço é obrigatório", 400);
    }

    // 1. Verificar se o Serviço existe
    const serviceExists = await db.service.findUnique({
      where: { id: service_id },
    });

    if (!serviceExists) {
      throw new AppError("Serviço não encontrado", 404);
    }

    // 2. Montar o objeto de dados para atualização
    const updateData: any = {};

    if (name) {
      if (name.trim() === "") {
        throw new AppError("Nome não pode ser vazio", 400);
      }
      updateData.name = name;
    }

    if (description) {
      if (description.trim() === "") {
        throw new AppError("Descrição não pode ser vazia", 400);
      }
      updateData.description = description;
    }

    if (image) {
      updateData.image = image;
    }

    if (category_id) {
      // Verificar se a nova categoria existe
      const categoryExists = await db.category.findUnique({
        where: { id: category_id },
      });
      if (!categoryExists) {
        throw new AppError("Categoria informada não existe", 404);
      }
      updateData.category_id = category_id;
    }

    if (price !== undefined) {
      if (isNaN(price) || price < 0) {
        throw new AppError("Preço inválido", 400);
      }
      updateData.price = price;
    }

    const updatedService = await db.service.update({
      where: {
        id: service_id,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedService;
  }
}

export { UpdateServiceService };
