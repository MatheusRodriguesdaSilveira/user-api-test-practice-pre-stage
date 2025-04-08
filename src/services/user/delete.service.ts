import { db } from "../../prisma";

class DeleteUserService {
  async execute(
    user_id: string
  ): Promise<{
    user: { message: string; id: string; name: string; email: string };
  }> {
    if (!user_id) {
      throw new Error("ID do usuário é obrigatório");
    }

    const userExists = await db.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const user = await db.user.delete({
      where: {
        id: user_id,
      },
    });

    return {
      user: {
        message: "User deleted successfully",
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { DeleteUserService };
