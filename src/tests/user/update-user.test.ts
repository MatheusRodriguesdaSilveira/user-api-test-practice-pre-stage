import { UpdateUserService } from "../../modules/users/services";
import { db } from "../../prisma";
import { createUser } from "../factories/user-factory";

describe("Testes para Atualizar usuário:", () => {
  const service = new UpdateUserService();

  beforeEach(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço atualiza um usuário com sucesso
  it("deve atualizar um usuário com sucesso", async () => {
    const createdUser = await createUser();

    const user = await service.execute({
      user_id: createdUser.id,
      name: "Matheus",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Matheus");
    expect(user.email).toBe(user.email);
  });

  // Teste para verificar se o serviço falha ao atualizar um usuário com nome vazio
  it("deve falhar se o nome estiver vazio", async () => {
    const createdUser = await createUser();

    await expect(
      service.execute({
        user_id: createdUser.id,
        name: "",
      })
    ).rejects.toThrow("Nome é obrigatório");
  });

  // Teste para verificar se o serviço falha ao atualizar um usuário com ID vazio
  it("deve falhar se o ID do usuário estiver vazio", async () => {
    await expect(
      service.execute({
        user_id: "",
        name: "Matheus",
      })
    ).rejects.toThrow("ID do usuário é obrigatório");
  });

  // Teste para verificar se o serviço falha ao atualizar um usuário que não existe
  it("deve falhar se o usuário não existir", async () => {
    await expect(
      service.execute({
        user_id: "nonexistent-id",
        name: "Matheus",
      })
    ).rejects.toThrow("Usuário nao encontrado");
  });
});
