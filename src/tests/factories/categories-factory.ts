import { db } from "../../prisma";

export async function createCategory(data?: { id?: string; name?: string }) {
  return db.category.create({
    data: {
      id: data?.id || `user-${Date.now()}`,
      name: data?.name || "Usuário de Teste",
    },
  });
}
