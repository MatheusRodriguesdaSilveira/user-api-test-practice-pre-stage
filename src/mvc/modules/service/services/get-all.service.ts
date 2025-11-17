import { db } from "../../../../prisma";

class GetServicesService {
  async execute() {
    const services = await db.service.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return services;
  }
}

export { GetServicesService };
