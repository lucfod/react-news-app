import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/:id", UserController.get);
UserRouter.get("/posts/:id", UserController.getPostsUser);

export { UserRouter };
