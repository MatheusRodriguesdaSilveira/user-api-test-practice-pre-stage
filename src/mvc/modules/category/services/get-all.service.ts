import { db } from "../../../../prisma";

class GetCategoriesService {
  async execute() {
    const categories = await db.category.findMany();

    return categories;
  }
}

export { GetCategoriesService };
