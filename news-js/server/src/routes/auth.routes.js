import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signin", AuthController.signIn);
AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/signout", AuthController.signOut);
AuthRouter.post("/refresh-token", AuthController.generateAccessToken);

export { AuthRouter };
