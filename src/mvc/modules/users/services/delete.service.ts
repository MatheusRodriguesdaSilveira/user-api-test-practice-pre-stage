import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class DeleteUserService {
  async execute(user_id: string): Promise<{
    user: { message: string; id: string; name: string; email: string };
  }> {
    if (!user_id) {
      throw new AppError("ID do usuário é obrigatório", 400);
    }

    const userExists = await db.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new AppError("Usuário não encontrado", 404);
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
