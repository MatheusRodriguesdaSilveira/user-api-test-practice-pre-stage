import { db } from "../../../../prisma";

class GetUsersService {
  async execute() {
    const users = await db.user.findMany();
    const usersWithPassword = users.map((user: any) => {
      return { ...user, password: undefined };
    });
    return usersWithPassword;
  }
}

export { GetUsersService };
