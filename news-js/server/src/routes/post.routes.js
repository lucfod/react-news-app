import { Router } from "express";
import { PostController } from "../controllers/post.controller";

const PostRouter = Router();

PostRouter.route("/").get(PostController.getAll).post(PostController.create);

PostRouter.route("/:id")
  .get(PostController.get)
  .patch(PostController.update)
  .delete(PostController.delete);

export { PostRouter };
