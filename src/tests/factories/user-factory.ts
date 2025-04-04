import { db } from "../../prisma";

export async function createUser(data?: { name?: string; email?: string }) {
  return db.user.create({
    data: {
      name: data?.name || "Usuário de Teste",
      email: data?.email || `user${Date.now()}@test.com`,
    },
  });
}
