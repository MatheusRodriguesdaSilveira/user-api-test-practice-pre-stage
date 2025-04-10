import { hash } from "bcryptjs";
import { db } from "../../prisma";

export async function createUser(data?: {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}) {
  const hashedPassword = await hash(data?.password || "password123", 8);

  return db.user.create({
    data: {
      id: data?.id || `user-${Date.now()}`,
      name: data?.name || "Usuário de Teste",
      email: data?.email || `user${Date.now()}@test.com`,
      password: hashedPassword,
    },
  });
}
