import { Request, Response } from "express";
import { UpdateUserService } from "../services/update-user-service";
class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const { user_id } = req.params;
    try {
      const user = await new UpdateUserService().execute({
        user_id,
        name,
      });

      return res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserController };
