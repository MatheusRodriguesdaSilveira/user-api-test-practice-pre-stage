import { db } from "../../../prisma";
import { AppError } from "../../../shared/errors/app-error";

class DeleteServiceService {
  async execute(service_id: string) {
    const serviceExists = await db.service.findUnique({
      where: {
        id: service_id,
      },
    });

    if (!serviceExists) {
      throw new AppError("Service not found", 404);
    }

    const service = await db.service.delete({
      where: {
        id: service_id,
      },
    });

    return { service };
  }
}

export { DeleteServiceService };
