import { db } from "../../prisma";
import { AuthUserService } from "../../modules/users/services/auth.service";
import { createUser } from "../factories/user-factory";

describe("AuthUserTests", () => {
  const service = new AuthUserService();

  beforeEach(async () => {
    await db.user.deleteMany(); // Limpa os usuários antes de cada teste
  });

  afterAll(async () => {
    await db.$disconnect(); // Desconecta do banco após os testes
  });

  // Teste para realizar login com sucesso
  it("deve autenticar um usuário com sucesso", async () => {
    const user = await createUser({
      email: "test@example.com",
      password: "password123",
    });

    const result = await service.execute({
      email: user.email,
      password: "password123",
    });

    expect(result).toHaveProperty("token");
    expect(result.email).toBe(user.email);
    expect(result.name).toBe(user.name);
  });

  // Teste para falha ao autenticar com e-mail incorreto
  it("deve falhar ao autenticar com e-mail incorreto", async () => {
    await createUser({
      email: "test@example.com",
      password: "password123",
    });

    await expect(
      service.execute({
        email: "wrong@example.com",
        password: "password123",
      })
    ).rejects.toThrow("User/password/email not found or incorrect");
  });

  // Teste para falha ao autenticar com senha incorreta
  it("deve falhar ao autenticar com senha incorreta", async () => {
    const user = await createUser({
      email: "test@example.com",
      password: "password123",
    });

    await expect(
      service.execute({
        email: user.email,
        password: "wrongpassword",
      })
    ).rejects.toThrow("User/password/email not found or incorrect");
  });
});
