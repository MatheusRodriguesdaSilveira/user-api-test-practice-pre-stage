import { db } from "../../prisma";

export async function createUser(data?: {
  id?: string;
  name?: string;
  email?: string;
}) {
  return db.user.create({
    data: {
      id: data?.id || `user-${Date.now()}`,
      name: data?.name || "Usuário de Teste",
      email: data?.email || `user${Date.now()}@test.com`,
    },
  });
}
