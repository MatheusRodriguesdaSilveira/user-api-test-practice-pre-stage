import { Router } from "express";
import { CreateUserController } from "../controllers/create-user-controller";
import { GetUsersController } from "../controllers/get-users-controller";
import { UpdateUserController } from "../controllers/update-user-controller";

const router = Router();

router.post("/users", new CreateUserController().handle as any);
router.get("/users/list", new GetUsersController().handle as any);
router.put("/user/:user_id", new UpdateUserController().handle as any);

export { router };
