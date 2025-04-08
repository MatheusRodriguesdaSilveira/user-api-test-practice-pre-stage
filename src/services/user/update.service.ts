import { db } from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
}

class UpdateUserService {
  async execute({ user_id, name }: UserRequest) {
    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }

    const userExists = await db.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new Error("Usuário nao encontrado");
    }

    if (!name || name.trim() === "") {
      throw new Error("Nome é obrigatório");
    }

    const user = await db.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { UpdateUserService };
