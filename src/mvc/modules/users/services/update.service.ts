import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

import { IUpdateUserRequest } from "../dtos/user-request";

class UpdateUserService {
  async execute({ user_id, name }: IUpdateUserRequest) {
    if (!user_id) {
      throw new AppError("ID do usuário é obrigatório", 400);
    }

    const userExists = await db.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!userExists) {
      throw new AppError("Usuário nao encontrado", 404);
    }

    if (!name || name.trim() === "") {
      throw new AppError("Nome é obrigatório", 400);
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
