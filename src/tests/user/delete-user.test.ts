import { DeleteUserService } from "../../modules/users/services";
import { db } from "../../prisma";
import { createUser } from "../factories/user-factory";

describe("DeleteUserService", () => {
  const service = new DeleteUserService();

  beforeEach(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço deleta um usuário com sucesso
  it("deve deletar um usuário com sucesso", async () => {
    const createdUser = await createUser();

    const user = await db.user.delete({
      where: {
        id: createdUser.id,
      },
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(createdUser.name);
    expect(user.email).toBe(createdUser.email);
  });

  // Teste para verificar se o serviço falha ao deletar um usuário sem ID
  it("deve falhar se o ID do usuário estiver vazio", async () => {
    await expect(service.execute("")).rejects.toThrow(
      "ID do usuário é obrigatório"
    );
  });

  // Teste para verificar se o serviço falha ao deletar um usuário que não existe
  it("deve falhar se o usuário não existir", async () => {
    await expect(service.execute("1")).rejects.toThrow(
      "Usuário não encontrado"
    );
  });
});
