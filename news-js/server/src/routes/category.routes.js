import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const CategoryRouter = Router();

CategoryRouter.get("/", CategoryController.getAll);

export { CategoryRouter };
