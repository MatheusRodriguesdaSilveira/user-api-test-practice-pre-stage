import { GetCategoriesService } from "../../modules/category";
import { db } from "../../prisma";
import { createCategory } from "../factories/categories-factory";

describe("GetCategoriesService", () => {
  const service = new GetCategoriesService();

  beforeAll(async () => {
    await db.category.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço retorna uma lista de categorias
  it("deve retornar uma lista de categorias", async () => {
    await createCategory({
      name: "Pé",
    });
    await createCategory({
      name: "Mão",
    });

    const categories = await service.execute();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(2);
    expect(categories[0]).toHaveProperty("name");
  });

  // Teste para verificar se o serviço retorna uma lista vazia quando não há categorias
  it("deve retornar uma lista vazia se não houver categorias", async () => {
    await db.category.deleteMany();
    const categories = await service.execute();

    expect(categories.length).toBe(0);
  });
});
