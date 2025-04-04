import { Request, Response } from "express";
import { CreateUserService } from "../services/create-user-service";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
      const user = await new CreateUserService().execute({
        name,
        email,
      });
      return res.status(201).json(user);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
}

export { CreateUserController };
