import { db } from "../../prisma";
import { CreateUserService } from "../../services";

describe("CreateUserService", () => {
  const service = new CreateUserService();

  beforeEach(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço cria um usuário com sucesso
  it("deve criar um usuário com sucesso", async () => {
    const user = await service.execute({
      name: "teste",
      email: "teste@gmail.com",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("teste");
    expect(user.email).toBe("teste@gmail.com");
  });

  // Teste para verificar se o serviço falha ao criar um usuário com email vazio
  it("deve falhar se o email estiver vazio", async () => {
    await expect(
      service.execute({
        name: "Matheus",
        email: "",
      })
    ).rejects.toThrow("Email incorreto");
  });

  // Teste para verificar se o serviço falha ao criar um usuário com email ja existente
  it("deve falhar se o email já existir", async () => {
    await service.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
    });

    await expect(
      service.execute({
        name: "Outro",
        email: "matheus@gmail.com",
      })
    ).rejects.toThrow("Email já existente");
  });

  // Teste para verificar se o serviço falha ao criar um usuário com email em UpperCase ja existente
  it("deve falhar se o email já existir", async () => {
    await service.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
    });

    await expect(
      service.execute({
        name: "Outro",
        email: "MATHEUS@GMAIL.COM",
      })
    ).rejects.toThrow("Email já existente");
  });
});
