import { db } from "../../prisma";
import { AppError } from "../../shared/errors/app-error";

class GetUserByIdService {
  async execute(user_id: string): Promise<any> {
    if (!user_id) {
      throw new AppError("ID do usuário é obrigatório", 400);
    }

    const user = await db.user.findFirst({
      where: {
        id: user_id,
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

export { GetUserByIdService };
