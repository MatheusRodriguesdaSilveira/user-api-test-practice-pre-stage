import { db } from "../../prisma";
import { GetUserByIdService } from "../../services";
import { createUser } from "../factories/user-factory";

describe("GetUserById", () => {
  const service = new GetUserByIdService();

  beforeAll(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço retorna um usuário com sucesso
  it("deve retorna um usuário com sucesso", async () => {
    const createdUser = await createUser();

    const user = await service.execute(createdUser.id);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(createdUser.name);
    expect(user.email).toBe(createdUser.email);
  });

  // Teste para verificar se o serviço retorna um erro ao tentar buscar um usuário sem ID
  it("deve retornar um erro ao tentar buscar um usuário sem ID", async () => {
    await expect(service.execute("")).rejects.toThrow(
      "ID do usuário é obrigatório"
    );
  });
});
