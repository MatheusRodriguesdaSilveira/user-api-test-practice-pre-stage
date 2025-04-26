import { db } from "../../../prisma";

class GetServicesService {
  async execute() {
    const services = await db.service.findMany();

    return services;
  }
}

export { GetServicesService };
