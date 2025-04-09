import { compare } from "bcryptjs";
import { db } from "../../prisma";
import { sign } from "jsonwebtoken";
import { env } from "../../validators/env.schema";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User/password/email not found or incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password/email not found or incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      env.JWT_SECRET,
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
