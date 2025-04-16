import { db } from "../../prisma";
import { CreateCategoryService } from "../../services";

describe("CreateCategoryService", () => {
  const service = new CreateCategoryService();

  beforeEach(async () => {
    await db.category.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço cria uma categoria com sucesso
  it("deve cria uma categoria com sucesso", async () => {
    const category = await service.execute({
      name: "Mão",
    });

    expect(category).toHaveProperty("id");
    expect(category.name).toBe(category.name);
  });

  // Teste para verificar se o serviço falha ao criar uma categoria com o campo vazio
  it("deve falhar ao criar uma categoria com o campo vazio", async () => {
    await expect(
      service.execute({
        name: "",
      })
    ).rejects.toThrow("Category name is required");
  });

  // Teste para verificar se o serviço falha ao criar uma categoria ja existente
  it("deve falhar se a categoria já existir", async () => {
    await service.execute({
      name: "Pé",
    });

    await expect(
      service.execute({
        name: "Pé",
      })
    ).rejects.toThrow("Category already exists");
  });
});
