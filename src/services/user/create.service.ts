import { db } from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
}

class CreateUserService {
  async execute({ name, email }: UserRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    if (!name || name.trim() === "") {
      throw new Error("Nome é obrigatório");
    }

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Formato de email inválido");
    }
    const userAlreadyExists = await db.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (userAlreadyExists) {
      throw new Error("Email já existente");
    }

    const user = await db.user.create({
      data: {
        name,
        email: normalizedEmail,
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
