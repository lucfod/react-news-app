import { Router } from "express";
import { RegionController } from "../controllers/region.controller";

const RegionRouter = Router();

RegionRouter.get("/", RegionController.getAll);

export { RegionRouter };
