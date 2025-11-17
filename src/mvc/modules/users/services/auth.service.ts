import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuthRequest } from "../dtos/user-request";
import { env } from "process";
import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new AppError("User/password/email not found or incorrect");
    }

    if (!email) {
      throw new AppError("User/password/email not found or incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User/password/email not found or incorrect");
    }

    const jwtSecret = env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError("JWT_SECRET not configured");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      jwtSecret,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: token,
    };
  }
}

export { AuthUserService };
