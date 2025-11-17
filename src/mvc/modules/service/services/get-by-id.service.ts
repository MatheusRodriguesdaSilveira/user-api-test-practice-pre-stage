import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class GetServiceByIdService {
  async execute(service_id: string) {
    if (!service_id) {
      throw new AppError("ID do serviço é obrigatório.", 400);
    }

    const service = await db.service.findUnique({
      where: {
        id: service_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        category_id: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!service) {
      throw new AppError("Serviço não encontrado.", 404);
    }

    return service;
  }
}

export { GetServiceByIdService };
