import { createUser } from "./factories/user-factory";
import { db } from "../prisma";
import { GetUsersService } from "../services/get-users-service";

describe("GetUsersService", () => {
  const service = new GetUsersService();

  beforeEach(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  // Teste para verificar se o serviço retorna uma lista de usuários
  it("deve retornar uma lista de usuários", async () => {
    await createUser();
    await createUser();

    const users = await service.execute();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(2);
    expect(users[0]).toHaveProperty("email");
  });

  // Teste para verificar se o serviço retorna uma lista vazia quando não há usuários
  it("deve retornar uma lista vazia se não houver usuários", async () => {
    const users = await service.execute();

    expect(users.length).toBe(0);
  });
});
