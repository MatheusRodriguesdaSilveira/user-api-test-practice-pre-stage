import { db } from "../../prisma";

class GetUsersService {
  async execute() {
    const users = await db.user.findMany();
    return users;
  }
}

export { GetUsersService };
