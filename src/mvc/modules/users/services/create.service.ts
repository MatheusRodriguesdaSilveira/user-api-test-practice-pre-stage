import { hash } from "bcryptjs";
import { ICreateUserRequest } from "../dtos/user-request";
import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class CreateUserService {
  async execute({ name, email, password }: ICreateUserRequest) {
    if (!email) {
      throw new AppError("Email incorreto", 400);
    }

    if (!name || name.trim() === "") {
      throw new AppError("Nome é obrigatório", 400);
    }

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new AppError("Formato de email inválido", 400);
    }
    const userAlreadyExists = await db.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (userAlreadyExists) {
      throw new AppError("Email já existente", 400);
    }

    const passwordHash = await hash(password, 8);

    if (!password || password.length < 6) {
      throw new AppError("Senha deve ter no mínimo 6 caracteres", 400);
    }

    const user = await db.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: passwordHash,
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

export { CreateUserService };
