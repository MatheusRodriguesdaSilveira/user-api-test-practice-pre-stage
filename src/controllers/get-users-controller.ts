import { Request, Response } from "express";
import { GetUsersService } from "../services/get-users-service";

class GetUsersController {
  async handle(req: Request, res: Response) {
    const users = await new GetUsersService().execute();
    return res.json(users);
  }
}

export { GetUsersController };
