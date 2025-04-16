import { db } from "../../../prisma";
import { AppError } from "../../../shared/errors/app-error";
import { ICreateCategoryRequest } from "../dtos/category-request";

class CreateCategoryService {
  async execute({ name }: ICreateCategoryRequest) {
    if (!name) {
      throw new AppError("Category name is required", 400);
    }

    const categoryAlreadyExists = await db.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", 400);
    }

    const category = await db.category.create({
      data: {
        name,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
